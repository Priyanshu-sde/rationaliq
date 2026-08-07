import type { Metadata } from "next";
import { Inter, Playfair_Display, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "RationalIQ | Delivering Next Gen Business IQ for Startups, Brands and IPs & Family Businesses",
  description: "RationalIQ | NextGen IQ for Family Businesses, Founders and Funders",
  openGraph: {
    title: "RationalIQ | Delivering Next Gen Business IQ for Startups, Brands and IPs & Family Businesses",
    description: "RationalIQ | NextGen IQ for Family Businesses, Founders and Funders",
  },
  twitter: {
    card: "summary_large_image",
    title: "RationalIQ | Delivering Next Gen Business IQ for Startups, Brands and IPs & Family Businesses",
    description: "RationalIQ | NextGen IQ for Family Businesses, Founders and Funders",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${dmSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
