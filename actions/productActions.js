"use server";

import { revalidatePath } from "next/cache";

const API_SERVER_HOST = process.env.API_SERVER_HOST || "http://localhost:8080";

export const postProduct = async (prevState, formData) => {
  console.log("postProduct called with formData: ", prevState);

  const pname = formData.get("pname");
  const price = formData.get("price");
  const writer = formData.get("writer");
  const files = formData.getAll("files");

  const updateFormData = new FormData();
  updateFormData.append("pname", pname);
  updateFormData.append("price", price);
  updateFormData.append("writer", writer);
  updateFormData.append("sale", true);

  console.log("files.length: ", files.length);
  if (files.length > 0) {
    files.forEach((file) => {
      if (file && file.size > 0) {
        console.log("file size: ", file.size);
        updateFormData.append("files", file);
      }
    });
  }

  const response = await fetch(`${API_SERVER_HOST}/api/products`, {
    method: "POST",
    body: updateFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to post product");
  }

  revalidatePath("/product/catalog/1");

  return { message: "Product created successfully", result: "success" };
};
