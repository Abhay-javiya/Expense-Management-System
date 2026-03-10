"use client";

import React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Wallet,
  ShieldCheck,
  Zap,
  Layout,
  TrendingUp,
  CreditCard,
  Target,
  Users,
  CheckCircle2,
  ChevronRight,
  Menu,
  X,
  Github,
  Globe,
  Lock
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 50], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } }
  };

  const features = [
    {
      title: "Real-time Tracking",
      desc: "Monitor your cash flow instantly with live data syncing across all your devices.",
      icon: TrendingUp,
      bg: "bg-emerald-50",
      text: "text-emerald-600"
    },
    {
      title: "Category Insights",
      desc: "Smart classification that learns where your money goes, giving you total control.",
      icon: Layout,
      bg: "bg-indigo-50",
      text: "text-indigo-600"
    },
    {
      title: "Bank-Grade Security",
      desc: "Your financial data is encrypted and protected with industry-leading safety protocols.",
      icon: Lock,
      bg: "bg-rose-50",
      text: "text-rose-600"
    },
    {
      title: "Project Management",
      desc: "Dedicated tracking for business or personal projects to keep every budget on target.",
      icon: Target,
      bg: "bg-blue-50",
      text: "text-blue-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden">

      {/* Dynamic Navbar */}
      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 w-full z-50 border-b border-slate-200/40 backdrop-blur-2xl"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-2xl">
                <BarChart3 className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                FinTrack<span className="text-indigo-600">.</span>
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-10">
              {['Features', 'Security', 'Pricing'].map((link) => (
                <Link key={link} href={`#${link.toLowerCase()}`} className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                  {link}
                </Link>
              ))}
              <div className="h-4 w-px bg-slate-200"></div>
              <Link href="/login" className="text-xs font-black uppercase tracking-widest text-slate-900 hover:text-indigo-600 transition-colors">Log in</Link>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/register'}
                className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-slate-900">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-slate-100 p-6 flex flex-col gap-6"
          >
            {['Features', 'Security', 'Pricing'].map((link) => (
              <Link key={link} onClick={() => setIsMenuOpen(false)} href={`#${link.toLowerCase()}`} className="text-sm font-black uppercase tracking-widest text-slate-500">
                {link}
              </Link>
            ))}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <Link href="/login" className="flex items-center justify-center h-14 rounded-2xl border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-900">Login</Link>
              <Link href="/register" className="flex items-center justify-center h-14 rounded-2xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">Join</Link>
            </div>
          </motion.div>
        )}
      </motion.nav>

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 container mx-auto px-6 lg:px-12">
          {/* Animated Background Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 blur-[120px] rounded-full -z-10 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/30 blur-[100px] rounded-full -z-10 animate-pulse delay-1000"></div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 mb-8"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">v2.0 is now live</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8"
            >
              Master Your Money <br className="hidden md:block" /> with <span className="text-indigo-600">Elegance<span className="text-slate-900">.</span></span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              The minimal, high-performance financial dashboard designed for modern users. Track expenses, manage projects, and grow your wealth.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.button
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/register'}
                className="group flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-300 transition-all"
              >
                Get Started Free <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ y: -4 }}
                className="flex items-center gap-3 bg-white border border-slate-100 px-10 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 hover:border-slate-200 transition-all shadow-sm"
              >
                View Demo <Globe className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Floating UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-24 max-w-6xl mx-auto relative px-4"
          >
            <div className="relative rounded-[40px] border border-slate-200 bg-white/50 backdrop-blur-sm p-4 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/20 to-transparent -z-10 rounded-[40px]"></div>
              <img
                src="https://images.unsplash.com/photo-1551288049-bbb6518147ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Dashboard Preview"
                className="rounded-[32px] w-full shadow-2xl border border-slate-100"
              />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-8 top-1/4 hidden lg:block bg-white p-6 rounded-3xl shadow-2xl border border-slate-50 w-64"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Profits</p>
                    <p className="text-xl font-black text-slate-900">+₹42,500</p>
                  </div>
                </div>
                <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 bottom-1/4 hidden lg:block bg-slate-900 p-6 rounded-3xl shadow-2xl w-64"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Active Burn</p>
                    <p className="text-xl font-black text-white">₹12,800</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* FEATURES GRID */}
        <section id="features" className="py-32 container mx-auto px-6 lg:px-12">
          <div className="text-center mb-24">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 mb-4">Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Everything you need, <br /> nothing you don't.</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-10 rounded-[40px] bg-white border border-slate-50 hover:border-slate-100 transition-all shadow-sm hover:shadow-2xl hover:shadow-slate-200/50"
              >
                <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 shadow-lg ${feat.bg} ${feat.text}`}>
                  <feat.icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-black text-slate-900 mb-4">{feat.title}</h4>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECURITY SOCIAL PROOF */}
        <section id="security" className="py-32 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>

          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Security First</h2>
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8 leading-tight">Your data belongs to <span className="text-emerald-400">only you.</span></h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-10">
                  We built FinTrack with the highest security standards. No trackers, no selling data, and 256-bit encryption for every transaction record.
                </p>

                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">2FA Protected</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">Global SSL</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">PCI Compliant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="text-emerald-400 w-5 h-5" />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-300">Daily Backups</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative rounded-[40px] border border-slate-800 bg-slate-800/50 p-12 overflow-hidden group">
                  <ShieldCheck className="w-64 h-64 text-emerald-400 absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000" />
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 bg-emerald-500/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                      <ShieldCheck className="text-emerald-400 w-12 h-12" />
                    </div>
                    <p className="text-2xl font-black text-white mb-2">Authenticated Access Only</p>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Verified By FinTrack™</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FINAL CTA FOOTER */}
        <section className="py-40 container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[64px] bg-slate-900 p-12 md:p-24 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-8 max-w-4xl mx-auto leading-none"> Ready to take control of your financial <span className="text-indigo-400">Future?</span></h2>
              <p className="text-slate-400 text-lg font-medium mb-12 max-w-2xl mx-auto">Join thousands of users who are already tracking their way to financial freedom. Start for free today.</p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <motion.button
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '/register'}
                  className="bg-white text-slate-900 px-12 py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] shadow-2xl transition-all"
                >
                  Create Your Account
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="py-20 border-t border-slate-100 container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white w-4 h-4" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900">
                FinTrack<span className="text-indigo-600">.</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium">© 2026 Abhay Javiya. All rights reserved.</p>
          </div>

          <div className="flex gap-10">
            {['Privacy', 'Terms', 'Support'].map(link => (
              <Link key={link} href="#" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">{link}</Link>
            ))}
          </div>

          <div className="flex gap-4">
            {[Github, Globe, Users].map((Icon, idx) => (
              <motion.button key={idx} whileHover={{ y: -2 }} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                <Icon className="w-4 h-4" />
              </motion.button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
