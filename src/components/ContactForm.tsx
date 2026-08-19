"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  Phone,
  Globe,
  Briefcase,
  DollarSign,
  Clock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from "lucide-react";
import {
  leadSchema,
  step1Schema,
  step2Schema,
  step3Schema,
  type LeadFormData,
} from "@/lib/validations/lead";

const capitalOptions = [
  { value: "Menos de $500 USD", label: "Menos de $500 USD", desc: "Inicial / Aprendizaje" },
  { value: "$500 - $1.000 USD", label: "$500 - $1.000 USD", desc: "Emprendedor Activo" },
  { value: "$1.000 - $3.000 USD", label: "$1.000 - $3.000 USD", desc: "Negocio en Escalación" },
  { value: "Más de $3.000 USD", label: "Más de $3.000 USD", desc: "Inversionista / High-Ticket" },
];

const urgenciaOptions = [
  { value: "Inmediata (Este mes)", label: "⚡ Inmediata (Este mes)", desc: "Listo para empezar ya" },
  { value: "En 1 a 3 meses", label: "📅 En 1 a 3 meses", desc: "Planificando presupuesto" },
  { value: "Solo explorando opciones", label: "🔍 Solo explorando", desc: "Evaluando alternativas" },
];

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeadFormData>({
    nombre: "",
    telefono: "",
    pais: "",
    interes: "La Mente Detrás del Negocio",
    capital: "$500 - $1.000 USD",
    urgencia: "Inmediata (Este mes)",
    situacion: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const handleOptionSelect = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const validateStep = (step: number) => {
    let schema;
    if (step === 1) schema = step1Schema;
    else if (step === 2) schema = step2Schema;
    else schema = step3Schema;

    const result = schema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const prevStep = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate complete schema
    const validation = leadSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
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
          const apiErrors: Record<string, string> = {};
          Object.keys(data.errors).forEach((key) => {
            apiErrors[key] = data.errors[key][0];
          });
          setErrors(apiErrors);
        } else {
          setServerError(data.message || "No se pudo procesar la solicitud.");
        }
        setIsSubmitting(false);
        return;
      }

      // Success state
      setIsSuccess(true);

      // Trigger automatic WhatsApp redirect
      if (data.whatsappUrl) {
        setTimeout(() => {
          window.open(data.whatsappUrl, "_blank");
        }, 800);
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
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" /> Proceso de Selección Exclusivo
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#c5a059] mb-5 tracking-widest uppercase font-heading">
            APLICACIÓN AL MÉTODO LL
          </h2>
          <p className="text-base sm:text-xl text-[#b0b0b0] max-w-2xl mx-auto leading-relaxed">
            No trabajamos con cualquiera. Evaluamos tu perfil para asegurarnos de que cuentas con la mentalidad y capacidad necesaria para ejecutar los resultados.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[850px] mx-auto bg-[#1a1a1a] p-8 sm:p-14 rounded-2xl border border-[#333333] shadow-2xl relative overflow-hidden"
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <CheckCircle2 className="w-20 h-20 text-[#c5a059] mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4 uppercase font-heading">
                ¡Aplicación Calificada Exitosamente!
              </h3>
              <p className="text-[#b0b0b0] text-lg max-w-lg mx-auto leading-relaxed mb-8">
                Tus datos han sido registrados e integrados en nuestro sistema. En breve serás redirigido al WhatsApp directo de Lucas para evaluar los siguientes pasos.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(1);
                  setFormData({
                    nombre: "",
                    telefono: "",
                    pais: "",
                    interes: "La Mente Detrás del Negocio",
                    capital: "$500 - $1.000 USD",
                    urgencia: "Inmediata (Este mes)",
                    situacion: "",
                  });
                }}
                className="px-6 py-3 bg-transparent border border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059] hover:text-black transition-all rounded font-bold uppercase text-xs tracking-wider"
              >
                Completar otra aplicación
              </button>
            </motion.div>
          ) : (
            <div>
              {/* Progress Header */}
              <div className="mb-10">
                <div className="flex justify-between items-center text-xs uppercase tracking-wider text-[#b0b0b0] mb-3 font-semibold">
                  <span>Paso {currentStep} de 3</span>
                  <span className="text-[#c5a059]">
                    {currentStep === 1 && "Datos Personales"}
                    {currentStep === 2 && "Calificación & Capacidad"}
                    {currentStep === 3 && "Diagnóstico Final"}
                  </span>
                </div>
                <div className="w-full bg-[#050505] h-2 rounded-full overflow-hidden border border-[#333333]">
                  <div
                    className="bg-gradient-to-r from-[#c5a059] to-[#dfb668] h-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </div>

              {serverError && (
                <div className="mb-6 p-4 bg-red-950/60 border border-red-800 text-red-300 rounded-lg flex items-center gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <AnimatePresence mode="wait">
                  {/* STEP 1: Datos Personales */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 uppercase font-heading">
                        <User className="w-5 h-5 text-[#c5a059]" /> 1. Información Personal
                      </h3>

                      {/* Nombre */}
                      <div>
                        <label htmlFor="nombre" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                          Nombre Completo *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            placeholder="Ej: Juan Pérez"
                            className={`w-full p-4 pl-12 bg-[#050505] border ${
                              errors.nombre ? "border-red-500" : "border-[#333333] focus:border-[#c5a059]"
                            } text-white rounded outline-none transition-colors duration-300`}
                          />
                          <User className="w-5 h-5 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.nombre && <p className="text-red-400 text-xs mt-1.5">{errors.nombre}</p>}
                      </div>

                      {/* Telefono */}
                      <div>
                        <label htmlFor="telefono" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                          WhatsApp Directo (con código de país) *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            id="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="Ej: +54 9 11 1234-5678"
                            className={`w-full p-4 pl-12 bg-[#050505] border ${
                              errors.telefono ? "border-red-500" : "border-[#333333] focus:border-[#c5a059]"
                            } text-white rounded outline-none transition-colors duration-300`}
                          />
                          <Phone className="w-5 h-5 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.telefono && <p className="text-red-400 text-xs mt-1.5">{errors.telefono}</p>}
                      </div>

                      {/* Pais */}
                      <div>
                        <label htmlFor="pais" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                          País de Residencia *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="pais"
                            value={formData.pais}
                            onChange={handleChange}
                            placeholder="Ej: Argentina, México, España..."
                            className={`w-full p-4 pl-12 bg-[#050505] border ${
                              errors.pais ? "border-red-500" : "border-[#333333] focus:border-[#c5a059]"
                            } text-white rounded outline-none transition-colors duration-300`}
                          />
                          <Globe className="w-5 h-5 text-[#666666] absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>
                        {errors.pais && <p className="text-red-400 text-xs mt-1.5">{errors.pais}</p>}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Calificación & Capacidad */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 uppercase font-heading">
                        <Briefcase className="w-5 h-5 text-[#c5a059]" /> 2. Calificación & Nivel
                      </h3>

                      {/* Interes */}
                      <div>
                        <label htmlFor="interes" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                          ¿Qué programa o servicio necesitas aplicar? *
                        </label>
                        <select
                          id="interes"
                          value={formData.interes}
                          onChange={handleChange}
                          className="w-full p-4 bg-[#050505] border border-[#333333] focus:border-[#c5a059] text-white rounded outline-none transition-colors duration-300"
                        >
                          <option value="La Mente Detrás del Negocio">
                            1. La Mente Detrás del Negocio ($49.999 ARS / $50 USD)
                          </option>
                          <option value="Construí tu Primer Negocio">
                            2. Construí tu Primer Negocio ($149.000 ARS / $100 USD)
                          </option>
                          <option value="Escalá Personalizado (1 a 1)">
                            3. Escalá Personalizado 1 a 1 (Entrevista Previa)
                          </option>
                          <option value="Aprender a invertir en negocios rentables">
                            4. Aprender a invertir en negocios rentables ($870.000 ARS / $800 USD)
                          </option>
                          <option value="Asesoría en Prestamistas">
                            5. Asesoría en Prestamistas / Sistema Operativo
                          </option>
                        </select>
                      </div>

                      {/* Capital Disponible */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-[#c5a059]" /> Capacidad de Inversión Disponible *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {capitalOptions.map((opt) => {
                            const isSelected = formData.capital === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => handleOptionSelect("capital", opt.value)}
                                className={`p-4 text-left rounded-lg border transition-all duration-300 ${
                                  isSelected
                                    ? "bg-[#c5a059]/10 border-[#c5a059] text-white"
                                    : "bg-[#050505] border-[#333333] text-[#b0b0b0] hover:border-[#666666]"
                                }`}
                              >
                                <div className="font-bold text-sm text-white mb-0.5">{opt.label}</div>
                                <div className="text-xs text-[#888888]">{opt.desc}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Urgencia */}
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#c5a059]" /> Disponibilidad / Urgencia para comenzar *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {urgenciaOptions.map((opt) => {
                            const isSelected = formData.urgencia === opt.value;
                            return (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => handleOptionSelect("urgencia", opt.value)}
                                className={`p-3.5 text-center rounded-lg border transition-all duration-300 ${
                                  isSelected
                                    ? "bg-[#c5a059]/10 border-[#c5a059] text-white"
                                    : "bg-[#050505] border-[#333333] text-[#b0b0b0] hover:border-[#666666]"
                                }`}
                              >
                                <div className="font-semibold text-xs text-white">{opt.label}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Diagnóstico Final */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 uppercase font-heading">
                        <Send className="w-5 h-5 text-[#c5a059]" /> 3. Diagnóstico & Compromiso
                      </h3>

                      <div>
                        <label htmlFor="situacion" className="block text-xs uppercase tracking-wider text-[#b0b0b0] mb-2 font-semibold">
                          Describe tu situación actual y tu principal obstáculo a resolver *
                        </label>
                        <textarea
                          id="situacion"
                          rows={5}
                          value={formData.situacion}
                          onChange={handleChange}
                          placeholder="Sé transparente. ¿Qué es lo que más te frena hoy y qué buscas lograr exactamente?"
                          className={`w-full p-4 bg-[#050505] border ${
                            errors.situacion ? "border-red-500" : "border-[#333333] focus:border-[#c5a059]"
                          } text-white rounded outline-none transition-colors duration-300 resize-none`}
                        />
                        {errors.situacion && <p className="text-red-400 text-xs mt-1.5">{errors.situacion}</p>}
                      </div>

                      {/* Summary recap */}
                      <div className="p-4 bg-[#050505] border border-[#262626] rounded-lg text-xs space-y-1.5 text-[#b0b0b0]">
                        <div className="text-white font-semibold mb-1">Resumen de Aplicación:</div>
                        <div>• Applicant: <span className="text-white">{formData.nombre}</span> ({formData.pais})</div>
                        <div>• WhatsApp: <span className="text-white">{formData.telefono}</span></div>
                        <div>• Programa: <span className="text-[#c5a059] font-medium">{formData.interes}</span></div>
                        <div>• Presupuesto: <span className="text-white">{formData.capital}</span> | Urgencia: <span className="text-white">{formData.urgencia}</span></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Form Controls */}
                <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-[#262626]">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3.5 bg-transparent border border-[#333333] text-white hover:border-[#c5a059] transition-colors rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Anterior
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3.5 bg-[#c5a059] text-[#050505] hover:bg-transparent hover:text-[#c5a059] border-2 border-[#c5a059] transition-all duration-300 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                    >
                      Siguiente paso <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-4 bg-[#c5a059] text-[#050505] hover:bg-transparent hover:text-[#c5a059] border-2 border-[#c5a059] transition-all duration-300 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Procesando Aplicación...
                        </>
                      ) : (
                        <>
                          Enviar Aplicación Exclusiva <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
