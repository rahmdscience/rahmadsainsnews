
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORM. — The Art of Building Tomorrow",
  description:
    "An independent editorial journal exploring innovation, culture, technology and the future.",
  keywords: [
    "Editorial",
    "Scrollytelling",
    "Technology",
    "Design",
    "Innovation"
  ],
  authors: [{ name: "Rahmad Sains" }]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
