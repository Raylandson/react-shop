import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartContext } from "../contexts/CartContext";

export function TopBar() {
  const { getItemCount } = useCartContext();

  const itemCountInCart = getItemCount();

  return (
    <nav className="bg-fundo-principal text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 ml-4.5">
            <Link
              to="/"
              className="text-2xl font-bold text-amber-600 hover:text-white transition-colors duration-200"
            >
              React Store
            </Link>
          </div>
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
            aria-label="Carrinho"
          >
            <ShoppingCart size={22} />
            {itemCountInCart > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {itemCountInCart}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
