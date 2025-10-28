import Link from "next/link";

export default function ProductLayout({ children }) {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-768 mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold">
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                상품몰
              </Link>
            </div>
            <nav className="flex items-center gap-4">
              <Link
                href="/product"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                상품 카탈로그
              </Link>
              <Link
                href="/product/query"
                className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
              >
                상품 검색
              </Link>
              <Link
                href="login"
                className="text-white bg-indigo-600 rounded-lg px-4 py-2 hover:bg-indigo-700 font-medium transition-colors duration-200"
              >
                로그인
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="max-w-768 mx-auto px-4 sm:px-6 py-8">{children}</main>
    </>
  );
}
