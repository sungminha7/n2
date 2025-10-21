"use client";

import { postProduct } from "@/actions/productActions";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export default function ProductAddCP() {
  const [state, action, isPending] = useActionState(postProduct, {
    message: "",
    result: "",
  });

  const router = useRouter();

  return (
    <div>
      <div>Product Add components</div>
      {state.result === "success" && (
        <div
          onClick={(e) => {
            router.push(`/product/catalog/1`);
          }}
        >
          <div>New Product Added</div>
        </div>
      )}

      <form action={action}>
        <div>
          상품이름
          <input type="text" name="pname"></input>
        </div>
        <div>
          상품가격
          <input type="number" name="price"></input>
        </div>
        <div>
          상품이미지
          <input type="file" name="files" multiple></input>
        </div>
        <button>Add Product</button>
      </form>
    </div>
  );
}
