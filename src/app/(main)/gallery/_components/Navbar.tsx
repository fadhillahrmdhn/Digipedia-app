"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Images } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Event listener untuk scroll
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
    <header
      className={`p-[15px] ${isScrolled ? "bg-[#1142B6]/35 shadow-md " : "bg-[#499CF0]"}`}
    >
      <nav className="container mx-auto flex justify-center items-center h-15">
        <div className="flex items-center gap-10 md:gap-20">
          <Link
            href="/"
            className={`flex items-center gap-2 text-[20px] font-bold transition-colors px-3 py-1 rounded-lg ${pathname === "/" ? "text-white bg-[#1142B6]" : "text-black hover:bg-[#1142B6] hover:text-white"}`}
          >
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link
            href="/gallery"
            className={`flex items-center gap-2 text-[20px] font-bold transition-colors px-3 py-1 rounded-lg ${pathname === "/gallery" ? "text-white bg-[#1142B6]" : "text-black hover:bg-[#1142B6] hover:text-white"}`}
          >
            <Images size={20} />
            <span>Gallery</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
