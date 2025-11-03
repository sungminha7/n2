"use client";

import { postProduct } from "@/actions/productActions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function ProductAddCP() {
  const [state, action, isPending] = useActionState(postProduct, {
    message: "",
    result: "",
  });

  const { data: session, status: sessionStatus } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      alert("로그인 하세요");
    }
  }, [sessionStatus]);

  console.log("productAddCP session: ", sessionStatus);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center text-3xl font-bold text-gray-800 mb-8">
        새 상품 등록
      </div>

      {/* 성공 메시지 */}
      {state.result === "success" && (
        <div
          className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
          onClick={(e) => {
            router.push(`/product/catalog/1`);
          }}
        >
          <div className="flex items-center gap-2 text-green-700 font-semibold">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            상품이 성공적으로 등록되었습니다! 클릭하여 목록으로 이동
          </div>
        </div>
      )}

      {/* 폼 */}
      <form action={action} className="bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="작성자명을 입력하세요"
              defaultValue={session?.user?.email}
            />
          </div>

          {/* 상품이미지 */}
          <div>
            <label
              htmlFor="files"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              상품이미지
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
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

          {/* 제출 버튼 */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending ? "등록 중..." : "상품 등록"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/product/catalog/1")}
              className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
            >
              취소
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
