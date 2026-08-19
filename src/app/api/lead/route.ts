import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/validations/lead";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Zod validation
    const validationResult = leadSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { nombre, telefono, pais, interes, capital, urgencia, situacion } =
      validationResult.data;

    // Save lead to Firestore if database is initialized
    let savedToFirestore = false;
    let leadId = null;

    if (db) {
      try {
        const docRef = await addDoc(collection(db, "leads_metodo_ll"), {
          nombre,
          telefono,
          pais,
          interes,
          capital,
          urgencia,
          situacion,
          status: "Nuevo",
          createdAt: serverTimestamp(),
          source: "metodo_ll_landing_v3",
        });
        savedToFirestore = true;
        leadId = docRef.id;
      } catch (firestoreError) {
        console.error("Firestore write warning:", firestoreError);
        // Continue silently so fallback WhatsApp redirect works seamlessly
      }
    }

    // Pre-formatted WhatsApp link for Lucas
    const phone = "541176550332";
    const textMessage = `*NUEVA APLICACIÓN CALIFICADA - MÉTODO LL*\n\n*Nombre:* ${nombre}\n*WhatsApp:* ${telefono}\n*País:* ${pais}\n\n*Programa de Interés:* ${interes}\n*Capacidad de Inversión:* ${capital}\n*Disponibilidad/Urgencia:* ${urgencia}\n\n*Diagnóstico / Situación actual:*\n"${situacion}"\n\nHola Lucas, acabo de enviar mi aplicación calificada en la web y quiero evaluar si soy apto para comenzar.`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(textMessage)}`;

    return NextResponse.json({
      success: true,
      leadId,
      savedToFirestore,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Ocurrió un error inesperado al procesar la aplicación. Inténtalo de nuevo.",
      },
      { status: 500 }
    );
  }
}
