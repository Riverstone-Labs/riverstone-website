import type { Metadata } from "next";
import { Sora, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riverstone Labs | AI That Actually Works",
  description: "AI That Actually Works. Revenue That Actually Grows. We implement AI solutions that deliver measurable ROI. Not chatbots that nobody uses. Not AI theatre. Real business outcomes.",
  keywords: "AI consultancy, AI implementation, Brisbane AI, SMB AI, ROI from AI, artificial intelligence consulting, Australia AI",
  openGraph: {
    title: "Riverstone Labs | AI That Actually Works",
    description: "We implement AI solutions that deliver measurable ROI. Real business outcomes for Australian SMBs.",
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
      <body className={`${sora.variable} ${dmSans.variable} ${jetBrainsMono.variable} font-sans antialiased bg-[#0A0A0F] text-white`}>
        {children}
      </body>
    </html>
  );
}
