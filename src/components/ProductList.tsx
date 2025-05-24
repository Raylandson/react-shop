import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  title: string;
  products: Product[];
}

function ProductList({ title, products }: ProductListProps) {
  return (
    <>
      <h1 className="text-4xl text-white font-bold">{title}</h1>
      <div className="flex flex-nowrap overflow-x-scroll scrollbar-hide w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
