import { useState, useRef, type MouseEvent } from "react";
import {
  Banknote,
  CalendarCheck,
  CreditCard,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import Layout from "../components/Layout";
import { formatPrice, getProductById } from "../utils/productUtils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCartContext, type CartItem } from "../contexts/CartContext";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  details: Array<Record<string, string>>;
}

function ProductDetail() {
  const [searchParams] = useSearchParams();
  const id: string = searchParams.get("id") || "";
  const product = getProductById(id) as Product | undefined;

  const { addItem } = useCartContext();
  const navigate = useNavigate();

  const [isZooming, setIsZooming] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const zoomLevel = 1.75;

  const handleMouseEnterImage = () => {
    if (window.innerWidth < 1024) return;
    setIsZooming(true);
  };

  const handleMouseLeaveImage = () => {
    if (window.innerWidth < 1024) return;
    setIsZooming(false);
    setTransformOrigin("center center");
  };

  const handleMouseMoveImage = (e: MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1024 || !imageContainerRef.current) return;
    if (!isZooming) setIsZooming(true);
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let percX = (x / rect.width) * 100;
    let percY = (y / rect.height) * 100;
    percX = Math.max(0, Math.min(100, percX));
    percY = Math.max(0, Math.min(100, percY));
    setTransformOrigin(`${percX}% ${percY}%`);
  };

  if (!product) {
    return (
      <Layout>
        <div className="text-white flex flex-col items-center justify-center h-full p-4">
          <h2 className="text-2xl font-semibold mt-10 text-center">
            Produto não encontrado.
          </h2>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    const itemToAdd: CartItem = { id: product.id, quantity: 1 };
    addItem(itemToAdd, 1);
    navigate("/cart");
  };

  return (
    <Layout>
      <div className="text-white flex flex-col p-4 md:p-8 lg:px-12 xl:px-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
          <div
            ref={imageContainerRef}
            className="bg-white rounded-lg justify-center flex items-center w-full lg:w-3/5 xl:w-2/3 aspect-square lg:aspect-auto lg:max-h-[600px] overflow-hidden cursor-zoom-in relative shadow-lg"
            onMouseEnter={handleMouseEnterImage}
            onMouseLeave={handleMouseLeaveImage}
            onMouseMove={handleMouseMoveImage}
          >
            <img
              className="max-w-full max-h-full h-auto w-auto object-contain rounded transition-transform duration-100 ease-out"
              src={product.imageUrl}
              alt={product.name}
              style={{
                transform: isZooming ? `scale(${zoomLevel})` : "scale(1)",
                transformOrigin: transformOrigin,
              }}
            />
          </div>

          <div className="w-full lg:w-2/5 xl:w-1/3 space-y-4 bg-gray-50 text-gray-800 p-6 lg:p-10 rounded-lg shadow-lg flex flex-col">
            <div className="flex flex-wrap gap-x-4 gap-y-1 items-center text-xs">
              <div className="flex items-center">
                <Sparkles className="text-amber-600 w-4 h-4 mr-1" />
                <span>NOVO</span>
              </div>
              <div className="flex items-center">
                <CalendarCheck className="text-amber-600 w-4 h-4 mr-1" />
                <span>22 meses de garantia</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-left text-sky-900">
              {product.name}
            </h2>
            <p className="text-base text-gray-600 text-left">
              {product.description}
            </p>
            <div className="flex flex-col sm:flex-row text-left gap-2 sm:items-end">
              <div className="flex items-center gap-2">
                <Banknote className="text-green-600 w-6 h-6" />
                <p className="text-2xl font-bold text-gray-800">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="flex items-center gap-2 sm:ml-2">
                <CreditCard className="text-blue-600 w-5 h-5" />
                <p className="text-sm text-gray-500">
                  ou 12x de {formatPrice(product.price / 12)}
                </p>
              </div>
            </div>
            <div className="flex-grow" />
            <button
              onClick={handleAddToCart}
              className="rounded-md bg-amber-500 w-full p-3 text-sky-950 hover:bg-amber-600 transition-colors duration-150 flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
            >
              <ShoppingCart size={24} />
              <div className="flex flex-col items-center leading-tight">
                <span className="font-bold text-lg">Comprar</span>
                <span className="text-xs">Adicionar ao carrinho</span>
              </div>
            </button>
          </div>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-20 flex flex-col gap-6 md:gap-8">
          <h1 className="text-center font-bold text-3xl md:text-4xl text-white">
            Especificações
          </h1>
          <div className="bg-white text-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full table-fixed">
              <colgroup>
                <col className="w-3/5" />
                <col className="w-2/5" />
              </colgroup>
              <tbody className="divide-y divide-gray-400">
                {product.details.map((detail, idx) =>
                  Object.entries(detail).map(([key, value]) => (
                    <tr key={`${idx}-${key}`} className="hover:bg-gray-50">
                      <th className="text-left font-medium p-3 md:p-4 lg:p-5 align-middle">
                        {key}:
                      </th>
                      <td className="p-3 md:p-4 lg:p-5 text-left align-middle">
                        {value}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
