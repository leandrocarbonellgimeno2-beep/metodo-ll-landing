import { NextResponse } from "next/server";

const VALID_ADMINS = [
  { email: "sistemablindaje@gmail.com", pass: "Luc@sSistem@Admin2026!" },
  { email: "administrador@gmail.com", pass: "Pel@tud@DeMierd@2026!" },
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Ingresa tu correo y contraseña." },
        { status: 400 }
      );
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPass = String(password).trim();

    // Check if matching valid admin user
    const matchedAdmin = VALID_ADMINS.find(
      (user) => user.email.toLowerCase() === cleanEmail && user.pass === cleanPass
    );

    // Also support fallback secret PIN check
    const isLegacySecret = cleanPass === (process.env.ADMIN_SECRET_KEY || "metodoll2026");

    if (!matchedAdmin && !isLegacySecret) {
      return NextResponse.json(
        { success: false, message: "Correo o contraseña incorrectos." },
        { status: 401 }
      );
    }

    // Generate safe session token (Base64 of email:pass or secret token)
    const token = matchedAdmin
      ? Buffer.from(`${matchedAdmin.email}:${matchedAdmin.pass}`).toString("base64")
      : Buffer.from(`admin:${cleanPass}`).toString("base64");

    return NextResponse.json({
      success: true,
      token,
      email: matchedAdmin ? matchedAdmin.email : "admin@metodoll.com",
    });
  } catch (error) {
    console.error("Login authentication error:", error);
    return NextResponse.json(
      { success: false, message: "Error al procesar el inicio de sesión." },
      { status: 500 }
    );
  }
}
