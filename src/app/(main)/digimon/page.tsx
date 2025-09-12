"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchDigimonList } from "@/services";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DigimonPage = () => {
  const { data } = useQuery({
    queryKey: ["digimonList", { page: 1, pageSize: 15 }],
    queryFn: () => fetchDigimonList({ page: 2, pageSize: 15 }),
  });

  console.log(data);

  return (
    <div className="w-full">
      <div className="m-4 grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
        {data?.content && data.content.length > 0 ? (
          data.content.map((character) => (
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
                <CardTitle>{character.name}</CardTitle>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl text-muted-foreground">
            No characters found.
          </div>
        )}
      </div>
    </div>
  );
};

export default DigimonPage;
