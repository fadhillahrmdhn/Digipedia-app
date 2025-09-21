export interface Digimon {
  id: number;
  name: string;
  level: string;
  types: string[];
  img: string;
}
export interface DigimonResponse {
  Digimon: Digimon[];
}
