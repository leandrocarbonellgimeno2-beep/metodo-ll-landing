"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { leadSchema, type LeadFormData } from "@/lib/validations/lead";

export default function ContactForm() {
  const [formData, setFormData] = useState<LeadFormData>({
    nombre: "",
    pais: "",
    interes: "La Mente Detrás del Negocio",
    situacion: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    // Clear specific field error when typing
    if (errors[id as keyof LeadFormData]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate with Zod schema client-side
    const validation = leadSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof LeadFormData, string>> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof LeadFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          const apiErrors: Partial<Record<keyof LeadFormData, string>> = {};
          Object.keys(data.errors).forEach((key) => {
            apiErrors[key as keyof LeadFormData] = data.errors[key][0];
          });
          setErrors(apiErrors);
        } else {
          setServerError(data.message || "No se pudo procesar la solicitud.");
        }
        setIsSubmitting(false);
        return;
      }

      // Success!
      setIsSuccess(true);

      // Open WhatsApp in a new tab
      if (data.whatsappUrl) {
        setTimeout(() => {
          window.open(data.whatsappUrl, "_blank");
        }, 600);
      }
    } catch (err) {
      console.error(err);
      setServerError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#050505] text-[#f8f8f8] relative">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#c5a059] mb-5 tracking-widest uppercase font-heading">
            DA EL PRIMER PASO
          </h2>
          <p className="text-base sm:text-xl text-[#b0b0b0] max-w-2xl mx-auto leading-relaxed">
            Completa este formulario con total transparencia. Tu información se registrará de forma segura e irá directamente a mi WhatsApp personal para evaluar cómo puedo ayudarte.
          </p>
        </motion.div>

        {/* Form Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[800px] mx-auto bg-[#1a1a1a] p-8 sm:p-14 rounded-2xl border border-[#333333] shadow-2xl relative"
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <CheckCircle2 className="w-20 h-20 text-[#c5a059] mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4 uppercase font-heading">
                ¡Aplicación Recibida!
              </h3>
              <p className="text-[#b0b0b0] text-lg max-w-lg mx-auto leading-relaxed mb-8">
                Tus datos han sido registrados exitosamente. Te estamos redirigiendo a WhatsApp para iniciar la conversación directamente con Lucas.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    nombre: "",
                    pais: "",
                    interes: "La Mente Detrás del Negocio",
                    situacion: "",
                  });
                }}
                className="px-6 py-3 bg-transparent border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all rounded font-bold uppercase text-xs tracking-wider"
              >
                Enviar otra aplicación
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {serverError && (
                <div className="mb-6 p-4 bg-red-950/60 border border-red-800 text-red-300 rounded-lg flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                    className={`w-full p-4 bg-[#050505] border ${
                      errors.nombre ? "border-red-500" : "border-[#333333] focus:border-[#c5a059]"
                    } text-white rounded outline-none transition-colors duration-300`}
                  />
                  {errors.nombre && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.nombre}</p>
                  )}
                </div>

                {/* Pais */}
                <div>
                  <label htmlFor="pais" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                    País de Residencia *
                  </label>
                  <input
                    type="text"
                    id="pais"
                    value={formData.pais}
                    onChange={handleChange}
                    placeholder="Ej: Argentina"
                    className={`w-full p-4 bg-[#050505] border ${
                      errors.pais ? "border-red-500" : "border-[#333333] focus:border-[#c5a059]"
                    } text-white rounded outline-none transition-colors duration-300`}
                  />
                  {errors.pais && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.pais}</p>
                  )}
                </div>

                {/* Interes */}
                <div className="sm:col-span-2">
                  <label htmlFor="interes" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                    ¿En qué nivel te encuentras? *
                  </label>
                  <select
                    id="interes"
                    value={formData.interes}
                    onChange={handleChange}
                    className={`w-full p-4 bg-[#050505] border ${
                      errors.interes ? "border-red-500" : "border-[#333333] focus:border-[#c5a059]"
                    } text-white rounded outline-none transition-colors duration-300`}
                  >
                    <option value="La Mente Detrás del Negocio">
                      Quiero aprender las bases (La Mente Detrás del Negocio)
                    </option>
                    <option value="Construí tu Primer Negocio">
                      Tengo/Quiero un negocio (Construí tu Primer Negocio)
                    </option>
                    <option value="Escalá Personalizado (1 a 1)">
                      Quiero escalar fuerte (Mentoría 1 a 1)
                    </option>
                    <option value="Aprender a invertir en negocios rentables">
                      Quiero aprender a invertir en negocios rentables ($870.000 ARS / 800 USD)
                    </option>
                    <option value="Asesoría en Prestamistas">
                      Soy prestamista y necesito Asesoría / Sistema
                    </option>
                  </select>
                  {errors.interes && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.interes}</p>
                  )}
                </div>

                {/* Situacion */}
                <div className="sm:col-span-2">
                  <label htmlFor="situacion" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                    Describe tu situación actual y tu mayor problema a resolver: *
                  </label>
                  <textarea
                    id="situacion"
                    rows={4}
                    value={formData.situacion}
                    onChange={handleChange}
                    placeholder="Sé detallado. ¿Qué te frena hoy?"
                    className={`w-full p-4 bg-[#050505] border ${
                      errors.situacion ? "border-red-500" : "border-[#333333] focus:border-[#c5a059]"
                    } text-white rounded outline-none transition-colors duration-300 resize-none`}
                  />
                  {errors.situacion && (
                    <p className="text-red-400 text-xs mt-1.5">{errors.situacion}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="sm:col-span-2 mt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-[#c5a059] hover:bg-transparent text-[#050505] hover:text-[#c5a059] font-bold text-sm uppercase tracking-wider rounded border-2 border-[#c5a059] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Procesando e iniciando WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Enviar Aplicación Directa</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
