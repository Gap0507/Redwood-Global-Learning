import type { Metadata } from "next";
import { Inter, Space_Grotesk, Patrick_Hand, Poppins, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Primary font for body text - clean and readable
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Heading font - bold and distinctive for NASA-inspired feel
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-cursive",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Strong display font for headlines - premium and impactful
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Redwood Global Learning | Experience the World",
  description:
    "Join our global exchange program and explore exciting cultures, diverse landscapes, and top universities worldwide. Your classroom is the world.",
  keywords: [
    "global exchange program",
    "study abroad",
    "international education",
    "student exchange",
    "redwood learning",
  ],
  openGraph: {
    title: "Redwood Global Learning",
    description: "Experience the world before you graduate.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script src="/webgpu-polyfill.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${patrickHand.variable} ${poppins.variable} ${montserrat.variable} antialiased font-sans bg-gradient-space min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}