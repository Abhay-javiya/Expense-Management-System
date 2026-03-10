"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Loader2, BarChart3, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mocking an API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-slate-50 to-slate-50"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-2xl text-white">
                        <BarChart3 className="w-8 h-8" />
                    </div>
                </div>
                <h2 className="text-3xl font-black text-slate-900">Reset Password</h2>
                <p className="mt-2 text-sm font-bold text-slate-400 uppercase tracking-widest px-4">
                    We'll send you a link to get back into your account
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="mt-10 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
            >
                <div className="bg-white/70 backdrop-blur-xl py-10 px-6 shadow-2xl shadow-slate-200/50 sm:rounded-[32px] sm:px-12 border border-white/50">
                    {!submitted ? (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block ml-1">Email Address</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all outline-none"
                                        placeholder="name@example.com"
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={loading}
                                type="submit"
                                className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-indigo-100 text-sm font-black text-white bg-slate-900 hover:bg-slate-800 transition-all disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
                            </motion.button>
                        </form>
                    ) : (
                        <div className="text-center py-6">
                            <div className="flex justify-center mb-4 text-emerald-500">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <p className="text-slate-900 font-bold mb-2">Check your inbox</p>
                            <p className="text-sm text-slate-500 font-medium">If an account exists for {email}, you will receive a reset link shortly.</p>
                        </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-slate-100/50">
                        <button
                            onClick={() => router.push("/login")}
                            className="w-full flex items-center justify-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-black uppercase tracking-widest"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
