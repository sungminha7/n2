import Image from "next/image";

export default function ProductViewCP({ product }) {
  console.log("product: ", product);

  return (
    <div>
      <div>Product View Page</div>
      <div>{product.pno}</div>
      <div>{product.pname}</div>
      <div>{product.price}</div>
      <div>{product.writer}</div>
      <div>{product.createDate}</div>

      {product.fileNames.map((filename) => (
        <div className="relative w-1/3 h-80" key={filename}>
          <Image
            src={`http://localhost:8080/${filename}`}
            alter={product.pname}
            fillstyle={{ objectFit: "cover" }}
            sizes="33vw"
            priority={true}
            width={100}
            height={50}
          />
        </div>
      ))}
    </div>
  );
}
