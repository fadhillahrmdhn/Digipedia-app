import { useMemo } from "react";
import type { UsePaginationProps } from "@/interface";

export const dots = "...";

const range = (start: number, end: number) => {
  //1,5
  const length = end - start + 1; //5
  return Array.from({ length }, (_, i) => i + start);
};

export const usePagination = ({
  totalPage,
  currentPage,
  siblingCount,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    //jumlah total page yang akan ditampilkan
    const totalPageNumbers = siblingCount + 5;

    // Kasus 1: Jika jumlah halaman lebih kecil dari angka yang ingin kita tampilkan,
    // kita kembalikan rentang [1..totalPage]
    if (totalPageNumbers >= totalPage) {
      return range(1, totalPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    //menentukan tampilan elipsis di kiri atau kanan
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPage;

    //hanya menampilkan elipsis di kanan
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, dots, lastPageIndex];
    }

    //hanya menampilkan elipsis di kiri
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPage - rightItemCount + 1, totalPage);
      return [firstPageIndex, dots, ...rightRange];
    }

    //menampilkan elipsis di kiri dan kanan
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }

    return [];
  }, [totalPage, currentPage, siblingCount]);
  return paginationRange;
};
