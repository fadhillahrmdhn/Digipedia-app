"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDigimonDetail } from "@/services";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Loading from "./loading";
import { X } from "lucide-react";

export const DigimonDetailView = ({
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

  if (isLoading) return <Loading />;
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
          className="absolute top-2 right-2 z-20 bg-black/30 rounded-full p-1 hover:bg-black/50 cursor-pointer backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        {detailData && (
          <Card
            key={detailData.id}
            className="p-0 gap-0 w-full max-h-[90vh] flex flex-col shadow-2xl dark:shadow-black/50 rounded-2xl overflow-hidden border-blue-400"
          >
            <CardHeader className="p-0 relative flex-shrink-0">
              <Image
                src={detailData.images[0].href}
                alt={detailData.name}
                width={400}
                height={400}
                className="w-full h-56 object-contain bg-white/10"
              />
              <div className="absolute bottom-0 w-full h-20 bg-gradient-to-t from-[#1142B6] to-transparent" />
            </CardHeader>
            <CardContent className="p-6 flex-1 overflow-y-auto bg-[#1142B6] scrollbar-custom">
              <CardTitle className="text-3xl font-bold tracking-tight text-center text-white [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
                {detailData.name}
              </CardTitle>
              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-3 ">
                {/* Level */}
                <div className="inline-flex items-center text-sm text-white rounded-md overflow-hidden shadow bg-amber-400">
                  <span className="bg-amber-600 font-semibold px-2 py-1 h-full justify-center text-center">
                    Level
                  </span>
                  <span className="text-white font-medium px-2 [text-shadow:1px_1px_2px_rgba(0,0,0,0.7)]">
                    {detailData.levels
                      ?.map((level) => level.level)
                      .join(", ") || "N/A"}
                  </span>
                </div>

                {/* Attribute */}
                <div className="inline-flex items-center text-sm text-white rounded-md overflow-hidden shadow bg-red-400">
                  <span className="bg-red-600 font-semibold px-2 py-1 h-full justify-center text-center">
                    Attribute
                  </span>
                  <span className="text-white font-medium px-2 [text-shadow:1px_1px_2px_rgba(0,0,0,0.7)]">
                    {detailData.attributes
                      ?.map((attr) => attr.attribute)
                      .join(", ") || "N/A"}
                  </span>
                </div>

                {/* Type */}
                <div className="inline-flex items-center text-sm text-white rounded-md overflow-hidden shadow bg-purple-400">
                  <span className="bg-purple-600 font-semibold px-2 py-1 h-full justify-center text-center">
                    Type
                  </span>
                  <span className="text-white font-medium px-2 [text-shadow:1px_1px_2px_rgba(0,0,0,0.7)]">
                    {detailData.types?.map((type) => type.type).join(", ") ||
                      "N/A"}
                  </span>
                </div>

                {/* release date */}
                <div className="inline-flex items-center text-sm text-white rounded-md overflow-hidden shadow bg-green-400">
                  <span className="bg-green-600 font-semibold px-3 py-1 h-full justify-center text-center">
                    Release
                  </span>
                  <span className="text-white font-medium px-2 [text-shadow:1px_1px_2px_rgba(0,0,0,0.7)]">
                    {detailData.releaseDate || "N/A"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <CardDescription className="mt-4 text-base leading-relaxed text-gray-200 text-justify gap-2 line-clamp-3 flex flex-col">
                <span className="font-bold">Description:</span>
                {detailData.descriptions[1]?.description ||
                  "No description available."}
              </CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
