import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "metodoll2026";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("x-admin-key") || request.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "").trim();
  return token === ADMIN_SECRET;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "No autorizado." }, { status: 401 });
  }

  try {
    if (!db) {
      // Mock data for build/demo when env vars are not yet linked
      return NextResponse.json({
        success: true,
        fallbackMode: true,
        leads: [
          {
            id: "demo-1",
            nombre: "Carlos Rodríguez",
            telefono: "+54 9 11 4433-2211",
            pais: "Argentina",
            interes: "Aprender a invertir en negocios rentables",
            capital: "Más de $3.000 USD",
            urgencia: "Inmediata (Este mes)",
            situacion: "Tengo capital propio y busco diversificar en negocios probados con alto retorno.",
            status: "Nuevo",
            createdAt: new Date().toISOString(),
          },
          {
            id: "demo-2",
            nombre: "Mariano Gómez",
            telefono: "+52 55 1234-5678",
            pais: "México",
            interes: "Escalá Personalizado (1 a 1)",
            capital: "$1.000 - $3.000 USD",
            urgencia: "Inmediata (Este mes)",
            situacion: "Tengo una agencia facturando 5k USD y necesito estructurar ventas y delegación.",
            status: "Contactado",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ],
      });
    }

    const leadsRef = collection(db, "leads_metodo_ll");
    const q = query(leadsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const leads = querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        nombre: data.nombre || "Sin Nombre",
        telefono: data.telefono || "Sin Teléfono",
        pais: data.pais || "Sin País",
        interes: data.interes || "General",
        capital: data.capital || "No Especificado",
        urgencia: data.urgencia || "No Especificada",
        situacion: data.situacion || "",
        status: data.status || "Nuevo",
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
      };
    });

    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error("Error fetching admin leads:", error);
    return NextResponse.json(
      { success: false, message: "Error al recuperar la lista de leads." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "No autorizado." }, { status: 401 });
  }

  try {
    const { leadId, status } = await request.json();

    if (!leadId || !status) {
      return NextResponse.json(
        { success: false, message: "ID y estado son requeridos." },
        { status: 400 }
      );
    }

    if (db) {
      const leadDocRef = doc(db, "leads_metodo_ll", leadId);
      await updateDoc(leadDocRef, { status });
    }

    return NextResponse.json({ success: true, leadId, status });
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar el estado del lead." },
      { status: 500 }
    );
  }
}
