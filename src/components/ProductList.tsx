// import { Icon } from "lucide-react";
import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  title: string;
  products: Product[];
  icon: React.ReactElement;
}

function ProductList({ title, products, icon }: ProductListProps) {
  return (
    <>
      <div className="flex gap-2 items-center ml-4">
        {icon}
        <h1 className="text-3xl text-white text-left mb-0">{title}</h1>
      </div>
      <div className="flex flex-nowrap overflow-x-scroll scrollbar-hide w-full mb-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
