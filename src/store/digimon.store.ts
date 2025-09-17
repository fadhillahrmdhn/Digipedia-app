import { create } from "zustand";

// Definisikan tipe untuk state dan actions-nya
interface DigimonState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

// Buat store untuk menyimpan keyword pencarian
export const useDigimonStore = create<DigimonState>((set) => ({
  searchTerm: "", // Nilai awal untuk input pencarian
  setSearchTerm: (term) => set({ searchTerm: term }), // Fungsi untuk memperbarui searchTerm
}));
