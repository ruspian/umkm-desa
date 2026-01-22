"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RegisterAction } from "@/lib/action";
import { Register } from "@/types/register";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  color: string;
  targetX: number;
  targetY: number;
}

const colors = ["#facc15", "#22c55e", "#3b82f6", "#f472b6", "#f97316"];

export default function GamifiedRegisterCard() {
  const [formData, setFormData] = React.useState<Register>({
    username: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [particles, setParticles] = React.useState<ConfettiParticle[]>([]);

  const router = useRouter();

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.email || !formData.password || !formData.username || loading)
      return;

    try {
      setLoading(true);
      setError("");

      const result = await RegisterAction(formData);

      if (!result?.success) {
        setError(result?.message || "Terjadi kesalahan!");
        setLoading(false);
        return;
      }

      //  Jika sukses, baru jalankan animasi
      const newParticles: ConfettiParticle[] = Array.from({ length: 30 }).map(
        (_, i) => ({
          id: Date.now() + i,
          x: 0,
          y: 0,
          targetX: (Math.random() - 0.5) * 150,
          targetY: -Math.random() * 200,
          rotate: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
        }),
      );

      setParticles(newParticles);
      setSuccess(true);

      // Beri jeda sedikit agar user bisa menikmati animasi sebelum pindah halaman
      setTimeout(() => {
        router.push("/login");
        // router.refresh();
      }, 800);
    } catch (error) {
      console.error("Registrasi Error:", error);
      setError("Terjadi kesalahan koneksi.");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: p.color }}
            initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: p.rotate }}
            animate={{
              x: p.targetX,
              y: p.targetY,
              scale: 0,
              opacity: 0,
              rotate: p.rotate + 20,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Login Card */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative z-10 w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          {success ? "Welcome!" : "Sign In"}
        </h2>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm text-center font-medium"
          >
            {error}
          </motion.p>
        )}
        <form onSubmit={handleRegister}>
          <div className="flex flex-col gap-4 mt-2">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Otong Surotong"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="hover:scale-105 transition-transform duration-200"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-4 hover:scale-110 transition-transform duration-200"
          >
            {success ? "Register Sukses!" : "Daftar"}
          </Button>
        </form>
        {!success && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
            Sudah Punya akun?{" "}
            <Link href="/login" className="text-purple-500 hover:underline">
              Masuk
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
