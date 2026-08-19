"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/lucasacosta.negocios?igsi=MTY2MDJ2N3c2Nm5tcQ%3D%3D&utm_source=qr",
    icon: <Instagram className="w-5 h-5" />,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@lucasacostaok?si=N70CBQ9fi-0lRvv2",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@lucasacostaok?_r=1&_t=ZS-991cJLrAIB2",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="py-24 sm:py-32 bg-black text-center border-t border-[#333333]">
      <div className="max-w-[1000px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
            &quot;El riesgo viene de no saber lo que estás haciendo.&quot;
            <span className="block text-[#c5a059] mt-4 text-xl sm:text-2xl font-medium tracking-widest uppercase">
              — Warren Buffett
            </span>
          </h2>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-[#333333] text-[#888888] hover:text-[#c5a059] hover:border-[#c5a059] transition-all duration-300"
              >
                {s.icon}
              </a>
            ))}
          </div>

          <div className="mt-10 text-[#555555] text-sm">
            <p>&copy; 2026 Método LL. By Solutech. Todos los derechos reservados.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
