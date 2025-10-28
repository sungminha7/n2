import Image from "next/image";
import Link from "next/link";
import ProductQueryPagingCP from "./productQueryPagingCP";

export default function ProductQueryListCP({ list, total, requestParam }) {
  const page = requestParam.page;
  const size = requestParam.size;
  const keyword = requestParam.keyword;
  const sort = requestParam.sort;

  console.log("product list : ", list, sort, keyword);

  const queryObj = new URLSearchParams();
  queryObj.set("page", page);
  queryObj.set("size", size);
  if (keyword) {
    queryObj.set("keyword", keyword);
  }
  if (sort) {
    queryObj.set("sort", sort);
  }

  const from = encodeURIComponent(`/product/query?${queryObj.toString()}`);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        총 {total}개의 상품이 검색되었습니다.
      </div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((product) => (
            <li key={product.pno} className="group">
              <Link href={`/product/view/${product.pno}?from=${from}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative aspect-[4/3] w-full bg-gray-100">
                    <Image
                      src={`http://localhost:8080/s_${product.fileName}`}
                      alt={product.pname}
                      fill
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
      </div>
      <ProductQueryPagingCP total={total} requestParam={requestParam} />
    </div>
  );
}
