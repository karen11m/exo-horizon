import { Fraunces, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollTopButton from "@/components/ScrollTopButton";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://exo-horizon.onrender.com"),
  title: {
    default: "Karen Méndez | Desarrolladora Full-Stack — Soluciones Digitales y Automatización",
    template: "%s | Karen Méndez",
  },
  description:
    "Soy Karen Méndez, desarrolladora full-stack en Bogotá, Colombia. Creo páginas web, apps, automatización de procesos e integración de IA para tu negocio.",
  keywords: [
    "desarrolladora full-stack",
    "desarrollo web",
    "automatización",
    "inteligencia artificial",
    "Bogotá",
    "Colombia",
    "freelance",
  ],
  authors: [{ name: "Karen Méndez" }],
  openGraph: {
    title: "Karen Méndez | Desarrolladora Full-Stack",
    description:
      "Transformo ideas en soluciones digitales que funcionan. Desarrollo web, apps, automatización e IA.",
    type: "website",
    locale: "es_CO",
    siteName: "Karen Méndez",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karen Méndez | Desarrolladora Full-Stack",
    description: "Transformo ideas en soluciones digitales que funcionan.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="relative min-h-screen overflow-x-clip bg-bg font-sans text-ink antialiased">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 bg-noise opacity-[0.07]"
        />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollTopButton />
      </body>
    </html>
  );
}