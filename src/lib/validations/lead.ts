import { z } from "zod";

export const leadSchema = z.object({
  nombre: z
    .string()
    .min(2, { message: "Por favor ingresa tu nombre completo (mínimo 2 caracteres)." }),
  pais: z
    .string()
    .min(2, { message: "Por favor ingresa tu país de residencia." }),
  interes: z.enum(
    [
      "La Mente Detrás del Negocio",
      "Construí tu Primer Negocio",
      "Escalá Personalizado (1 a 1)",
      "Sistema para Prestamistas",
    ],
    {
      errorMap: () => ({ message: "Selecciona una opción de interés válida." }),
    }
  ),
  situacion: z
    .string()
    .min(5, { message: "Por favor describe brevemente tu situación actual y tus objetivos (mínimo 5 caracteres)." }),
});

export type LeadFormData = z.infer<typeof leadSchema>;
