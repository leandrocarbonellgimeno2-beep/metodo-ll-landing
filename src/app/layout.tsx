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
  metadataBase: new URL("https://www.lucasacostaok.com"),
  title: "Método LL — Desarrollo, Psicología y Negocios | Lucas Acosta",
  description:
    "Psicología, finanzas y decisiones estratégicas para escalar sin límites. El método definitivo para quienes buscan resultados reales sin atajos.",
  keywords: [
    "Método LL",
    "Lucas Acosta",
    "Mentoría de negocios",
    "Escalar ventas",
    "Psicología de negocios",
    "Finanzas",
  ],
  authors: [{ name: "Lucas Acosta - Método LL" }],
  openGraph: {
    title: "Método LL — Desarrollo, Psicología y Negocios | Lucas Acosta",
    description:
      "Psicología, finanzas y decisiones estratégicas para escalar sin límites. El método definitivo para quienes buscan resultados reales sin atajos.",
    url: "https://www.lucasacostaok.com",
    siteName: "Método LL",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.jpeg",
        width: 1200,
        height: 630,
        alt: "Lucas Acosta - Método LL",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Método LL — Desarrollo, Psicología y Negocios | Lucas Acosta",
    description:
      "Psicología, finanzas y decisiones estratégicas para escalar sin límites.",
    images: ["/images/hero-bg.jpeg"],
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
