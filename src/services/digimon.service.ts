import axios from "axios";
import { Digimon } from "@/types/digimon.type";

// Definisikan tipe data untuk response API yang baru
interface DigimonApiResponse {
  content: Digimon[];
  pageable: object;
}

const apiClient = axios.create({
  baseURL: "https://digi-api.com/api/v1",
});

export const getAllDigimon = async (): Promise<Digimon[]> => {
  try {
    const response = await apiClient.get<DigimonApiResponse>("/digimon");
    return response.data.content; // Ambil array dari properti 'content'
  } catch (error) {
    console.error("Gagal mengambil data Digimon:", error);
    throw new Error("Gagal mengambil data Digimon.");
  }
};
