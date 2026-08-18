"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stories = [
  {
    title: "El Origen:",
    highlight: "la calle",
    image: "/images/origen.jpeg",
    alt: "Los inicios de Lucas en el barrio",
    paragraphs: [
      "Mi camino empezó bien desde abajo, en los pasillos del barrio. Ahí aprendí una lección que ninguna universidad te enseña: si querías algo, te lo tenías que ganar día a día.",
      "Me hice a los golpes. Fracasando en negocios, intentando diferentes rubros, sobreviviendo con locales físicos y volviendo a empezar cuando el panorama se ponía más difícil. La voluntad estaba, pero faltaba el sistema.",
    ],
  },
  {
    title: "El Quiebre:",
    highlight: "la mentalidad",
    image: "/images/quiebre.jpeg",
    alt: "Estudiando y reprogramando la mente",
    paragraphs: [
      "Después de rebuscármela con mil disciplinas, me di cuenta de una verdad incómoda: para cambiar mi realidad financiera y mi entorno, primero tenía que cambiar lo que tenía en la cabeza.",
      "Tuve que reprogramar mi mente desde cero. Me aislé y me metí a fondo a estudiar psicología humana, estrategias de venta de alto nivel, cierres de negocios y la frialdad de los números. Buscaba las respuestas que la calle sola ya no me podía dar.",
    ],
  },
  {
    title: "La Materialización:",
    highlight: "el sistema",
    image: "/images/resultado.jpeg",
    alt: "El progreso y sistema Método LL",
    paragraphs: [
      "Toda esa teoría y práctica se fusionaron. Así fue como logré armar el ecosistema de negocios que hoy implemento y que, de forma comprobada, funciona. Lo llamé el Método LL.",
      "Hoy estoy acá para demostrarte que, vengas de donde vengas, sin importar tu punto de partida, si tenés el hambre y la disciplina extrema para transformar tu mentalidad, el éxito se puede estructurar y alcanzar.",
    ],
  },
];

export default function Story() {
  return (
    <section id="historia" className="py-20 sm:py-32 bg-[#050505] text-[#f8f8f8] relative">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#c5a059] mb-5 tracking-widest uppercase font-heading">
            DE LA VILLA AL PROGRESO
          </h2>
          <p className="text-base sm:text-xl text-[#b0b0b0] max-w-2xl mx-auto leading-relaxed">
            Nadie te regala nada. Conoce el camino, los errores y la transformación que forjaron el Método LL.
          </p>
        </motion.div>

        {/* Story Rows */}
        <div className="space-y-20 sm:space-y-32">
          {stories.map((story, index) => {
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-10 lg:gap-16`}
              >
                {/* Image Container with Gold Border Accent */}
                <div className="w-full lg:w-1/2 relative group px-2 sm:px-0">
                  <div
                    className={`absolute -top-3.5 ${
                      isEven ? "right-0 lg:-right-3.5" : "left-0 lg:-left-3.5"
                    } w-[calc(100%-8px)] lg:w-full h-full border-2 border-[#c5a059] rounded-xl z-0 transition-transform duration-300 group-hover:scale-[1.01]`}
                  />
                  <div className="relative z-10 overflow-hidden rounded-xl shadow-2xl shadow-black/90 w-full h-[280px] sm:h-[380px] lg:h-[400px]">
                    <Image
                      src={story.image}
                      alt={story.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Text Container */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-5 uppercase tracking-wide font-heading">
                    {story.title}{" "}
                    <span className="text-[#c5a059] font-serif italic lowercase text-3xl sm:text-4xl">
                      {story.highlight}
                    </span>
                  </h3>
                  {story.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[#b0b0b0] text-base sm:text-lg leading-relaxed mb-4 font-light"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
