import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HashScroll } from "@/components/layout/HashScroll";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { clinic } from "@/data/clinic";
import { siteUrl } from "@/data/navigation";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const shareTitle = `${clinic.name} | ${clinic.tagline} em Belo Horizonte`;
const shareDescription =
  "Odontologia funcional e estética no bairro Serra, em Belo Horizonte. Conheça a clínica, os tratamentos e solicite sua avaliação pelo WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${clinic.name} | ${clinic.tagline} em Belo Horizonte`,
    template: `%s | ${clinic.name}`,
  },
  description:
    "Estudo conceitual de redesign para a Clínica Dentarium, odontologia funcional e estética no bairro Serra, em Belo Horizonte.",
  // Demonstração: não indexar para não ser confundida com o site oficial.
  robots: { index: false, follow: false, nocache: true },
  applicationName: clinic.name,
  // Pré-visualização do link compartilhado; a imagem vem de opengraph-image.tsx.
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: clinic.name,
    url: "/",
    title: shareTitle,
    description: shareDescription,
  },
  twitter: { card: "summary_large_image", title: shareTitle, description: shareDescription },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" data-scroll-behavior="smooth" className={`${newsreader.variable} ${manrope.variable} antialiased`}>
      <body className="flex min-h-svh flex-col">
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-md bg-ink px-4 py-3 text-sm text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Header />
          <HashScroll />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
