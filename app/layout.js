import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Particles from "@/components/Particles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollTopButton from "@/components/ScrollTopButton";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
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
    <html lang="es" data-scroll-behavior="smooth" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="relative min-h-screen overflow-x-clip bg-bg font-sans text-ink antialiased">
        <Particles />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollTopButton />
      </body>
    </html>
  );
}