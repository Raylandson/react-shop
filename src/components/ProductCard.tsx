import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/productUtils";
import { useNavigate, type NavigateFunction } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate: NavigateFunction = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div
      onClick={() => {
        const param: URLSearchParams = new URLSearchParams();
        param.set("id", product.id);
        navigate(`/productdetail?${param.toString()}`);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex flex-col rounded-lg bg-white p-4 m-4 h-80 w-64 flex-shrink-0"
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-contain rounded-t-lg mb-2"
      />
      <h2 className="text-lg font-bold text-sky-950 line-clamp-2">
        {product.name}
      </h2>
      <div className="flex justify-between itens-center mt-auto">
        <div>
          <p className="text-lime-600 font-bold text-left">
            R$ {formatPrice(product.price)} á vista
          </p>
          <p className="text-sm text-gray-500 text-left">
            Em até 12x de R$ {formatPrice(product.price / 12)}
          </p>
        </div>
        {hover && (
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              alert("!");
            }}
          >
            <ShoppingCart className="h-5 w-5 text-sky-950 hover:text-sky-400" />
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
