"use client";

import { motion } from "framer-motion";
import { Youtube, Instagram, Music2, Video } from "lucide-react";

const socials = [
  {
    name: "Spotify",
    description: "Reflexiones diarias — Próximamente",
    icon: Music2,
    hoverClass: "hover:text-[#1DB954] hover:border-[#1DB954]",
    url: "#",
  },
  {
    name: "YouTube",
    description: "Clases y estrategias",
    icon: Youtube,
    hoverClass: "hover:text-[#FF0000] hover:border-[#FF0000]",
    url: "https://youtube.com/@lucasacostaok?si=N70CBQ9fi-0lRvv2",
  },
  {
    name: "Instagram",
    description: "El día a día del negocio",
    icon: Instagram,
    hoverClass: "hover:text-[#E1306C] hover:border-[#E1306C]",
    url: "https://www.instagram.com/lucasacosta.negocios?igsi=MTY2MDJ2N3c2Nm5tcQ%3D%3D&utm_source=qr",
  },
  {
    name: "TikTok",
    description: "Conceptos rápidos",
    icon: Video,
    hoverClass: "hover:text-[#00f2fe] hover:border-[#00f2fe]",
    url: "https://www.tiktok.com/@lucasacostaok?_r=1&_t=ZS-991cJLrAIB2",
  },
];

export default function MediaSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#111111] text-center border-t border-[#333333]">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-widest uppercase font-heading">
            POTENCIÁ TU MENTE TODOS LOS DÍAS
          </h2>
          <p className="text-[#b0b0b0] text-base sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed font-light">
            Transparencia absoluta. Documento mi proceso y comparto valor real en mis plataformas.
          </p>

          {/* Social Cards */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-16">
            {socials.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-60"
                >
                  <a
                    href={item.url}
                    target={item.url === "#" ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className={`w-full bg-[#1a1a1a] border border-[#333333] p-8 rounded-xl flex flex-col items-center group transition-colors duration-300 ${item.hoverClass}`}
                  >
                    <Icon className="w-12 h-12 text-white mb-4 transition-colors duration-300 group-hover:text-inherit" />
                    <h4 className="text-xl font-bold text-white mb-2 font-heading">
                      {item.name}
                    </h4>
                    <p className="text-sm text-[#b0b0b0]">{item.description}</p>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
