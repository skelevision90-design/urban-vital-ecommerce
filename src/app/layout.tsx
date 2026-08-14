import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/Toast";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F3E9",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanvital.in"),
  title: "URBAN VITAL | 100% Natural Children's Multivitamin Powder",
  description:
    "Urban Vital makes premium multivitamin powder for children from completely natural resources. No preservatives, zero harmful chemicals. Mixes with water or milk.",
  keywords: [
    "children multivitamin powder",
    "natural kids vitamins",
    "strawberry multivitamin",
    "malt multivitamin for kids",
    "cocoa focus vitamin",
    "preservative free kids nutrition"
  ],
  icons: {
    icon: "/images/emblem.png",
  },
  openGraph: {
    title: "URBAN VITAL | Real Food. Growing Kids. One Scoop.",
    description:
      "100% Natural Multivitamin Powder for Children. Free from preservatives, artificial sweeteners, and synthetic chemicals.",
    images: ["/images/sprout.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F8F3E9] text-[#2A2521] antialiased relative">
        {/* Subtle CSS SVG Grain Overlay (0.04 opacity) */}
        <div className="grain-overlay" aria-hidden="true" />

        <CartProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <ToastContainer />
        </CartProvider>
      </body>
    </html>
  );
}
