"use server";

import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Category, Prisma, Role, StatusProduct } from "@prisma/client";
import { Register } from "@/types/register";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryDelete, CloudinaryUpload } from "@/types/cloudinary";
import { ProductType } from "@/types/product";
import { auth } from "./auth";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { TokoType } from "@/types/toko";
import { UserFormInput } from "@/types/user";
import { ProfilAdminType, UmumType } from "@/types/web.config";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// fungsi cek verifikasi toko
const checkTokoVerified = async (userId: string) => {
  const toko = await prisma.toko.findUnique({
    where: { userId },
    select: { isVerified: true, id: true },
  });
  return toko?.isVerified ? toko.id : null;
};

// fungsi register akun
export const RegisterAction = async (data: Register) => {
  const { username, email, password } = data;

  if (!username || !email || !password) {
    return {
      error: "Email, username, dan password harus diisi!",
      success: false,
    };
  }

  if (password.length < 8) {
    return {
      message: "Password minimal 8 karakter!",
      success: false,
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return {
        message: "Email sudah digunakan!",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword,
        role: Role.USER,
      },
    });

    return {
      message: "Registrasi berhasil!",
      success: true,
      data: newUser,
    };
  } catch (error) {
    console.log("gagal registrasi user:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email sudah digunakan!",
          success: false,
        };
      }
    }

    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi upload gambar ke cloudinary
export const uploadImage = async (data: CloudinaryUpload) => {
  try {
    const { folder } = data;

    // buat timestamp
    const timestamp = Math.round(new Date().getTime() / 1000);

    // buat tanda tangan pakai signature cloudinary
    // Buat Signature pakai SDK Cloudinary
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
        folder: folder || "umkm",
      },
      process.env.CLOUDINARY_API_SECRET as string,
    );

    return {
      success: true,
      data: {
        timestamp,
        signature,
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      },
    };
  } catch (error) {
    console.log("Gagal upload foto ke cloudinary:", error);

    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi hapus gambar dari cloudinary
export const DeleteImage = async (data: CloudinaryDelete) => {
  try {
    const { publicId, resourceType } = data;

    if (!publicId) {
      return {
        message: "Public ID tidak ditemukan!",
        success: false,
      };
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType || "image",
    });

    if (result.result !== "ok" && result.result !== "not found") {
      throw new Error("Gagal menghapus di Cloudinary");
    }

    return {
      message: "Foto berhasil dihapus!",
      success: true,
    };
  } catch (error) {
    console.log("Gagal menghapus foto di cloudinary:", error);
    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi tambah produk
export const AddProduct = async (data: ProductType) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!session?.user || session?.user.role !== "PENJUAL") {
    return {
      message: "Akses ditolak, Silahkan Login!",
      success: false,
    };
  }

  try {
    const { nama, description, images, stock, discount, price, category } =
      data;

    const tokoId = await checkTokoVerified(userId as string);

    //  jika belum terverifikasi, tidak dapat menambahkan produk
    if (!tokoId) {
      // hapus gambar yang sudah diupload
      if (images) {
        await DeleteImage({ url: images, resourceType: "image" });
      }

      return {
        message: "Toko belum terverifikasi, Hubungi Admin!",
        success: false,
      };
    }

    if (!nama || !images || !price || !stock) {
      return {
        message: "Data belum lengkap!",
        success: false,
      };
    }

    if (category === "Semua") {
      return {
        message: "Kategori belum dipilih!",
        success: false,
      };
    }

    // cek apakah toko sudah terverifikasi

    const generateSlug = slugify(nama, { lower: true });
    const slug = generateSlug + "-" + Math.floor(Math.random() * 1000);

    const newProduct = await prisma.product.create({
      data: {
        name: nama,
        description,
        slug,
        images,
        stock: Number(stock),
        discount: Number(discount),
        price: Number(price),
        category: category as Category,
        tokoId: tokoId as string,
        status: "Pending",
      },
    });

    revalidatePath("/toko/produk-saya");
    revalidatePath("/admin/products");
    revalidatePath("/");

    return {
      message: "Produk berhasil ditambahkan!",
      success: true,
      data: newProduct,
    };
  } catch (error) {
    console.log("gagal menambahkan product: ", error);
    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi edit produk
export const EditProduct = async (data: ProductType) => {
  const session = await auth();
  const userId = session?.user.id;

  if (!session?.user || session?.user.role !== "PENJUAL") {
    return {
      message: "Akses ditolak, Silahkan Login!",
      success: false,
    };
  }

  try {
    const { id, nama, description, images, stock, discount, price, category } =
      data;

    // Cek status verifikasi toko
    const tokoId = await checkTokoVerified(userId as string);

    if (!tokoId) {
      return {
        message: "Toko belum terverifikasi, Hubungi Admin!",
        success: false,
      };
    }

    const product = await prisma.product.findUnique({
      where: { id: id },
      select: { images: true, toko: { select: { userId: true } } },
    });

    if (!product) {
      return {
        message: "Produk tidak ditemukan!",
        success: false,
      };
    }

    // pastikan produk milik user yang sedang login
    if (product?.toko.userId !== session.user.id) {
      return {
        message: "Akses ditolak, Produk bukan milik Anda!",
        success: false,
      };
    }

    if (!nama || !images || !price || !stock) {
      return {
        message: "Data belum lengkap!",
        success: false,
      };
    }

    if (category === "Semua") {
      return {
        message: "Kategori belum dipilih!",
        success: false,
      };
    }

    // Jika ada foto baru dikirim DAN foto baru itu beda dengan foto lama
    if (images && images !== product.images) {
      try {
        // Hapus foto yang LAMA dari Cloudinary
        await DeleteImage({ url: product.images, resourceType: "image" });
      } catch (cloudinaryErr) {
        console.log(
          "Gagal hapus foto lama, lanjut update data...",
          cloudinaryErr,
        );
        //  biarkan lanjut agar data teks tetap terupdate meskipun hapus foto gagal
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: id as string },
      data: {
        name: nama,
        description,
        images: images,
        stock: Number(stock),
        discount: Number(discount),
        price: Number(price),
        category: category as Category,
      },
    });

    revalidatePath("/toko/produk-saya");
    revalidatePath("/admin/products");
    revalidatePath("/");

    return {
      message: "Produk berhasil diperbarui!",
      success: true,
      data: updatedProduct,
    };
  } catch (error) {
    console.log("gagal edit product:", error);

    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi hapus produk
export const DeleteProduct = async (id: string) => {
  const session = await auth();
  const userRole = session?.user.role;

  if (
    !session?.user ||
    (session?.user.role !== "PENJUAL" && session.user.role !== "ADMIN")
  ) {
    return {
      message: "Akses ditolak, Anda tidak memiliki izin!",
      success: false,
    };
  }

  try {
    let tokoId = null;

    if (userRole === "PENJUAL") {
      tokoId = await checkTokoVerified(session.user.id);

      if (!tokoId) {
        return {
          message: "Toko belum terverifikasi, Hubungi Admin!",
          success: false,
        };
      }
    }

    const product = await prisma.product.findUnique({
      where: { id },
      select: { images: true, toko: { select: { userId: true } } },
    });

    // pastikan produk itu milik user yang sedang login
    if (product?.toko.userId !== session.user.id) {
      return {
        message: "Akses ditolak, Produk bukan milik Anda!",
        success: false,
      };
    }

    // hapus gambar dari cloudinary
    if (product.images) {
      await DeleteImage({ url: product.images, resourceType: "image" });
    }

    // hapus produk dari database
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/toko/produk-saya");
    revalidatePath("/admin/products");
    revalidatePath("/");

    return {
      message: "Produk berhasil dihapus!",
      success: true,
    };
  } catch (error) {
    console.log("gagal menghapus product:", error);

    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi buat profil toko
export const CreateToko = async (data: TokoType) => {
  const session = await auth();
  if (!session?.user || session?.user.role !== "PENJUAL") {
    return {
      message: "Akses ditolak, Anda tidak memiliki izin!",
      success: false,
    };
  }

  try {
    const { namaToko, deskripsi, logo, alamat, noWhatsapp } = data;

    if (!namaToko || !deskripsi || !logo || !alamat || !noWhatsapp) {
      return { message: "Data belum lengkap!", success: false };
    }

    //  Cek apakah user SUDAH punya toko sebelumnya
    const existingToko = await prisma.toko.findUnique({
      where: { userId: session.user.id },
    });

    //  Jika SUDAH ADA toko dan dia ganti LOGO, hapus yang lama dari Cloudinary
    if (existingToko && logo && logo !== existingToko.logo) {
      if (existingToko.logo) {
        await DeleteImage({
          url: existingToko.logo,
          resourceType: "image",
        }).catch(() => console.log("Gagal hapus logo lama"));
      }
    }

    // Generate Slug hanya untuk toko baru
    const generateSlug = slugify(namaToko, { lower: true });
    const slug = `${generateSlug}-${Math.floor(Math.random() * 1000)}`;

    // Upsert
    const toko = await prisma.toko.upsert({
      where: { userId: session.user.id },
      update: {
        namaToko,
        deskripsi,
        logo,
        alamat,
        noWhatsapp,
      },
      create: {
        namaToko,
        deskripsi,
        logo,
        alamat,
        noWhatsapp,
        slug,
        userId: session.user.id,
        isVerified: false,
      },
    });

    revalidatePath("/toko/profile");
    revalidatePath("/admin/toko");

    return {
      message: "Profil toko berhasil disimpan!",
      success: true,
      data: toko,
    };
  } catch (error: unknown) {
    console.log("gagal buat profile toko:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Nama toko sudah digunakan!",
          success: false,
        };
      }
    }

    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungs ganti role user
export const ChangeUserRole = async (userId: string, role: Role) => {
  try {
    const session = await auth();

    if (!session?.user || session?.user.role !== "ADMIN") {
      return {
        message: "Akses ditolak, Silahkan Login!",
        success: false,
      };
    }

    if (!role) {
      return {
        message: "Pilih role terlebih dahulu!",
        success: false,
      };
    }

    // jangan ubah role admin yang sedang login
    if (session.user.id === userId) {
      return {
        message: "Anda tidak dapat mengubah role anda sendiri!",
        success: false,
      };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: role as Role },
    });

    revalidatePath("/admin/users");

    return {
      message: "Role berhasil diubah!",
      success: true,
    };
  } catch (error) {
    console.log("gagal ganti role user:", error);
    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi buat user baru admin
export const CreateNewUser = async (data: UserFormInput) => {
  try {
    const session = await auth();

    if (!session?.user || session?.user.role !== "ADMIN") {
      return {
        message: "Akses ditolak, Silahkan Login!",
        success: false,
      };
    }

    const { name, email, role } = data;

    if (!name || !email || !role) {
      return {
        message: "Data belum lengkap!",
        success: false,
      };
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (existingUser) {
      return {
        message: "Email sudah terpakai, gunakan email lain!",
        success: false,
      };
    }

    const hashedPassword = await bcrypt.hash("123456", 12);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role,
      },
    });

    revalidatePath("/admin/users");

    return {
      message: "User berhasil dibuat!",
      success: true,
      data: newUser,
    };
  } catch (error) {
    console.log("gagal menambahkan pengguna:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email sudah terpakai, gunakan email lain!",
          success: false,
        };
      }
    }

    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi hapus user
export const DeleteUser = async (id: string) => {
  try {
    const session = await auth();

    if (!session?.user || session?.user.role !== "ADMIN") {
      return {
        message: "Akses ditolak, Silahkan Login!",
        success: false,
      };
    }

    if (!id) {
      return {
        message: "Pilih user terlebih dahulu!",
        success: false,
      };
    }

    if (session.user.id === id) {
      return {
        message: "Anda tidak dapat menghapus diri sendiri!",
        success: false,
      };
    }

    const deletedUser = await prisma.user.delete({
      where: { id: id },
    });

    revalidatePath("/admin/users");

    return {
      message: "User berhasil dihapus!",
      success: true,
      data: deletedUser,
    };
  } catch (error) {
    console.log("gagal menghapus user:", error);
    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi hapus toko
export const DeleteToko = async (id: string) => {
  try {
    const session = await auth();

    if (session?.user.role !== "ADMIN") {
      return { message: "Akses ditolak!", success: false };
    }

    // Ambil data produk & gambar sebelum dihapus
    const toko = (await prisma.toko.findUnique({
      where: { id },
      include: {
        products: { select: { images: true } },
        user: { select: { id: true } },
      },
    })) as Prisma.TokoGetPayload<{
      include: { products: true; user: true };
    }> | null;

    if (!toko) return { message: "Toko tidak ditemukan!", success: false };

    // Hapus semua gambar produk toko tersebut dari Cloudinary
    const imagePaths = toko.products
      .map((p) => p.images)
      .filter((img): img is string => !!img);

    for (const path of imagePaths) {
      await DeleteImage({ url: path, resourceType: "image" });
    }

    await prisma.toko.delete({ where: { id } });

    // Kembalikan Role ke USER
    await prisma.user.update({
      where: { id: toko.user.id },
      data: { role: "USER" },
    });

    revalidatePath("/admin/toko");

    return {
      message: "Toko dan seluruh datanya berhasil dihapus!",
      success: true,
    };
  } catch (error) {
    console.error("Gagal hapus toko:", error);
    return { message: "Kesalahan pada server!", success: false };
  }
};

// fungsi verifikasi toko
export const VerifyToko = async (id: string) => {
  try {
    const session = await auth();

    if (session?.user.role !== "ADMIN") {
      return { message: "Akses ditolak!", success: false };
    }

    // Cari data toko sekarang
    const toko = await prisma.toko.findUnique({
      where: { id },
      select: { isVerified: true, namaToko: true },
    });

    if (!toko) return { message: "Toko tidak ditemukan!", success: false };

    // Update dengan nilai kebalikannya
    const updatedToko = await prisma.toko.update({
      where: { id },
      data: { isVerified: !toko.isVerified },
    });

    revalidatePath("/admin/toko");

    return {
      success: true,
      message: updatedToko.isVerified
        ? `Toko ${toko.namaToko} berhasil diverifikasi!`
        : `Verifikasi toko ${toko.namaToko} telah dicabut!`,
    };
  } catch (error) {
    console.error("Gagal update verify:", error);
    return { success: false, message: "Kesalahan pada server!" };
  }
};

// fungsi verifikasi produk
export const VerifyProduct = async (id: string, data: string) => {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        message: "Akses ditolak, hanya Admin yang bisa verifikasi!",
        success: false,
      };
    }

    // Update status produk
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: { status: data as StatusProduct },
    });

    revalidatePath("/admin/kurasi-products");

    return {
      success: true,
      message:
        updatedProduct.status === "Approved"
          ? "Produk berhasil disetujui!"
          : "Produk telah ditolak!",
    };
  } catch (error) {
    console.error("Gagal update verify:", error);
    return { success: false, message: "Kesalahan pada server!" };
  }
};

// fungsi buat konfigurasi web
export const SaveGeneralConfig = async (data: UmumType) => {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        message: "Akses ditolak, anda tidak memiliki izin!",
        success: false,
      };
    }

    const { siteName, slogan, contactWa, isMaintenance, isOpenRegistration } =
      data;

    if (!siteName || !slogan || !contactWa) {
      return {
        message: "Semua field harus diisi!",
        success: false,
      };
    }

    const saveConfig = await prisma.webConfig.upsert({
      where: { id: "site_configuration_id" },
      update: {
        siteName,
        slogan,
        contactWa,
        isMaintenance,
        isOpenRegistration,
      },
      create: {
        id: "site_configuration_id",
        siteName,
        slogan,
        contactWa,
        isMaintenance,
        isOpenRegistration,
      },
    });

    revalidatePath("/admin/konfigurasi");

    return {
      message: "Konfigurasi web berhasil disimpan!",
      success: true,
      data: saveConfig,
    };
  } catch (error) {
    console.log("gagal membuat konfigurasi web:", error);

    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};

// fungsi save data profil admin
export const SaveProfilAdminConfig = async (data: ProfilAdminType) => {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
      return {
        message: "Akses ditolak, anda tidak memiliki izin!",
        success: false,
      };
    }

    const { id, name, email, image } = data;

    if (!id || !name || !email || !image) {
      return {
        message: "Semua field harus diisi!",
        success: false,
      };
    }

    const existingEmail = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (existingEmail) {
      return {
        message: "Email sudah terdaftar!",
        success: false,
      };
    }

    const saveProfil = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        image,
      },
    });

    revalidatePath("/admin/konfigurasi");
    revalidatePath("/admin/users");

    return {
      message: "Profil admin berhasil disimpan!",
      success: true,
      data: saveProfil,
    };
  } catch (error) {
    console.log("gagal update profil admin:", error);

    return {
      message: "Kesalahan pada server!",
      success: false,
    };
  }
};
