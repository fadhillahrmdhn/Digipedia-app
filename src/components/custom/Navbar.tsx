"use client"; // Langkah 1: Jadikan Client Component

import { useState, useEffect } from "react"; // Impor hooks yang dibutuhkan
import Link from "next/link";
import { Home, Images } from "lucide-react";

export default function Header() {
  // Langkah 2: Buat state untuk melacak posisi scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // Langkah 3: Tambahkan event listener untuk scroll
  useEffect(() => {
    const handleScroll = () => {
      // Jika posisi scroll (Y) lebih dari 10px, set isScrolled menjadi true
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Daftarkan event listener saat komponen pertama kali dirender
    window.addEventListener("scroll", handleScroll);

    // Hapus event listener saat komponen di-unmount untuk mencegah memory leak
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Array kosong [] memastikan efek ini hanya berjalan sekali

  return (
    // Langkah 4: Terapkan class secara dinamis
    <header
      className={`p-[15px] sticky top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#1142B6]/35 shadow-md " : "bg-[#499CF0]"
      }`}
    >
      <nav className="container mx-auto flex justify-center items-center h-15">
        <div className="flex items-center gap-8 md:gap-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-black text-[20px] font-bold hover:text-white transition-colors"
          >
            <Home size={25} />
            <span>Home</span>
          </Link>
          <Link
            href="/gallery"
            className="flex items-center gap-2 text-black text-[20px] font-bold hover:text-white transition-colors"
          >
            <Images size={25} />
            <span>Gallery</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
