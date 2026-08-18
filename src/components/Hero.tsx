"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image with Lighter Overlay for Maximum Photo Visibility */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpeg"
          alt="Método LL Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top sm:object-center opacity-75 sm:opacity-55 brightness-100 sm:brightness-90 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-[#050505]/50 to-[#050505]/80 sm:bg-gradient-to-r sm:from-[#050505]/85 sm:via-[#050505]/65 sm:to-[#050505]/55" />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-[900px] px-6 py-10"
      >
        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-black tracking-wide text-white mb-6 uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          LA MENTE DETRÁS DEL <span className="text-[#c5a059]">NEGOCIO</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-[#f0f0f0] font-light max-w-3xl mx-auto leading-relaxed mb-10 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] font-sans">
          Psicología, finanzas y decisiones estratégicas para escalar sin límites. El método para quienes buscan resultados reales, sin atajos.
        </p>

        <a
          href="#historia"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#c5a059] hover:bg-transparent text-[#050505] hover:text-[#c5a059] font-bold text-sm uppercase tracking-wider rounded border-2 border-[#c5a059] transition-all duration-300 transform hover:-translate-y-1 shadow-2xl shadow-black/80"
        >
          Conocer la Historia
        </a>
      </motion.div>

      {/* Scroll Indicator */}
      <a
        href="#historia"
        aria-label="Scroll down to story section"
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#c5a059] hover:text-[#dfb668] transition-colors animate-bounce-indicator p-2 drop-shadow-md"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
