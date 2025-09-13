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
