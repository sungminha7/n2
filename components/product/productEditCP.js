"use client";

import { deleteProduct, putProduct } from "@/actions/productActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

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

  const [oldFiles, setOldFiles] = useState(fileNames);

  const handleImageDelete = (targetFileName) => {
    console.log("handleImageDelete");
    const result = oldFiles.filter((fname) => targetFileName !== fname);
    setOldFiles(() => result);
  };

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
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center text-3xl font-bold text-gray-800 mb-8">
        상품 수정
      </div>

      {/* 성공/에러 메시지 */}
      {putState.result === "fail" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2 text-red-700 font-semibold">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {putState.message || "수정에 실패했습니다."}
          </div>
        </div>
      )}

      {/* 수정 폼 */}
      <form action={putAction} className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
          {/* 상품번호 (읽기 전용) */}
          <div>
            <label
              htmlFor="pno"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              상품번호
            </label>
            <input
              type="text"
              name="pno"
              id="pno"
              defaultValue={pno}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* 상품이름 */}
          <div>
            <label
              htmlFor="pname"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              상품이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pname"
              id="pname"
              required
              defaultValue={pname}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="상품명을 입력하세요"
            />
          </div>

          {/* 상품가격 */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              상품가격 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              id="price"
              required
              min="0"
              defaultValue={price}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="가격을 입력하세요"
            />
          </div>

          {/* 작성자 */}
          <div>
            <label
              htmlFor="writer"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              작성자
            </label>
            <input
              type="text"
              name="writer"
              id="writer"
              defaultValue={writer}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="작성자명을 입력하세요"
            />
          </div>

          {/* 판매 상태 */}
          <div>
            <label
              htmlFor="sale"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              판매 상태
            </label>
            <select
              name="sale"
              id="sale"
              defaultValue={sale ? "true" : "false"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="true">판매</option>
              <option value="false">판매중지</option>
            </select>
          </div>

          {/* 기존 이미지 */}
          {oldFiles && oldFiles.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                기존 이미지 (삭제할 이미지 클릭)
              </label>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {oldFiles.map((fileName) => (
                  <li key={fileName} className="relative group">
                    <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={`http://localhost:8080/${fileName}`}
                        alt={product.pname}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200" />
                      <button
                        type="button"
                        className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100 shadow-lg"
                        onClick={(e) => handleImageDelete(fileName)}
                        title="이미지 삭제"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <input type="hidden" name="fileNames" value={fileName} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 새 이미지 업로드 */}
          <div>
            <label
              htmlFor="files"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              새 이미지 추가
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="files"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4  교-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">클릭하여 파일 선택</span>{" "}
                    또는 드래그하여 업로드
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF (최대 10MB)
                  </p>
                </div>
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={putPending}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {putPending ? "수정 중..." : "수정 완료"}
            </button>
            <button
              type="button"
              onClick={() => router.push(from || `/product/view/${pno}`)}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              취소
            </button>
          </div>
        </div>
      </form>

      {/* 삭제 폼 */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-red-800 mb-2">위험 구역</h3>
          <p className="text-sm text-red-600">
            상품을 삭제하면 복구할 수 없습니다.
          </p>
        </div>
        <form action={deleteAction}>
          <input type="hidden" name="pno" value={pno} />
          <button
            type="submit"
            disabled={deletePending}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {deletePending ? "삭제 중..." : "상품 삭제"}
          </button>
        </form>
      </div>
    </div>
  );
}
