import { useMemo } from "react";
import type { UsePaginationProps } from "@/interface";

export const dots = "...";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

export const usePagination = ({
  totalPage,
  currentPage,
  siblingCount,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const lastpageIndex = totalPage;
    const firstpageIndex = 1;
    //jumlah total page yang akan ditampilkan
    const totalPageNumbers = siblingCount + 5;

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    //menentukan tampilan elipsis di kiri atau kanan
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

    //jika jumlah total page lebih kecil dari total page yang akan ditampilkan
    if (totalPageNumbers >= totalPage) {
      return range(1, totalPage);
    }

    //hanya menampilkan elipsis di kanan
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, dots, totalPage];
    }

    //hanya menampilkan elipsis di kiri
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPage - rightItemCount + 1, totalPage);
      return [firstpageIndex, dots, ...rightRange];
    }

    //menampilkan elipsis di kiri dan kanan
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstpageIndex, dots, ...middleRange, dots, lastpageIndex];
    }
    return [];
  }, [totalPage, currentPage, siblingCount]);
  return paginationRange;
};
