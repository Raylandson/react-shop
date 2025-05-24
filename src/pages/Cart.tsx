import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import type { Product } from "../types/Product";
import ProductCartCard from "../components/ProductCartCard";
import { formatPrice, getProductById } from "../utils/productUtils";
import { useCallback, useEffect, useState, type JSX } from "react";

function Cart() {
  const navigate = useNavigate();
  // const productTest: Product = getProductById("proc-1") as Product;
  const deliveryPrice: number = 15;
  const [cartProducts, setCartProducts] = useState<Product[]>([
    getProductById("proc-1") as Product,
    getProductById("mem-1") as Product,
    getProductById("gpu-1") as Product,
    getProductById("proc-2") as Product,
  ]);

  const [totalPrice, setTotalPrice] = useState<number>(0);

  function onRemoveProduct(productId: string): void {
    const updatedCart = cartProducts.filter(
      (product) => product.id !== productId
    );
    setCartProducts(updatedCart);
  }

  const updateTotalPrice = useCallback(() => {
    const total = cartProducts.reduce(
      (acc: number, product: Product) => acc + product.price,
      0
    );
    setTotalPrice(total);
  }, [cartProducts]);

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      const cartProducts = JSON.parse(cart);
      const products = cartProducts.map(
        (productId: string) => getProductById(productId) as Product
      );
      setCartProducts(products);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts.map((p) => p.id)));
    updateTotalPrice();
  }, [cartProducts, totalPrice, updateTotalPrice]);

  function renderCart(): JSX.Element {
    if (cartProducts.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full mt-44">
          <h2 className="text-2xl text-white">Seu carrinho está vazio</h2>
        </div>
      );
    }
    return (
      <>
        <button
          onClick={() => navigate("/")}
          className="text-xs self-start text-white px-4 py-2  hover:text-amber-300"
        >
          {"< Voltar para página inicial"}
        </button>
        <div className="overflow-x-auto flex gap-5">
          <table className="w-3/4 bg-white table-fixed rounded h-fit ">
            <colgroup>
              <col style={{ width: "60%" }} />
              <col style={{ width: "19%" }} />
              <col style={{ width: "17%" }} />
              <col style={{ width: "5%" }} />
            </colgroup>
            <thead>
              <tr className="self-start text-center ">
                <th className="py-2 px-4 border-b text-left">Produto</th>
                <th className="py-2 px-4 border-b">Quantidade</th>
                <th className="py-2 px-4 border-b">Preço</th>
                <th className="py-2 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody className="w-fit">
              {cartProducts.map((product: Product) => (
                <ProductCartCard
                  key={product.id}
                  product={product}
                  onRemoveClicked={() => onRemoveProduct(product.id)}
                />
              ))}
            </tbody>
          </table>
          <div className="flex flex-col bg-white rounded p-4 pt-4 w-1/4 h-1/2">
            <h1 className="text-black mb-4 text-2xl">Resumo</h1>{" "}
            <div className="text-black">
              <p>Subtotal: {formatPrice(totalPrice)}</p>
              <p>Frete: {formatPrice(cartProducts.length * deliveryPrice)}</p>
              <p className="font-bold mt-2">
                Total: R${" "}
                {formatPrice(totalPrice + cartProducts.length * deliveryPrice)}
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-4">
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Layout>
        <div className="flex flex-col">
          <h1 className="text-4xl text-white font-bold">Meu Carrinho</h1>
          {renderCart()}
        </div>
      </Layout>
    </>
  );
}

export default Cart;
