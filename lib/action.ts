"use server";

import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Prisma, Role } from "@prisma/client";
import { Register } from "@/types/register";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryDelete, CloudinaryUpload } from "@/types/cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
