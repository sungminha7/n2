export default function ProductCatalogCP({ products, total, current, size }) {
  if (!products || products.length === 0) {
    throw new Error("No Products in this page");
  }

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.pno} className="m-2 p-1 border">
            <div>PNO: {product.pno}</div>
            <div>NAME: {product.name}</div>
            <div>PRICE: {product.price}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
