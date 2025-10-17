import Link from "next/link";

export default async function ProductListPage() {
  return (
    <div>
      <div>Product List Page</div>
      <ul>
        <li>
          <Link href="/product/view/1">Product 1</Link>
        </li>
        <li>
          <Link href="/product/view/2">Product 2</Link>
        </li>
      </ul>
    </div>
  );
}
