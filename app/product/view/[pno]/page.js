export default async function ProductViewPage({ params, searchParams }) {
  const param = await params;
  const pno = param.pno;

  console.log("Product View pno: ", pno);

  const res = await fetch(`http://localhost:8080/api/products/${pno}`, {
    next: { revalidate: 120 },
  });
  const product = await res.json();

  console.log("product: ", product);

  return (
    <div>
      <div>Product View Page</div>
    </div>
  );
}
