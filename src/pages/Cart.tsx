import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { formatPrice, getProductById } from "../utils/productUtils";
import type { Product } from "../types/Product";
import { Trash2 } from "lucide-react";

function Cart() {
  const navigate = useNavigate();
  const productTest: Product = getProductById("proc-1") as Product;

  return (
    <>
      <Layout>
        <div className="flex flex-col">
          <h1 className="text-4xl text-white font-bold">Meu Carrinho</h1>
          <button
            onClick={() => navigate("/")}
            className="text-xs self-start text-white px-4 py-2  hover:text-amber-300"
          >
            {"< Voltar para página inicial"}
          </button>
          <div className="flex gap-5 mt-5">
            <div className="flex flex-col bg-amber-50 rounded p-4 pt-4 w-3/4">
              <div className="p-3 flex justify-between w-full mb-2">
                <h3 className="text-black">Produto</h3>{" "}
                <div className="flex gap-13 mr-15">
                  <h3 className="text-black">Qntd</h3>{" "}
                  <h3 className="text-black">Preço</h3>{" "}
                </div>
              </div>
              {/* prototipo do produto no carrinho */}
              <div className="p-3 flex justify-between w-full mb-2  bg-cyan-900 rounded">
                <img
                  src={productTest.imageUrl}
                  alt={productTest.name}
                  className="h-20 w-20 object-contain rounded-t-lg mb-2"
                ></img>
                <h2 className="text-black self-center">{productTest.name}</h2>{" "}
                <div className="flex gap-5">
                  <h3 className="text-black self-center">1</h3>{" "}
                  <h3 className="text-black self-center">
                    {formatPrice(productTest.price)}
                  </h3>
                  <button>
                    <Trash2 className="hover:text-sky-400"></Trash2>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Seu carrinho está vazio.</p>
                <p>Adicione alguns produtos!</p>
              </div>
            </div>
            <div className="flex flex-col bg-amber-50 rounded p-4 pt-4 w-1/4">
              <h1 className="text-black mb-4">Resumo</h1>{" "}
              <div className="text-black">
                <p>Subtotal: R$ 0.00</p>
                <p>Frete: R$ 0.00</p>
                <p className="font-bold mt-2">Total: R$ 0.00</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-4 w-full">
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Cart;
