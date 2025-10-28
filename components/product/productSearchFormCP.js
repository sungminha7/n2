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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full">
        <select
          name="size"
          value={size}
          onChange={(e) => setSize(() => e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="5">5개 보기</option>
          <option value="10">10개 보기</option>
          <option value="20">20개 보기</option>
          <option value="50">50개 보기</option>
        </select>
        <select
          name="sort"
          value={sort}
          onChange={(e) => setSort(() => e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="b">기본순</option>
          <option value="d">출시순</option>
          <option value="ph">높은 가격순</option>
          <option value="pl">낮은 가격순</option>
        </select>
        <input
          type="text"
          name="keyword"
          placeholder="상품명 검색..."
          value={keyword}
          onChange={(e) => setKeyword(() => e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          onClick={handleClickSearchButton}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
        >
          검색
        </button>
      </div>
    </div>
  );
}
