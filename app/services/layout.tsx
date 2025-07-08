import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lenzez | Services",
    description: "AI-Powered Images Editor",
};

export default function ServicesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section>
            {children}
        </section>
    );
}
