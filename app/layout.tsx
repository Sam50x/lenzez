import type { Metadata } from "next";
import "./globals.css";

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
          {children}
        </main>
      </body>
    </html>
  );
}
