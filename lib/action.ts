"use server";

import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { Prisma, Role } from "@prisma/client";
import { Register } from "@/types/register";

export const RegisterAction = async (data: Register) => {
  console.log("formData", data);

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
