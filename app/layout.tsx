import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YoSawer - Support Gua!",
  description: "Kalo lo suka konten gua, bisa dikasih sawer disini. 100% langsung ke gua tanpa potongan.",
  keywords: ["donasi", "donation", "payment", "qris", "indonesia", "support creator"],
  authors: [{ name: "YoSawer" }],
  openGraph: {
    title: "YoSawer - Support Gua!",
    description: "Kalo lo suka konten gua, bisa dikasih sawer disini. 100% langsung ke gua tanpa potongan.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "YoSawer - Support Gua!",
    description: "Kalo lo suka konten gua, bisa dikasih sawer disini. 100% langsung ke gua tanpa potongan.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
