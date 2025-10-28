import Image from "next/image";
import Link from "next/link";

export default function ProductViewCP({ product, from }) {
  console.log("product: ", product);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 제목 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        상품 상세
      </h1>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* 왼쪽: 이미지 슬라이더 */}
          <div className="space-y-4">
            {product.fileNames && product.fileNames.length > 0 ? (
              <>
                {/* 메인 이미지 */}
                <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={`http://localhost:8080/${product.fileNames[0]}`}
                    alt={product.pname}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={true}
                    className="object-cover"
                  />
                </div>
                {/* 썸네일 이미지들 */}
                {product.fileNames.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.fileNames.slice(0, 4).map((filename) => (
                      <div
                        key={filename}
                        className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                      >
                        <Image
                          src={`http://localhost:8080/${filename}`}
                          alt={`${product.pname} - ${filename}`}
                          fill
                          sizes="(max-width: 768px) 25vw, 12.5vw"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="relative aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400">이미지 없음</p>
              </div>
            )}
          </div>

          {/* 오른쪽: 상품 정보 */}
          <div className="flex flex-col">
            <div className="mb-4">
              <span className="text-xs text-gray-400">상품번호</span>
              <p className="text-sm text-gray-600">#{product.pno}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {product.pname}
              </h2>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold text-indigo-600">
                {product.price?.toLocaleString()}원
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6 space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-600 block mb-1">
                  작성자
                </span>
                <span className="text-gray-800">{product.writer}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-600 block mb-1">
                  등록일
                </span>
                <span className="text-gray-800">
                  {product.createDate
                    ? new Date(product.createDate).toLocaleDateString("ko-KR")
                    : "-"}
                </span>
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="mt-auto pt-6">
              <Link href={from || "/product/catalog/1"}>
                <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2">
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
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  이전 화면
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
