import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/custom/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DigiPedia",
  description: "Your Digital Monster Encyclopedia",
};

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Tambahkan class untuk background dan warna teks default */}
      <body className={`${inter.className} bg-[#001A7C] text-white`}>
        <QueryProvider>
          <Header /> {/* Ganti Navbar dengan Header */}
          <main className="container py-6">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
