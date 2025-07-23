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
      <body
        className={`antialiased overflow-hidden`}
      >
        <main className="bg-primary min-h-screen font-gugi">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
