import Link from "next/link";

export default function ProductQueryPagingCP({ total, requestParam }) {
  const page = requestParam.page;
  const size = requestParam.size;
  const keyword = requestParam.keyword;
  const sort = requestParam.sort;

  const queryObj = new URLSearchParams();
  queryObj.set("size", size);

  if (keyword) {
    queryObj.set("keyword", keyword);
  }
  if (sort) {
    queryObj.set("sort", sort);
  }

  const lastPage = Math.ceil(total / size);
  const start = page - 2 <= 0 ? 1 : page - 2;
  const end = page + 2 > lastPage ? lastPage : page + 2;

  const prev = start > 1;
  const next = end * size < total;
  const pages = Array.from(
    { length: end - start + 1 },
    (_, index) => start + index
  );

  return (
    <div className="flex justify-center items-center mt-8 mb-8">
      <nav
        className="flex items-center justify-center space-x-2"
        aria-label="페이지네이션"
      >
        {/* 이전 버튼 */}
        {prev && (
          <Link
            href={`/product/query?page=${start - 1}&${queryObj.toString()}`}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-indigo-500 transition-all duration-200 flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            이전
          </Link>
        )}

        {/* 페이지 번호 생성 */}
        {pages.map((num) => (
          <Link
            key={num}
            href={`/product/query?page=${num}&${queryObj.toString()}`}
            className={`min-w-[40px] px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
              page === num
                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg hover:bg-indigo-700"
                : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-indigo-500 hover:text-indigo-600"
            }`}
          >
            {num}
          </Link>
        ))}

        {/* 다음 버튼 */}
        {next && (
          <Link
            href={`/product/query?page=${end + 1}&${queryObj.toString()}`}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-indigo-500 transition-all duration-200 flex items-center gap-1"
          >
            다음
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  );
}
