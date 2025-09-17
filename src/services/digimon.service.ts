import axios from "axios";

// Tipe data untuk daftar Digimon
export interface DigimonListItem {
  id: number;
  name: string;
  href: string;
}

// Tipe data untuk detail satu Digimon
export interface DigimonDetail {
  id: number;
  name: string;
  images: { href: string }[];
  levels: { level: string }[];
  abilities: { id: string; skill: string }[];
  attributes: { id: string; attribute: string }[];
  fields: { id: string; field: string }[];
  types: { id: string; type: string }[];
  releaseDate: string;
}

// Fungsi untuk mengambil DAFTAR Digimon
export const getAllDigimon = async (): Promise<DigimonListItem[]> => {
  try {
    const response = await axios.get(
      "https://digi-api.com/api/v1/digimon?pageSize=4",
    ); // Ambil 1 saja untuk homepage
    return response.data.content;
  } catch (error) {
    console.error("Gagal mengambil daftar Digimon:", error);
    throw new Error("Gagal mengambil daftar Digimon.");
  }
};

// FUNGSI BARU untuk mengambil DETAIL satu Digimon berdasarkan URL
export const getDigimonDetail = async (url: string): Promise<DigimonDetail> => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Gagal mengambil detail untuk ${url}:`, error);
    throw new Error("Gagal mengambil detail Digimon.");
  }
};
