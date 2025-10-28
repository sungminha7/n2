"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ProductSearchFormCP() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = searchParams.get("page") ?? "1";
  const currentKeyword = searchParams.get("keyword") ?? "";
  const currentSize = searchParams.get("size") ?? "10";
  const currentSort = searchParams.get("sort") ?? "b";

  const [keyword, setKeyword] = useState(currentKeyword);
  const [sort, setSort] = useState(currentSort);
  const [size, setSize] = useState(currentSize);

  const handleClickSearchButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const queryObj = new URLSearchParams({ page: "1", size: size });
    if (keyword) {
      queryObj.append("keyword", keyword);
    }
    if (sort) {
      queryObj.append("sort", sort);
    }

    router.push(`/product/query?${queryObj.toString()}`);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <div>
          <select
            name="size"
            value={size}
            onChange={(e) => setSize(() => e.target.value)}
          >
            <option value="5">5개 보기</option>
            <option value="10">10개 보기</option>
            <option value="20">20개 보기</option>
            <option value="50">50개 보기</option>
          </select>
        </div>
        <div className="w-full sm:w-auto sm:max-w-[150px]">
          <select
            name="sort"
            value={sort}
            onChange={(e) => setSort(() => e.target.value)}
          >
            <option value="b">기본순</option>
            <option value="d">출시순</option>
            <option value="ph">높은 가격순</option>
            <option value="pl">낮은 가격순</option>
          </select>
        </div>
        <div className="flex w-full sm:w-auto sm:max-w-xs">
          <input
            type="text"
            name="keyword"
            placeholder="상품명 검색..."
            value={keyword}
            onChange={(e) => setKeyword(() => e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleClickSearchButton}>
          검색
        </button>
      </div>
    </div>
  );
}
