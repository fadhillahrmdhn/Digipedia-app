import { create } from "zustand";
import { SearchState } from "@/interface";

export const useSearchStore = create<SearchState>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));
