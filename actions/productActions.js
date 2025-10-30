"use server";

import { revalidatePath } from "next/cache";

const API_SERVER_HOST = process.env.API_SERVER_HOST || "http://localhost:8080";

export const postProduct = async (prevState, formData) => {
  console.log("postProduct called with formData: ", prevState);

  const pname = formData.get("pname");
  const price = formData.get("price");
  const writer = formData.get("writer");
  const files = formData.getAll("files");

  const updatedFormData = new FormData();
  updatedFormData.append("pname", pname);
  updatedFormData.append("price", price);
  updatedFormData.append("writer", writer);
  updatedFormData.append("sale", true);

  console.log("files.length: ", files.length);
  if (files.length > 0) {
    files.forEach((file) => {
      if (file && file.size > 0) {
        console.log("file size: ", file.size);
        updatedFormData.append("files", file);
      }
    });
  }

  const response = await fetch(`${API_SERVER_HOST}/api/products`, {
    method: "POST",
    body: updatedFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to post product");
  }

  revalidatePath("/products/catalog/1");

  return { message: "Product created successfully", result: "success" };
};

export const putProduct = async (prevState, formData) => {
  console.log("putProduct called");

  const pno = formData.get("pno");

  const updatedFormData = new FormData();
  updatedFormData.append("pname", formData.get("pname"));
  updatedFormData.append("price", formData.get("price"));
  updatedFormData.append("writer", formData.get("writer"));
  updatedFormData.append("sale", formData.get("sale"));

  const fileNames = formData.getAll("fileNames");
  console.log("fileNames.length: ", fileNames.length);

  // Append all existing file names to the new FormData object
  if (fileNames.length > 0) {
    fileNames.forEach((fileName) => {
      updatedFormData.append("fileNames", fileName);
    });
  }

  // Append new uploaded files
  const files = formData.getAll("files");
  console.log("files.length: ", files.length);
  if (files.length > 0) {
    files.forEach((file) => {
      if (file && file.size > 0) {
        console.log("file size: ", file.size);
        updatedFormData.append("files", file);
      }
    });
  }

  // Make the fetch request
  const response = await fetch(`${API_SERVER_HOST}/api/products/${pno}`, {
    method: "PUT",
    body: updatedFormData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to update product: ", errorText);
    return { message: "Failed to update product", result: "fail" };
  }

  revalidatePath(`/products/view/${pno}`);

  return { message: "Product updated successfully", result: "success" };
};

export const deleteProduct = async (prevState, formData) => {
  const pno = formData.get("pno");

  console.log("deleteProduct called with pno: ", pno);

  const response = await fetch(`${API_SERVER_HOST}/api/products/${pno}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  revalidatePath(`/products/view/${pno}`);

  return { message: "Product deleted successfully", result: "success" };
};
