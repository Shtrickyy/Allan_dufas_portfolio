import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

import "./globals.css";

export const metadata: Metadata = {
  title: "Allan Dufas",
  description:
    "Turning fragmented expertise into coherent decision systems — across products, workflows, training and customer operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased">
        <Navbar />
        <main className="flex-1 pt-16 md:pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
