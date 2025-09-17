export interface paginationParams {
  page?: number;
  pageSize?: number;
}

export interface UsePaginationProps {
  totalPage: number;
  currentPage: number;
  siblingCount: number;
}
