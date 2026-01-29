import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lamborghini Temerario | The First HPEV Super Sports Car",
  description:
    "Experience the Lamborghini Temerario - the first High Performance Electrified Vehicle (HPEV) super sports car. Twin-Turbo V8 combined with three electric motors delivering 920 CV.",
  keywords: [
    "Lamborghini",
    "Temerario",
    "HPEV",
    "Super Sports Car",
    "Hybrid",
    "V8",
    "Electric",
  ],
  openGraph: {
    title: "Lamborghini Temerario | 920 CV HPEV",
    description:
      "The first High Performance Electrified Vehicle super sports car from Lamborghini.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${rajdhani.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
