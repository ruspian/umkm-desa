import { z } from "zod";

// login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .min(8, "Password minimal 8 karakter"),
});
export type LoginSchema = z.infer<typeof loginSchema>;

// register schema
export const registerSchema = z.object({
  username: z
    .string()
    .min(2, "Username minimal 2 karakter!")
    .max(30, "Username terlalu panjang!")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username hanya boleh huruf, angka, dan underscore",
    )
    .trim(),
  email: z
    .string()
    .min(1, "Email wajib diisi")
    .email("Format email tidak valid")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .regex(/[0-9]/, "Password harus mengandung setidaknya satu angka"),
});
export type RegisterSchema = z.infer<typeof registerSchema>;

// product schema
export const productSchema = z.object({
  nama: z
    .string()
    .min(4, "Nama produk minimal 4 karakter")
    .max(50, "Nama produk maksimal 50 karakter")
    .trim(),

  // Gunakan coerce untuk otomatis mengubah string dari form ke number
  price: z.coerce
    .number()
    .min(500, "Harga minimal Rp 500")
    .int("Harga harus angka bulat"),

  images: z
    .string()
    .min(1, "Gambar wajib diisi")
    .url("Format link gambar tidak valid"),

  stock: z.coerce
    .number()
    .min(0, "Stok tidak boleh negatif")
    .int("Stok harus angka bulat"),

  description: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter!")
    .max(1000)
    .optional(),

  category: z.string().min(1, "Kategori wajib dipilih").optional(),
  discount: z.coerce
    .number()
    .min(0, "Diskon tidak boleh negatif")
    .int("Diskon harus angka bulat")
    .optional()
    .default(0),
});

export type ProductSchema = z.infer<typeof productSchema>;

// toko schema
export const tokoSchema = z.object({
  namaToko: z
    .string()
    .min(4, "Nama Toko minimal 4 karakter")
    .max(20, "Nama Toko maksimal 20 karakter")
    .trim(),

  deskripsi: z
    .string()
    .min(10, "Deskripsi minimal 10 karakter!")
    .max(1000, "Deskripsi maksimal 1000 karakter"),

  logo: z
    .string()
    .min(1, "Logo wajib diisi")
    .url("Format link logo tidak valid"),

  alamat: z
    .string()
    .min(10, "Alamat minimal 10 karakter!")
    .max(100, "Alamat maksimal 100 karakter"),

  noWhatsapp: z
    .string()
    .regex(
      /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
      "Nomor HP tidak valid (Gunakan format 08xxx atau 628xxx)",
    )
    .trim(),
});

export type TokoSchema = z.infer<typeof tokoSchema>;
