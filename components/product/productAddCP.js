"use client";

import { postProduct } from "@/actions/productActions";
import { useActionState } from "react";

export default function ProductAddCP() {
  const [state, action, isPending] = useActionState(postProduct, {
    message: "",
    result: "",
  });

  return (
    <div>
      <div>Product Add components</div>
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
