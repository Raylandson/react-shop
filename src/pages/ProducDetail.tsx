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
import { useSearchParams } from "react-router-dom";

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

  const [isZooming, setIsZooming] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const zoomLevel = 1.75;

  const handleMouseEnterImage = () => {
    // Ativa o zoom quando o mouse entra
    setIsZooming(true);
  };

  const handleMouseLeaveImage = () => {
    setIsZooming(false);
    setTransformOrigin("center center");
  };

  const handleMouseMoveImage = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;

    if (!isZooming) {
      setIsZooming(true);
    }

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
        <div className="text-white flex flex-col items-center justify-center h-full">
          <h2 className="text-2xl font-semibold mt-10">
            Produto não encontrado.
          </h2>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-white flex flex-col">
        <div className="flex gap-10 ml-20 mr-20">
          <div
            ref={imageContainerRef}
            className="bg-white rounded justify-center flex items-center w-2/3 overflow-hidden cursor-zoom-in relative"
            onMouseEnter={handleMouseEnterImage}
            onMouseLeave={handleMouseLeaveImage}
            onMouseMove={handleMouseMoveImage}
          >
            <img
              className="w-[60vw] max-w-[60%] h-full object-contain rounded transition-transform duration-100 ease-out"
              src={product.imageUrl}
              alt={product.name}
              style={{
                transform: isZooming ? `scale(${zoomLevel})` : "scale(1)",
                transformOrigin: transformOrigin,
              }}
            />
          </div>

          {/* O restante do seu código para detalhes do produto permanece o mesmo */}
          <div className=" w-1/3 space-y-4 bg-amber-50 text-[#1F2937] p-15 rounded flex flex-col h-auto">
            <div className="flex p-0 items-center mb-0">
              <Sparkles className="text-amber-600 w-4 h-4" />
              <p className="ml-2 text-xs"> NOVO </p>
              <CalendarCheck className="text-amber-600 w-4 h-4 ml-2" />
              <p className="ml-2 text-xs"> 22 meses de garantia </p>
            </div>
            <h2 className="text-2xl font-semibold text-left mt-0 text-[#1F2937]">
              {product.name}
            </h2>
            <p className="text-lg text-gray-500 text-left">
              {product.description}
            </p>
            <div className="flex text-left gap-2">
              <div className="flex flex-col">
                <Banknote className="text-green-500" />
                <CreditCard className="text-blue-500" />
              </div>
              <div className="flex flex-col">
                <p className="text-xl font-bold">
                  {formatPrice(product.price)}
                </p>
                <p className="text-sm text-[#6B7280]">
                  Em até 12x de R$ {formatPrice(product.price / 12)}
                </p>
              </div>
            </div>
            <div className="flex-1" />
            <button className="rounded bg-[#FFC107] w-full p-1 hover:bg-amber-500 flex justify-center">
              <div className="flex items-center gap-5">
                <ShoppingCart className="mx-auto mb-2" />
                <div className="flex flex-col items-center mb-2">
                  <h1 className="font-bold text-2xl">Comprar</h1>
                  <p className="text-sm">Adicionar no carrinho</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Div de especificações - NÃO FOI ALTERADO */}
        <div className="ml-25 mt-15 text-center flex flex-col gap-10 mr-25">
          <h1 className="text-center font-bold text-4xl">Especificações</h1>
          <table className="w-full">
            <tbody>
              {product.details.map((detail, idx) =>
                Object.entries(detail).map(([key, value]) => (
                  <tr key={`${idx}-${key}`}>
                    <th className="text-left pr-30 p-2 border-b-1 border-gray-500">
                      {key}:
                    </th>
                    <td className="text-left border-b-1 border-gray-500">
                      {value}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
