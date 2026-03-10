"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Mail, Lock, ArrowRight, ArrowLeft, Loader2, BarChart3 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          EmailAddress: email,
          Password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials. Please try again.");
        return;
      }

      router.push("/user/dashboard");
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">

      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-slate-50 to-slate-50"></div>
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl"
          >
            <BarChart3 className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        <h2 className="text-center text-4xl font-black tracking-tight text-slate-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm font-bold text-slate-400 uppercase tracking-widest">
          Enter your details to manage your finances
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-xl py-10 px-6 shadow-2xl shadow-slate-200/50 sm:rounded-[32px] sm:px-12 border border-white/50">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-rose-50 border border-rose-100 p-4 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-bold"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                </div>
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-xs font-black text-indigo-600 hover:text-indigo-500 tracking-widest uppercase"
                onClick={() => router.push('/forgot-password')}
              >
                Forgot?
              </button>
            </div>

            <div>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-indigo-100 text-sm font-black text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100/50">
            <p className="text-center text-sm font-bold text-slate-500">
              Don't have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="text-indigo-600 hover:text-indigo-500 font-black tracking-widest uppercase text-xs"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>

        <motion.button
          onClick={() => router.push("/")}
          className="mt-10 mx-auto flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-black uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}
