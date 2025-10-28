import ProductQueryListCP from "@/components/product/productQueryListCP";
import ProductSearchFormCP from "@/components/product/productSearchFormCP";

export default async function ProductQueryPage({ params, searchParams }) {
  const queryObj = await searchParams;

  const pageStr = queryObj.page ?? "1";
  const sizeStr = queryObj.size ?? "10";
  const sortStr = queryObj.sort ?? "";
  const keywordStr = queryObj.keyword ?? "";

  const condition = new URLSearchParams({ page: pageStr, size: sizeStr });
  if (sortStr) {
    condition.append("sort", sortStr);
  }
  if (keywordStr) {
    condition.append("keyword", keywordStr);
  }

  const res = await fetch(
    `http://localhost:8080/api/products/list?${condition.toString()}`,
    { method: "GET", cache: "no-store" }
  );

  const result = await res.json();

  console.log(result);

  return (
    <div className="space-y-6">
      <div className="text-center text-3xl font-bold text-gray-800 mb-8">
        상품 검색
      </div>
      <ProductSearchFormCP />
      <ProductQueryListCP
        list={result.list}
        total={result.total}
        requestParam={result.pageRequestDTO}
      />
    </div>
  );
}
