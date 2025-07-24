import type { Metadata } from "next";
import "./globals.css";
import Sidebar from './ui/Sidebar'

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
      <body className="antialiased">
        <main className="bg-background min-h-screen font-gugi flex flex-col lg:flex-row-reverse">
          <Sidebar />
          <section className="mb-12 mt-6 lg:mt-0 lg:w-4/5 text-text">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
