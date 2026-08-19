import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";

const VALID_ADMINS = [
  { email: "sistemablindaje@gmail.com", pass: "Luc@sSistem@Admin2026!" },
  { email: "administrador@gmail.com", pass: "Pel@tud@DeMierd@2026!" },
];

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("x-admin-key") || request.headers.get("authorization");
  if (!authHeader) return false;

  const rawToken = authHeader.replace("Bearer ", "").trim();

  // 1. Check legacy PIN secret
  const legacySecret = process.env.ADMIN_SECRET_KEY || "metodoll2026";
  if (rawToken === legacySecret) return true;

  // 2. Try decoding base64 token (email:pass)
  try {
    const decoded = Buffer.from(rawToken, "base64").toString("utf-8");
    const [email, pass] = decoded.split(":");

    if (email && pass) {
      const match = VALID_ADMINS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass
      );
      if (match) return true;
    }
  } catch {
    // ignore decode error
  }

  // 3. Direct pass check
  const passMatch = VALID_ADMINS.some((u) => u.pass === rawToken);
  return passMatch;
}

export async function GET(request: Request) {
  // Authorization Check
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, message: "Acceso no autorizado." }, { status: 401 });
  }

  // If token is valid, attempt Firestore query with safe fallback
  if (!db) {
    return NextResponse.json({
      success: true,
      fallbackMode: true,
      leads: [],
      message: "Firebase no está configurado. Operando en modo seguro.",
    });
  }

  try {
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
  } catch (firestoreError) {
    console.warn("Firestore query warning (falling back to empty list):", firestoreError);

    return NextResponse.json({
      success: true,
      fallbackMode: true,
      leads: [],
      warning: "No se pudieron obtener los datos de Firestore en este momento.",
    });
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
      try {
        const leadDocRef = doc(db, "leads_metodo_ll", leadId);
        await updateDoc(leadDocRef, { status });
      } catch (err) {
        console.warn("Firestore status update warning:", err);
      }
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
