import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Syne } from "next/font/google";
import Navbar from "@/components/Navbar";
import ScrollGrowthBar from "@/components/ScrollGrowthBar";
import FloatingQuickActions from "@/components/FloatingQuickActions";
import LiveVisitorCounter from "@/components/LiveVisitorCounter";
import GrowthQuizTab from "@/components/GrowthQuizTab";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { createMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = createMetadata({
  title: "SideEye.in - B2B Growth Agency | Gurugram, India",
  description:
    "While your competitors run $5 ads, we automate their market share. Dual-powered B2B growth execution + Meta-compliant WhatsApp automation.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-stone font-sans text-ink">
        <ScrollGrowthBar />
        <Navbar />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <FloatingQuickActions />
        <LiveVisitorCounter />
        <GrowthQuizTab />
      </body>
    </html>
  );
}