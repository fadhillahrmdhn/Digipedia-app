"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDigimonList } from "@/services/digimon.service"; // Sesuai service lead
import DigimonCard from "./DigimonCard";

export default function DigimonList() {
  const { data, isLoading } = useQuery({
    queryKey: ["featuredDigimonList"],
    queryFn: () => fetchDigimonList({ pageSize: 4 }),
  });

  // Akses array dari properti 'content'
  const digimonList = data?.content;

  if (isLoading) {
    // Tampilkan beberapa kerangka loading
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={`loading-skeleton-${idx}`}
            className="w-full h-48 bg-[#1142B6] rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
      {digimonList?.map((digimon) => (
        <DigimonCard key={digimon.id} digimonId={Number(digimon.id)} />
      ))}
    </div>
  );
}
