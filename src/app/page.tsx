// src/app/page.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Komponen Button dari Shadcn/ui
import DigimonList from "@/components/custom/DigimonList"; // Komponen yang sudah kita buat

export default function HomePage() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-16 py-10">
        {/* Kolom Kiri: Teks & Tombol */}
        <div className="flex flex-col md:mt-20 gap-6 md:gap-9 text-center md:text-center">
          <h1 className="text-4xl md:text-[55px] text-[#499CF0] font-bold">
            DigiPedia
          </h1>
          <h2 className="text-xl md:text-[25px] font-semibold">
            Selamat datang di DigiPedia !
          </h2>
          <p className="text-base md:text-[18px] text-white font-light">
            Kumpulan data Digimon favoritmu <br className="hidden md:block" />{" "}
            dalam satu tempat.
          </p>
          <div className="flex justify-center md:justify-center">
            <Link href="/gallery">
              <Button className="text-base md:text-[18px] px-6 md:px-8 py-4 md:py-6 text-white font-bold bg-[#499CF0] hover:bg-[#1142B6] hover:shadow-xl rounded-3xl cursor-pointer">
                Explore Gallery
              </Button>
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Gambar */}
        <div className="flex justify-center items-center w-full">
          <Image
            src="/digimon-characters.svg"
            alt="Digimon Heroes"
            width={700}
            height={200}
            priority
            className="object-contain w-full max-w-[400px] md:max-w-[670px] h-auto"
          />
        </div>
      </section>

      {/* ===== Featured Digimon Section ===== */}
      <section className="flex flex-col px-4 md:px-16 py-8">
        <h2 className="text-lg md:text-xl font-semibold text-center mb-4">
          Featured Digimon
        </h2>
        <DigimonList />
      </section>
    </>
  );
}
