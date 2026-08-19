"use client";

import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";

const services = [
  {
    title: "1. La Mente Detrás del Negocio",
    description:
      "El punto de partida. Una comunidad exclusiva diseñada para enseñarte las bases fundamentales para crear y sostener un negocio rentable en el tiempo, trabajando primero en tus creencias limitantes.",
    features: [
      "Biblioteca de recursos estratégicos",
      "1 Llamada grupal semanal de mentoría",
      "Comunidad privada de networking",
      "Bases de psicología y finanzas",
    ],
    price: "$69.999 ARS",
    subprice: "o $50 USD (Suscripción Mensual)",
    buttonText: "Ingresar Ahora",
    waMessage: "Hola Lucas! Quiero ingresar a la comunidad La Mente Detrás del Negocio.",
  },
  {
    title: "2. Construí tu Primer Negocio",
    description:
      "Acompañamiento dedicado para emprendedores que ya tienen un negocio o están a punto de lanzarlo. Te proporciono la estructura mental y operativa para que no fracases en el intento y logres escalar tus ventas.",
    features: [
      "Mentoría enfocada y dedicada",
      "Estrategias de adquisición de clientes",
      "Optimización de procesos operativos",
      "Llamadas de seguimiento semanales",
    ],
    price: "$149.000 ARS",
    subprice: "o $100 USD (Suscripción Mensual)",
    buttonText: "Aplicar al Programa",
    waMessage: "Hola Lucas! Me interesa la mentoría Construí tu Primer Negocio.",
  },
  {
    title: "3. Escalá Personalizado (1 a 1)",
    description:
      "Mi tiempo exclusivo para tu negocio. Destrabamos tu realidad actual trabajando de forma directa. Análisis profundo de tu psicología, tus cuellos de botella operativos y estrategias agresivas de persuasión para escalar tu facturación.",
    features: [
      "Acceso directo y personal a Lucas",
      "Auditoría completa de tu modelo de negocio",
      "Tácticas avanzadas de cierre de ventas",
      "Cupos strictly limitados",
    ],
    price: "Entrevista Previa",
    subprice: "Requiere evaluación de perfil",
    buttonText: "Agendar Llamada",
    waMessage: "Hola Lucas! Quiero agendar una llamada de evaluación para la mentoría Escalá Personalizado (1 a 1).",
  },
  {
    title: "4. Aprender a invertir en negocios rentables",
    description:
      "Aprende a invertir en negocios rentables. La inversión que pones en tu capacitación la recuperas en un mes con un método probado por mí.",
    extraParagraph:
      "Tiempo estimado de recuperación de la inversión: entre 1 y 2 meses, aplicando un método probado (dar créditos) y con acompañamiento directo de la mano de Lucas.",
    features: [
      "Capacitación intensiva en inversión de negocios",
      "Método probado para recuperar inversión en 1 mes",
      "Estrategias de análisis de rentabilidad",
      "Acompañamiento directo de la mano de Lucas",
    ],
    price: "$980.000 ARS",
    subprice: "o 800 USD",
    buttonText: "Aplicar Ahora",
    waMessage: "Hola Lucas! Me interesa aprender a invertir en negocios rentables.",
  },
  {
    title: "5. Sistema para Prestamistas",
    description:
      "El software y sistema operativo definitivo creado bajo el Método LL. Diseñado específicamente para automatizar, profesionalizar y escalar la gestión de carteras para prestamistas, reduciendo la morosidad y aumentando la rentabilidad.",
    features: [
      "Control absoluto de flujos de caja",
      "Gestión de clientes y cobros",
      "Asesoría de implementación técnica",
    ],
    price: "A Consultar",
    subprice: "Cotización según cartera",
    buttonText: "Hacé click acá para ver la demo",
    externalUrl: "https://metodoll-by-solutech.vercel.app/",
    waMessage: "Hola Lucas! Necesito información sobre la Asesoría en Prestamistas.",
  },
];

export default function Services() {
  return (
    <section className="py-24 sm:py-32 bg-[#111111] border-y border-[#333333]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#c5a059] mb-5 tracking-widest uppercase font-heading">
            ECOSISTEMA DE MENTORÍAS
          </h2>
          <p className="text-base sm:text-xl text-[#b0b0b0] max-w-2xl mx-auto leading-relaxed">
            No vendo motivación vacía. Ofrezco sistemas, procesos y acompañamiento estratégico. Elegí el nivel que se adapte a la etapa actual de tu negocio.
          </p>
          <p className="text-sm sm:text-base text-[#c5a059] italic mt-3 font-medium">
            Métodos son un link, si no al pedo.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="flex flex-col gap-10">
          {services.map((service, index) => {
            const waUrl = `https://wa.me/541176550332?text=${encodeURIComponent(service.waMessage)}`;
            const actionUrl = service.externalUrl || waUrl;
            const isExternal = Boolean(service.externalUrl);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex flex-col lg:flex-row bg-[#1a1a1a] rounded-xl border border-[#333333] overflow-hidden transition-all duration-300 hover:border-[#c5a059] hover:-translate-y-1 hover:shadow-xl hover:shadow-[#c5a059]/5"
              >
                {/* Service Info */}
                <div className="p-8 sm:p-12 lg:w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 uppercase font-heading">
                      {service.title}
                    </h3>
                    <p className="text-[#b0b0b0] text-base sm:text-lg leading-relaxed mb-4 font-light">
                      {service.description}
                    </p>
                    {service.extraParagraph && (
                      <p className="text-[#c5a059] text-sm sm:text-base leading-relaxed mb-6 font-medium italic">
                        {service.extraParagraph}
                      </p>
                    )}
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#262626]">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-sm sm:text-base text-white">
                        <Check className="w-5 h-5 text-[#c5a059] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Action & Pricing */}
                <div className="p-8 sm:p-12 lg:w-1/3 bg-[#151515] border-t lg:border-t-0 lg:border-l border-[#333333] flex flex-col justify-center items-center text-center">
                  <div className="text-3xl sm:text-4xl font-black text-[#c5a059] mb-2 font-heading">
                    {service.price}
                  </div>
                  <span className="text-xs font-medium text-[#c5a059] mb-8 block leading-snug tracking-wide">
                    {service.subprice}
                  </span>

                  <a
                    href={actionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 bg-[#c5a059] hover:bg-transparent text-[#050505] hover:text-[#c5a059] font-bold text-sm uppercase tracking-wider rounded border-2 border-[#c5a059] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>{service.buttonText}</span>
                    {isExternal && <ExternalLink className="w-4 h-4 shrink-0" />}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
