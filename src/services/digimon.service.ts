import { DigimonResponse, paginationParams, DigimonDetail } from "@/interface";
import { AxiosResponse } from "axios";
import { api } from "@/config";

export const fetchDigimonList = async ({
  page = 1,
  pageSize = 15,
}: paginationParams = {}): Promise<DigimonResponse> => {
  const res: AxiosResponse<DigimonResponse> = await api.get("/digimon", {
    params: {
      page,
      pageSize,
    },
  });
  return res.data;
};

export const fetchDigimonDetail = async (
  id: number,
): Promise<DigimonDetail> => {
  const res: AxiosResponse<DigimonDetail> = await api.get(`/digimon/${id}`);
  return res.data;
};
