import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riverstone Labs | AI Implementation That Actually Works",
  description: "Premium AI consultancy specializing in strategy, LLM applications, RAG systems, and production-ready AI solutions. We build AI that delivers real business results.",
  keywords: ["AI consultancy", "LLM development", "RAG systems", "AI strategy", "machine learning", "AI implementation"],
  authors: [{ name: "Riverstone Labs" }],
  creator: "Riverstone Labs",
  publisher: "Riverstone Labs",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riverstone.ai",
    siteName: "Riverstone Labs",
    title: "Riverstone Labs | AI Implementation That Actually Works",
    description: "Premium AI consultancy specializing in strategy, LLM applications, RAG systems, and production-ready AI solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riverstone Labs | AI Implementation That Actually Works",
    description: "Premium AI consultancy specializing in strategy, LLM applications, RAG systems, and production-ready AI solutions.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
