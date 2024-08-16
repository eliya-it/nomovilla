import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface UsePaginationProps<T> {
  data: T[];
}

interface UsePaginationResult<T> {
  meals: T[];
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  curPage: number;
}

const usePagination = <T,>({
  data = [],
}: UsePaginationProps<T>): UsePaginationResult<T> => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [curPage, setCurPage] = useState<number>(
    parseInt(params.get("page") || "1", 10)
  );
  const limit = 9;
  const totalPages = Math.ceil(data.length / limit);

  const start = (curPage - 1) * limit; // Start from 0
  const end = start + limit; // 1 + 8 = 9, which is the data

  const nextPage = () => {
    if (curPage < totalPages) {
      setParams((prev) => {
        const nextPage = (parseInt(prev.get("page") || "1", 10) + 1) * 1;
        return { page: nextPage.toString() };
      });
    }
  };

  const prevPage = () => {
    if (curPage > 1) {
      setParams((prev) => {
        const prevPage = (parseInt(prev.get("page") || "1", 10) - 1) * 1;
        return { page: prevPage.toString() };
      });
    }
  };
  useEffect(() => {
    if (!params.has("page")) {
      setParams({ page: "1" });
    }
  }, [params, setParams]);

  return {
    meals: data.slice(start, end),
    totalPages,
    nextPage,
    prevPage,
    curPage,
  };
};

export default usePagination;
