"use client";

import { useQuery } from "@tanstack/react-query";
import { getDigimonDetail } from "@/services/digimon.service";
import Image from "next/image";

// Komponen ini menerima nama dan URL detail
type DigimonCardProps = Readonly<{
  name: string;
  href: string;
}>;

export default function DigimonCard({ name, href }: DigimonCardProps) {
  // Gunakan useQuery untuk mengambil detail berdasarkan URL (href)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["digimonDetail", name], // Key unik untuk setiap Digimon
    queryFn: () => getDigimonDetail(href),
  });

  // Tampilkan kerangka loading saat data detail sedang diambil
  if (isLoading) {
    return (
      <div className="w-36 h-48 bg-[#0F142B] rounded-xl flex items-center justify-center animate-pulse" />
    );
  }

  if (isError) return null; // Jangan tampilkan apa-apa jika detail gagal diambil

  // Ambil URL gambar dari data detail
  const imageUrl = data?.images?.[0]?.href ?? "";
  const level =
    data?.levels && data.levels.length > 0 ? data.levels[0].level : "Unknown";

  return (
    <div className="w-36 md:w-44 bg-[#1142B6] p-3 md:p-5 rounded-xl border border-white/10 hover:border-white/20 hover:bg-[#499CF0] hover:text-black transition-all-ease-in-out duration-200 cursor-pointer flex flex-col items-center">
      <Image
        src={imageUrl}
        alt={name}
        width={96}
        height={96}
        className="w-24 h-24 object-contain"
      />
      <p className="text-center mt-2 font-semibold truncate w-full">{name}</p>
      <p className="text-center text-sm text-black-400">{level}</p>
    </div>
  );
}
