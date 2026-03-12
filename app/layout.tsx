import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Server startup logging
if (typeof window === 'undefined') {
  console.log('[Server] Riverstone Labs website starting up...');
  console.log('[Server] NODE_ENV:', process.env.NODE_ENV);
  console.log('[Server] PORT:', process.env.PORT || 3000);
}

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
  title: "Riverstone Labs | AI That Works. Results That Scale.",
  description: "Premium AI consultancy helping Brisbane and Australian businesses implement AI that delivers real ROI. Strategy, build, and handover — we make AI actually work for your business.",
  keywords: ["AI consultancy", "AI implementation", "AI strategy", "Brisbane AI", "Australian AI consultancy", "business AI", "ROI-focused AI"],
  authors: [{ name: "Riverstone Labs" }],
  creator: "Riverstone Labs",
  publisher: "Riverstone Labs",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://riverstonelabs.com.au",
    siteName: "Riverstone Labs",
    title: "Riverstone Labs | AI That Works. Results That Scale.",
    description: "Premium AI consultancy helping Australian businesses implement AI that delivers real ROI.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riverstone Labs | AI That Works. Results That Scale.",
    description: "Premium AI consultancy helping Australian businesses implement AI that delivers real ROI.",
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
