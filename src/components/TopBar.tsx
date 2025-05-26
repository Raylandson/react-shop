import { ShoppingCart, User, Search, Menu } from "lucide-react";
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

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="Buscar..."
                className="bg-fundo-card text-texto-principal-escuro placeholder-gray-500 text-sm rounded-full py-2 pl-10 pr-3 focus:ring-acento-ciano focus:border-acento-ciano focus:outline-none transition-all duration-200 w-40 focus:w-64"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="Ação de Teste no Perfil"
            >
              <User size={22} />
            </button>
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

          <div className="md:hidden flex items-center">
            <Link
              to="/cart"
              className="relative p-1 mr-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
              aria-label="Carrinho"
            >
              <ShoppingCart size={22} />
              {itemCountInCart > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-300 text-cyan-700 text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemCountInCart}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="p-1 rounded-md hover:text-acento-ciano hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Abrir menu principal</span>
              {<Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
