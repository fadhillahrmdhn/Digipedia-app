"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDigimonList, fetchDigimonDetail } from "@/services";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { X, Shield, Swords, Star } from "lucide-react";

const DigimonPage = () => {
  const { data } = useQuery({
    queryKey: ["digimonList", { page: 1, pageSize: 15 }],
    queryFn: () => fetchDigimonList({ page: 2, pageSize: 15 }),
  });

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="w-full">
      <div className="m-4 grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
        {data?.content && data.content.length > 0 ? (
          data.content.map((character) => (
            <button
              key={character.id}
              type="button"
              className="cursor-pointer text-left"
              onClick={() => setSelectedCard(character.id)}
            >
              <Card key={character.id} className="p-0 gap-0 overflow-hidden">
                <CardHeader className="p-0">
                  <Image
                    src={character.image}
                    alt={character.name}
                    width={400}
                    height={400}
                    className="w-full h-48 object-contain"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="font-bold text-center">
                    {character.name}
                  </CardTitle>
                </CardContent>
              </Card>
            </button>
          ))
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl text-muted-foreground">
            No characters found.
          </div>
        )}
      </div>

      {/* Menampilkan detail digimon */}
      {selectedCard && (
        <DigimonDetailView
          id={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </div>
  );
};

const DigimonDetailView = ({
  id,
  onClose,
}: {
  id: string;
  onClose: () => void;
}) => {
  const {
    data: detailData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["digimonDetail", id],
    queryFn: () => fetchDigimonDetail(id),
    enabled: !!id, // Hanya jalankan query jika `id` ada
  });

  if (isLoading)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-white">
        Loading details...
      </div>
    );
  if (error)
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center text-red-500">
        Error fetching details.
      </div>
    );

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md"
      >
        <button
          aria-label="Close"
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-20 bg-white/80 rounded-full p-1 hover:bg-gray-200 dark:bg-gray-900/80 dark:hover:bg-gray-700 cursor-pointer backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
        </button>
        {detailData && (
          <Card
            key={detailData.id}
            className="p-0 gap-0 w-full max-h-[90vh] flex flex-col shadow-2xl dark:shadow-black/50 rounded-2xl overflow-hidden"
          >
            <CardHeader className="p-0 relative flex-shrink-0">
              <Image
                src={detailData.images[0].href}
                alt={detailData.name}
                width={400}
                height={400}
                className="w-full h-56 object-contain dark:bg-gray-800"
              />
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-gray-100 dark:from-gray-800 to-transparent" />
            </CardHeader>
            <CardContent className="p-6 flex-1 overflow-y-auto bg-white dark:bg-gray-900">
              <CardTitle className="text-3xl font-bold tracking-tight">
                {detailData.name}
              </CardTitle>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                {detailData.levels?.map((level) => (
                  <div
                    key={level.id}
                    className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{level.level}</span>
                  </div>
                ))}
                {detailData.types?.map((type) => (
                  <div
                    key={type.id}
                    className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <Swords className="w-4 h-4 text-red-500" />
                    <span className="font-medium">{type.type}</span>
                  </div>
                ))}
                {detailData.attributes?.map((attr) => (
                  <div
                    key={attr.id}
                    className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <Shield className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{attr.attribute}</span>
                  </div>
                ))}
              </div>

              <CardDescription className="mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {detailData.descriptions[1].description}
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DigimonPage;
