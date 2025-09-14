import { DigimonResponse, paginationParams, DigimonDetail } from "@/interface";
import { AxiosResponse } from "axios";
import { api } from "@/config";

export const fetchDigimonList = async ({
  page = 0,
  pageSize = 20,
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
  id: string,
): Promise<DigimonDetail> => {
  const res: AxiosResponse<DigimonDetail> = await api.get(`/digimon/${id}`);
  return res.data;
};
