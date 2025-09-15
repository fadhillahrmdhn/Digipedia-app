"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchDigimonList, searchCharacter } from "@/services";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loading from "@/app/loading";
import { DigimonDetailView } from "./_components";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { usePagination, dots } from "@/hooks";
import { useSearchStore } from "@/store/searchStore";

const DigimonPage = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(20);
  const { search } = useSearchStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["digimonList", { page: page, pageSize: limit, search }],
    queryFn: () =>
      search
        ? searchCharacter(search)
        : fetchDigimonList({ page: page - 1, pageSize: limit }),
  });

  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const totalPage = data?.pageable.totalPages ?? 0;

  const paginationRange = usePagination({
    totalPage,
    currentPage: page,
    siblingCount: 1,
  });

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPage));
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

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
      <div className="m-4 mx-10 grid grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] gap-4">
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
      {search === "" && (
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className={
                page === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"
              }
            >
              <PaginationPrevious onClick={handlePreviousPage} />
            </PaginationItem>

            {paginationRange.map((pageNumber, i) => {
              if (pageNumber === dots) {
                return (
                  <PaginationItem key={"dots-" + i}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={pageNumber} className="cursor-pointer">
                  <PaginationLink
                    onClick={() => handlePageClick(pageNumber as number)}
                    isActive={page === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem
              className={
                page === totalPage
                  ? "pointer-events-none opacity-40"
                  : "cursor-pointer"
              }
            >
              <PaginationNext onClick={handleNextPage} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

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

export default DigimonPage;
