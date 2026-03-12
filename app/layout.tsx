import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Riverstone Labs | AI Implementation That Delivers ROI",
  description: "Turn AI hype into real business ROI. We implement AI that actually works. Get a dedicated AI team for a fraction of the cost of hiring in-house — with measurable returns in 90 days.",
  keywords: "AI consultancy, AI implementation, Brisbane AI, SMB AI, ROI from AI, artificial intelligence consulting",
  openGraph: {
    title: "Riverstone Labs | AI Implementation That Delivers ROI",
    description: "Turn AI hype into real business ROI. We implement AI that actually works for your business.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
