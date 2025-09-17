"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllDigimon } from "@/services/digimon.service";
import DigimonCard from "./DigimonCard"; // Impor komponen kartu baru kita

export default function DigimonList() {
  const { data: digimonList, isLoading } = useQuery({
    queryKey: ["digimonList"],
    queryFn: getAllDigimon,
  });

  if (isLoading) return <p className="text-center p-10">Loading featured...</p>;

  return (
    <div className="flex justify-center flex-wrap gap-6">
      {digimonList?.map((digimon) => (
        <DigimonCard key={digimon.id} name={digimon.name} href={digimon.href} />
      ))}
    </div>
  );
}
