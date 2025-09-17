"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllDigimon } from "@/services/digimon.service";
import Image from "next/image";

// Komponen kerangka (skeleton) untuk loading
const LoadingSkeleton = () => (
  <div className="flex justify-center gap-6">
    {Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="w-32 h-32 bg-white/10 rounded-lg animate-pulse"
      ></div>
    ))}
  </div>
);

export default function DigimonList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allDigimon"],
    queryFn: getAllDigimon,
  });
  console.log("Digimon data:", data);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <p className="text-red-400">Gagal memuat Digimon.</p>;

  // Ambil hanya 3 Digimon pertama sebagai "featured"
  const featuredDigimon = data?.slice(0, 3);

  return (
    <div className="flex flex-wrap justify-center md:justify-center gap-4 md:gap-6">
      {featuredDigimon?.map((digimon) => (
        <div
          key={digimon.name}
          className="w-36 md:w-44 h-36 md:h-40 bg-[#1142B6] p-3 md:p-5 rounded-xl border border-white/10 hover:border-white/30 transition-all cursor-pointer flex flex-col items-center justify-center"
        >
          <Image
            src={digimon.img}
            alt={digimon.name}
            className="w-20 md:w-24 h-20 md:h-24 object-contain"
          />
        </div>
      ))}
    </div>
  );
}
