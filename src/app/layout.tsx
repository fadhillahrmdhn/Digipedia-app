import type { Metadata } from "next";
// Perbaikan import font Geist (kemungkinan ini yang dimaksud lead-mu)
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Header from "@/components/custom/Navbar"; // Sesuai nama file lead

// == Dipertahankan dari kode lead ==
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
      <body
        // == ClassName digabungkan ==
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-[#0D2579] text-white`}
      >
        <QueryProvider>
          <Header />
          <main className="container py-6">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
