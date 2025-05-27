import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/productUtils";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useCartContext, type CartItem } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate: NavigateFunction = useNavigate();
  const [hover, setHover] = useState(false);
  const [isCartClicked, setIsCartClicked] = useState(false);
  const { addItem } = useCartContext();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const itemToAdd: CartItem = {
      id: product.id,
      quantity: 1,
    };

    addItem(itemToAdd, 1);

    setIsCartClicked(true);
    setTimeout(() => {
      setIsCartClicked(false);
    }, 200);

    console.log(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div
      onClick={() => {
        const param: URLSearchParams = new URLSearchParams();
        param.set("id", product.id);
        navigate(`/productdetail?${param.toString()}`);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`flex flex-col rounded-lg bg-white p-4 m-4 h-80 w-64 flex-shrink-0 cursor-pointer shadow-md transition-all duration-200 brightness-90
        ${hover ? "hover:shadow-xl hover:scale-105 hover:brightness-100" : ""}
      `} // Ajustei o brightness inicial para 90 para o hover ter mais impacto
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="h-40 w-full object-contain rounded-t-lg mb-2"
      />
      <h2 className="text-lg font-bold text-sky-950 line-clamp-2">
        {product.name}
      </h2>
      <div className="flex justify-between items-center mt-auto">
        {" "}
        <div>
          <p className="text-lime-600 font-bold text-left">
            {formatPrice(product.price)} à vista{" "}
          </p>
          <p className="text-sm text-gray-500 text-left">
            ou 12x de {formatPrice(product.price / 12)}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out transform
            ${
              hover
                ? "opacity-100 visible scale-100"
                : "opacity-0 invisible scale-90"
            }
            ${
              isCartClicked ? "scale-125" : hover ? "scale-100" : "scale-90"
            } // Efeito de clique
            hover:bg-gray-100`} // Hover do botão
          aria-label={`Adicionar ${product.name} ao carrinho`}
        >
          <ShoppingCart className="h-6 w-6 text-sky-950" />{" "}
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
