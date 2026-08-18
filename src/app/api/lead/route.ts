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

    const { nombre, pais, interes, situacion } = validationResult.data;

    // Save lead to Firestore if database is initialized
    let savedToFirestore = false;
    if (db) {
      try {
        await addDoc(collection(db, "leads_metodo_ll"), {
          nombre,
          pais,
          interes,
          situacion,
          createdAt: serverTimestamp(),
          source: "metodo_ll_landing_v2",
        });
        savedToFirestore = true;
      } catch (firestoreError) {
        console.error("Firestore write warning:", firestoreError);
        // Continue silently so fallback WhatsApp redirect works seamlessly
      }
    }

    // Pre-formatted WhatsApp link
    const phone = "541176550332";
    const textMessage = `*NUEVA APLICACIÓN - MÉTODO LL*\n\n*Nombre:* ${nombre}\n*País:* ${pais}\n*Nivel de Interés:* ${interes}\n\n*Situación actual / Desafío:*\n"${situacion}"\n\nHola Lucas, acabo de completar el formulario en la web y quiero dar el siguiente paso.`;

    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(textMessage)}`;

    return NextResponse.json({
      success: true,
      savedToFirestore,
      whatsappUrl,
    });
  } catch (error) {
    console.error("Error processing lead submission:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Ocurrió un error inesperado. Inténtalo de nuevo.",
      },
      { status: 500 }
    );
  }
}
