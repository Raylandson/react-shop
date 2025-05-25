import React, { useState } from "react"; // Adicionado React para React.MouseEvent
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/Product"; // Seu tipo Product
import { formatPrice } from "../utils/productUtils";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useCartContext, type CartItem } from "../contexts/CartContext"; // 1. Importe o hook do contexto

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate: NavigateFunction = useNavigate();
  const [hover, setHover] = useState(false);
  const { addItem } = useCartContext(); // 2. Obtenha a função addItem do contexto

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Mantém o stopPropagation para não disparar o onClick do card pai

    // Prepara o item para ser adicionado ao carrinho.
    // A função addItem espera um objeto com id, name, price (e outras props de CartItem, exceto quantity).
    // Se sua interface CartItem tiver mais campos (ex: imageUrl), adicione-os aqui também.
    const itemToAdd: CartItem = {
      id: product.id,
      quantity: 1,
      // Se você quiser que CartItem também tenha imageUrl, e sua interface CartItem e addItem suportem:
      // imageUrl: product.imageUrl,
    };

    addItem(itemToAdd, 1); // Adiciona 1 unidade do produto.
    // O segundo argumento (quantidade) é opcional se o padrão no addItem já for 1.

    // Feedback opcional para o usuário
    console.log(`${product.name} adicionado ao carrinho!`);
    // Você pode adicionar um toast/notificação aqui para melhor UX
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
      className="flex flex-col rounded-lg bg-white p-4 m-4 h-80 w-64 flex-shrink-0 cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-200" // Adicionado cursor e transição de sombra
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
        {/* Corrigido para items-center */}
        <div>
          <p className="text-lime-600 font-bold text-left">
            R$ {formatPrice(product.price)} à vista{" "}
            {/* Corrigido para à vista */}
          </p>
          <p className="text-sm text-gray-500 text-left">
            ou 12x de R$ {formatPrice(product.price / 12)}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className={`p-2 rounded-full transition-all duration-200 ease-in-out ${
            // Transições gerais
            hover
              ? "opacity-100 visible hover:bg-gray-100" // Estilos quando visível e interativo
              : "opacity-0 invisible" // Estilos quando "escondido" mas ocupando espaço
          }`}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          // disabled={!hover} // Descomente se quiser desabilitar o botão quando não estiver visível para acessibilidade/foco via teclado.
          // O 'invisible' já deve impedir interações por clique.
        >
          <ShoppingCart className="h-6 w-6 text-sky-950 hover:text-sky-400" />{" "}
          {/* Ícone com seu próprio hover para cor */}
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
