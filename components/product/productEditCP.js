"use client";

import { deleteProduct, putProduct } from "@/actions/productActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function ProductEditCP({ product, from }) {
  const [putState, putAction, putPending] = useActionState(putProduct, {
    message: "",
    result: "",
  });
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteProduct,
    { message: "", result: "" }
  );

  const { pno, pname, price, fileNames, writer, sale } = product;

  const router = useRouter();

  useEffect(() => {
    if (putState.result === "success") {
      router.push(`/product/view/${pno}`);
      return;
    }

    if (deleteState.result === "success") {
      router.push(`/product/query`);
    }
  }, [putPending, deletePending, putState, deleteState]);

  return (
    <div>
      <div>Product Edit Component</div>

      <form action={putAction}>
        <div>
          PNO: <input type="text" name="pno" defaultValue={pno} />
        </div>
        <div>
          PNAME: <input type="text" name="pname" defaultValue={pname} />
        </div>
        <div>
          PRICE: <input type="number" name="price" defaultValue={price} />
        </div>
        <div>
          WRITER: <input type="text" name="writer" defaultValue={writer} />
        </div>
        <div>
          Files: <input type="file" name="files" multiple />
        </div>
        <div>
          SALE
          <select defaultValue={sale ? "true" : "false"}>
            <option value="true">판매</option>
            <option value="false">판매중지</option>
          </select>
        </div>
        <div>
          <ul className="flex flex-wrap">
            {fileNames.map((fileName) => (
              <li key={fileName} className="relative w-48 h-48 mr-4 mb-4">
                <Image
                  src={`http://localhost:8080/${fileName}`}
                  alt={product.pname}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
                <button
                  type="button"
                  className="absolute top-0 right-0 -mt-2 -mr-2 z-10 w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button type="submit">수정</button>
        </div>
      </form>

      <form action={deleteAction}>
        <input type="hidden" name="pno" value={pno} />
        <button type="submitj">삭제</button>
      </form>
    </div>
  );
}
