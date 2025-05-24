import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col rounded-lg bg-white p-4 m-4 h-80 w-64 flex-shrink-0 shadow-[8px_8px_18px_0px_rgba(251,191,36,0.5)] hover:shadow-[16px_16px_24px_0px_rgba(251,191,36,0.7)]">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-contain rounded-t-lg mb-2"
      />
      <h2 className="text-lg font-bold text-sky-950 line-clamp-2">
        {product.name}
      </h2>
      {/* <p>Description of the product.</p> */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-lime-600 font-bold">
            R$ {formatter.format(product.price)} á vista
          </p>
          <p className="text-sm text-gray-500">
            Em até 12x de R$ {formatter.format(product.price / 12)}
          </p>
        </div>
        <button>
          <ShoppingCart className="h-5 w-5 text-sky-950 hover:text-sky-400" />
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
