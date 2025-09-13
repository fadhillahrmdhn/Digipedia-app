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
import Loading from "@/app/loading";
import { X } from "lucide-react";

const DigimonPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["digimonList", { page: 1, pageSize: 15 }],
    queryFn: () => fetchDigimonList({ page: 2, pageSize: 15 }),
  });

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  if (isLoading)
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl text-muted-foreground">
        <Loading />
      </div>
    );
  if (error)
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl text-red-500">
        Error fetching data.
      </div>
    );

  return (
    <div className="w-full">
      <div className="m-4 grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
        {data?.content && data.content.length > 0 ? (
          data.content.map((character) => (
            <button
              key={character.id}
              type="button"
              className="cursor-pointer rounded-lg text-left transition-transform duration-300 ease-in-out hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
              <CardTitle className="text-3xl font-bold tracking-tight text-center">
                {detailData.name}
              </CardTitle>
              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3 ">
                {/* Level */}
                <div className="inline-flex items-center text-sm text-white rounded-md overflow-hidden shadow bg-amber-400">
                  <span className="bg-amber-600 font-semibold px-2 py-1 h-full justify-center text-center">
                    Level
                  </span>
                  <span className=" text-gray-900 font-medium px-2">
                    {detailData.levels?.map((level) => level.level).join(", ")}
                  </span>
                </div>

                {/* Attribute */}
                <div className="inline-flex items-center text-sm text-white rounded-md overflow-hidden shadow bg-red-400">
                  <span className="bg-red-600 font-semibold px-2 py-1 h-full justify-center text-center">
                    Attribute
                  </span>
                  <span className=" text-gray-900 font-medium px-2">
                    {detailData.attributes
                      ?.map((attr) => attr.attribute)
                      .join(", ")}
                  </span>
                </div>

                {/* Type */}
                <div className="inline-flex items-center text-sm text-white rounded-md overflow-hidden shadow bg-blue-400">
                  <span className="bg-blue-600 font-semibold px-2 py-1 h-full justify-center text-center">
                    Type
                  </span>
                  <span className=" text-gray-900 font-medium px-2">
                    {detailData.types?.map((type) => type.type).join(", ")}
                  </span>
                </div>
              </div>

              {/* Description */}
              <CardDescription className="mt-4 text-base leading-relaxed text-gray-800 dark:text-gray-300 text-justify gap-2 line-clamp-3 flex flex-col">
                <span className="font-bold">Description:</span>
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
