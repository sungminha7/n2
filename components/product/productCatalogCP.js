import Image from "next/image";
import Link from "next/link";

export default function ProductCatalogCP({ products, total, current, size }) {
  if (!products || products.length === 0) {
    throw new Error("No Products in this page");
  }

  const lastPage = Math.ceil(total / size);
  const prev = current !== 1;
  const next = current < lastPage;

  return (
    <div>
      <ul>
        {products.map((product) => (
          <Link href={`/product/view/${product.pno}`} key={product.pno}>
            <li key={product.pno} className="m-2 p-1 border">
              <div>PNO: {product.pno}</div>
              <div>NAME: {product.name}</div>
              <div>PRICE: {product.price}</div>
              <div className="relative w-1/3 h-40">
                <Image
                  src={`http://localhost:8080/s_${product.fileName}`}
                  width={100}
                  height={50}
                  alt={product.name}
                  fillstyle={{ bojectFit: "cover" }}
                  sizes="33vw"
                  priority={true}
                />
              </div>
            </li>
          </Link>
        ))}
      </ul>

      {prev && <Link href={`/product/catalog/${current - 1}`}>Prev</Link>}
      {next && <Link href={`/product/catalog/${current + 1}`}>Next</Link>}
    </div>
  );
}
