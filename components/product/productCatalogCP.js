import Image from "next/image";
import Link from "next/link";

export default function ProductCatalogCP({ products, total, current, size }) {
  if (!products || products.length === 0) {
    throw new Error("No Products in this page");
  }

  const lastPage = Math.ceil(total / size);
  const prev = current !== 1;
  const next = current < lastPage;

  const from = encodeURIComponent(`/product/catalog/${current}`);

  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600 mb-4">
        총 {total}개의 상품이 있습니다.
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.pno} className="group">
            <Link href={`/product/view/${product.pno}?from=${from}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative aspect-[4/3] w-full bg-gray-100">
                  <Image
                    src={`http://localhost:8080/s_${product.fileName}`}
                    alt={product.pname}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={true}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="text-xs text-gray-400 mb-2">
                    상품번호: {product.pno}
                  </div>
                  <div className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.pname}
                  </div>
                  <div className="text-xl font-bold text-indigo-600 mt-auto">
                    {product.price.toLocaleString()}원
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-8 mb-8">
        {prev && (
          <Link
            href={`/product/catalog/${current - 1}`}
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
        <div className="px-4 py-2 text-sm font-medium">
          {current} / {lastPage}
        </div>
        {next && (
          <Link
            href={`/product/catalog/${current + 1}`}
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
      </div>
    </div>
  );
}
