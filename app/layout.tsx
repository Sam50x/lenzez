import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Background from "./components/Background";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lenzez",
  description: "AI-Powered Images Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <Background />
        <main className="z-10 absolute">
          <nav className="p-6 lg:p-8 lg:px-20 transition-all duration-300 w-screen flex justify-between items-center">
            <Link href={'/'} className="text-3xl lg:text-5xl font-bold">Lenzez</Link>
            <p className="font-semibold">AI-Powered Image Editor</p>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
