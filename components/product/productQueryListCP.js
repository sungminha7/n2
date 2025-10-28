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
    <div>
      <div>Product Query List Component</div>
      <div>
        <ul>
          {list.map((product) => (
            <li key={product.pno}>
              <Link href={`/product/view/${product.pno}?from=${from}`}>
                <div>{product.pno}</div>
                <div>
                  {product.pname} =. {product.price}
                </div>
                <div className="relative aspect-[4/3] max-w-[300px]">
                  <Image
                    src={`http://localhost:8080/s_${product.fileName}`}
                    alt={product.pname}
                    fill
                    style={{ objetFit: "cover" }}
                  />
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
