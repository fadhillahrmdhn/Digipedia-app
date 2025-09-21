"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDigimonDetail } from "@/services/digimon.service"; // Sesuai service lead
import Image from "next/image";

export default function DigimonCard({
  digimonId,
}: {
  readonly digimonId: number;
}) {
  // Ambil detail lengkap untuk kartu ini menggunakan ID
  const { data: digimon, isLoading } = useQuery({
    queryKey: ["digimonDetail", digimonId],
    queryFn: () => fetchDigimonDetail(String(digimonId)), // Panggil service dengan ID
  });

  // Tampilkan kerangka loading saat detail sedang diambil
  if (isLoading || !digimon) {
    return (
      <div className="w-45 h-48 bg-[#0F142B] rounded-xl animate-pulse mx-auto" />
    );
  }

  const imageUrl = digimon.images[0]?.href;
  const level = digimon.levels[0]?.level || "Unknown";

  return (
    <div className="w-45 bg-[#1142B6] hover:bg-[#499CF0] cursor-pointer p-3 rounded-xl border-white/10 flex flex-col items-center mx-auto">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={digimon.name}
          width={100}
          height={100}
          className="w-33"
        />
      ) : (
        // Tampilan cadangan jika tidak ada gambar
        <div className="w-24 h-24 flex items-center justify-center text-xl font-bold bg-white/10 rounded-full">
          ?
        </div>
      )}
      <div className="text-center w-full mt-2">
        <p className="font-semibold truncate">{digimon.name}</p>
        <p className="text-sm text-white">{level}</p>
      </div>
    </div>
  );
}
