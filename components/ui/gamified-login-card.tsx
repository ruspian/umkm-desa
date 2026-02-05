"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginAction } from "@/lib/action";
import { loginSchema } from "@/lib/zod";

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

export default function GamifiedLoginCard() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [error, setError] = React.useState("");
  const [particles, setParticles] = React.useState<ConfettiParticle[]>([]);

  const router = useRouter();

  const handleLogin = async () => {
    // Validasi
    const validation = loginSchema.safeParse({ email, password });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    // Gunakan startTransition agar Next.js tau ada proses async
    startTransition(async () => {
      setError("");

      const result = await LoginAction({ email, password });

      if (result?.success === false) {
        setError(result.message);
        return;
      }

      // Animasi Confetti
      const newParticles: ConfettiParticle[] = Array.from({ length: 30 }).map(
        (_, i) => ({
          id: Date.now() + i,
          x: 0,
          y: 0,
          targetX: (Math.random() - 0.5) * 200,
          targetY: -Math.random() * 250,
          rotate: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
        }),
      );

      setParticles(newParticles);
      setSuccess(true);

      setTimeout(() => {
        window.location.href = "/";
        router.refresh();
      }, 1000);
    });
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
          {success ? (
            "Selamat Datang!"
          ) : (
            <p className="text-foreground dark:text-background">
              Asli<span className="text-orange-500">Sini</span>
            </p>
          )}
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

        <div className="flex flex-col gap-4 mt-2">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="hover:scale-105 transition-transform duration-200"
            />
          </div>
        </div>

        <Button
          className="w-full mt-4 hover:scale-110 transition-transform duration-200"
          onClick={handleLogin}
          disabled={isPending}
        >
          {success ? "Berhasil Masuk!" : "Masuk"}
        </Button>

        {!success && (
          <p className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
            Belum punya akun?{" "}
            <Link href="/register" className="text-orange-500 hover:underline">
              Daftar!
            </Link>
          </p>
        )}
      </motion.div>
    </div>
  );
}
