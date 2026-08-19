"use client";

import { motion } from "framer-motion";

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
            &quot;No se puede tener resultados distintos haciendo siempre lo mismo.&quot;
            <span className="block text-[#c5a059] mt-4 text-xl sm:text-2xl font-medium tracking-widest uppercase">
              — Albert Einstein
            </span>
          </h2>

          <div className="mt-16 text-[#555555] text-sm">
            <p>&copy; 2026 Método LL. By Solutech. Todos los derechos reservados.</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
