export interface DigimonResponse {
  content: Digimon[];
  pageable: Pageable;
}

export interface Digimon {
  id: string;
  name: string;
  href: string;
  image: string;
}

export interface Pageable {
  currentPage: number;
  elementsOnPage: number;
  totalElements: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}
