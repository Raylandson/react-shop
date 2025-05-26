import { Minus, Plus, Trash2 } from "lucide-react";
import type { Product } from "../types/Product"; // Confirme se o caminho está correto
import { formatPrice } from "../utils/productUtils"; // Confirme se o caminho está correto

interface ProductCartCardProps {
  product: Product | undefined;
  productQuantity: number;
  onRemoveClicked?: (productId: string) => void;
  onMinusClicked?: (productId: string) => void;
  onPlusClicked?: (productId: string) => void;
}

function ProductCartCard({
  product,
  onRemoveClicked,
  productQuantity,
  onMinusClicked,
  onPlusClicked,
}: ProductCartCardProps) {
  if (!product) return null;

  const handleRemove = () => {
    if (onRemoveClicked) {
      onRemoveClicked(product.id);
    }
  };

  const handleDecreaseQuantity = () => {
    if (onMinusClicked) {
      onMinusClicked(product.id);
    }
  };

  const handleIncreaseQuantity = () => {
    if (onPlusClicked) {
      onPlusClicked(product.id);
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150 ease-in-out">
      <td className="py-3 px-2 md:px-4 align-middle">
        <div className="flex items-center gap-2 sm:gap-4">
          <img
            className="h-16 w-16 sm:h-20 sm:w-20 object-contain rounded shadow-sm flex-shrink-0" // object-cover, rounded e shadow
            src={product.imageUrl}
            alt={product.name}
          />
          <div className="flex-grow">
            <h2 className="text-sm sm:text-base text-gray-800 font-medium line-clamp-2 leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-gray-500 mt-1 md:hidden">
              Unit: {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </td>

      <td className="py-3 px-2 md:px-4 align-middle">
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={handleDecreaseQuantity}
            disabled={productQuantity <= 1}
            className="p-1 rounded-full text-sky-600 hover:bg-sky-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors duration-150 ease-in-out"
            aria-label="Diminuir quantidade"
          >
            <Minus size={18} strokeWidth={2.5} />
          </button>
          <span className="text-sm sm:text-base font-medium text-gray-700 w-6 text-center">
            {productQuantity}
          </span>
          <button
            onClick={handleIncreaseQuantity}
            className="p-1 rounded-full text-sky-600 hover:bg-sky-100 transition-colors duration-150 ease-in-out"
            aria-label="Aumentar quantidade"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>
      </td>

      <td className="py-3 px-2 md:px-4 align-middle text-center hidden md:table-cell">
        <span className="text-sm sm:text-base font-medium text-gray-700">
          {formatPrice(product.price * productQuantity)}
        </span>
      </td>

      <td className="py-3 px-1 md:px-2 align-middle text-center">
        <button
          onClick={handleRemove}
          className="p-2 rounded-md text-red-500 hover:bg-red-100 hover:text-red-700 transition-colors duration-150 ease-in-out"
          aria-label="Remover item"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}

export default ProductCartCard;
