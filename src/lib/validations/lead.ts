import { z } from "zod";

export const leadSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: "Ingresa tu nombre completo (mínimo 2 caracteres)." }),
  telefono: z
    .string()
    .min(6, { message: "Ingresa un número de WhatsApp / teléfono válido." }),
  pais: z
    .string()
    .min(2, { message: "Ingresa tu país de residencia." }),
  interes: z.enum(
    [
      "La Mente Detrás del Negocio",
      "Construí tu Primer Negocio",
      "Escalá Personalizado (1 a 1)",
      "Aprender a invertir en negocios rentables",
      "Asesoría en Prestamistas",
    ],
    {
      errorMap: () => ({ message: "Selecciona el nivel o programa de tu interés." }),
    }
  ),
  capital: z.enum(
    [
      "Menos de $500 USD",
      "$500 - $1.000 USD",
      "$1.000 - $3.000 USD",
      "Más de $3.000 USD",
    ],
    {
      errorMap: () => ({ message: "Selecciona tu capacidad de inversión disponible." }),
    }
  ),
  urgencia: z.enum(
    [
      "Inmediata (Este mes)",
      "En 1 a 3 meses",
      "Solo explorando opciones",
    ],
    {
      errorMap: () => ({ message: "Indica tu nivel de urgencia o disponibilidad." }),
    }
  ),
  situacion: z
    .string()
    .min(10, { message: "Describe brevemente tu situación actual o cuello de botella (mínimo 10 caracteres)." }),
});

export type LeadFormData = z.infer<typeof leadSchema>;

// Step-by-step partial schemas for multi-step form validation
export const step1Schema = leadSchema.pick({
  nombre: true,
  telefono: true,
  pais: true,
});

export const step2Schema = leadSchema.pick({
  interes: true,
  capital: true,
  urgencia: true,
});

export const step3Schema = leadSchema.pick({
  situacion: true,
});
