"use client";

import GoogleButton from "@/components/auth/google-button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";

import {
  Mail,
  Lock,
  ChevronRight,
  Shirt,
} from "lucide-react";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsPending(false);

    if (result?.error) {
      setError("Credenciales incorrectas");
      return;
    }

    router.refresh();
    router.push("/dashboard");
  };

  return (
    <AuthLayout>
      <div className="min-w-[300px] md:min-w-[400px] backdrop-blur-lg bg-linear-to-br from-gray-950/60 to-gray-850/20 border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/90 mb-4 border border-blue-500/30">
            <Shirt className="w-8 h-8 text-blue-300" />
          </div>

          <h1 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Mya <span className="text-blue-300">Imp</span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Ingresa a tu cuenta
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <GoogleButton />
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>

          <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
            <span className="bg-white px-3 text-gray-950 rounded-4xl">
              O mediante Email
            </span>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-500 uppercase ml-1 tracking-widest">
              Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              <input
                name="email"
                type="email"
                required
                placeholder="vendedor@ok.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-500 uppercase ml-1 tracking-widest">
              Contraseña
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full group relative bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all overflow-hidden active:scale-[0.98] disabled:opacity-50"
          >
            <div className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-tighter text-lg">
              {isPending
                ? "Iniciando..."
                : "Iniciar Sesión"}

              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-8">
          ¿No tienes cuenta?{" "}
          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300 font-bold underline-offset-4 hover:underline"
          >
            Registrarse
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}