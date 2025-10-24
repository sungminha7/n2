import ProductViewCP from "@/components/product/productView.CP";

export default async function ProductViewPage({ params, searchParams }) {
  const param = await params;
  const query = await searchParams;

  const pno = param.pno;

  console.log("Product View pno: ", pno);

  const res = await fetch(`http://localhost:8080/api/products/${pno}`, {
    next: { revalidate: 120 },
  });
  const product = await res.json();

  console.log("product: ", product);

  const from = query.from
    ? decodeURIComponent(query.from)
    : "/product/catalog/1";

  return (
    <div>
      <div>Product View Page</div>
      <ProductViewCP product={product} from={from} />
    </div>
  );
}
