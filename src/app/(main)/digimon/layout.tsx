"use client";
import { useSearchStore } from "@/store/searchStore";
import { SearchBar } from "./_components";
export default function DigimonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { search, setSearch } = useSearchStore();
  return (
    <div className="m-5">
      <SearchBar search={search} setSearch={setSearch} />
      {children}
    </div>
  );
}
