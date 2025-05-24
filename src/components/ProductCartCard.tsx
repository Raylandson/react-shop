import { Minus, Plus, Trash2 } from "lucide-react";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/productUtils";

interface ProductCartCardProps {
  product: Product;
  onRemoveClicked?: (productId: string) => void;
}

function ProductCartCard({ product, onRemoveClicked }: ProductCartCardProps) {
  return (
    <tr>
      <td className="py-2 px-4 border-b">
        <div className="flex gap-10">
          <img className="h-20 w-20" src={product.imageUrl}></img>
          <h2 className="text-black self-center line-clamp-2">
            {product.name}
          </h2>
        </div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="gap-2 flex items-center justify-center">
          <button>
            <Plus size={20} className="text-sky-500 hover:text-sky-700" />
          </button>
          1
          <button>
            <Minus
              size={20}
              className="text-sky-500 hover:text-sky-700 self-center"
            />
          </button>
        </div>
      </td>
      <td className="py-2 px-4 border-b self-center">
        {formatPrice(product.price)}
      </td>
      <td className="py-2 px-4 border-b">
        <button
          onClick={() => onRemoveClicked?.(product.id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 size={24} />
        </button>
      </td>
    </tr>
  );
}

export default ProductCartCard;
