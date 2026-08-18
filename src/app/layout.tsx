import type { Metadata } from "next";
import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Método LL - Desarrollo y Negocios | Lucas",
  description: "Psicología, finanzas y decisiones estratégicas para escalar sin límites. El método definitivo para quienes buscan resultados reales sin atajos.",
  keywords: ["Método LL", "Lucas", "Mentoría de negocios", "Escalar ventas", "Psicología de negocios", "Finanzas"],
  authors: [{ name: "Lucas - Método LL" }],
  openGraph: {
    title: "Método LL - Desarrollo y Negocios",
    description: "Psicología, finanzas y decisiones estratégicas para escalar sin límites.",
    type: "website",
    locale: "es_AR",
    siteName: "Método LL",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable} ${playfair.variable} scroll-smooth`}>
      <body className="bg-[#050505] text-[#f8f8f8] font-sans antialiased selection:bg-[#c5a059] selection:text-black">
        {children}
      </body>
    </html>
  );
}
