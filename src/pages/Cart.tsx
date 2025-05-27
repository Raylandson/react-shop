// No seu arquivo Cart.js

import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCartCard from "../components/ProductCartCard";
import { getProductById } from "../utils/productUtils";
import { useCartContext, type CartItem } from "../contexts/CartContext";
import CartSummary from "../components/CartSummary";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeItem, updateItemQuantity } = useCartContext();

  const deliveryPricePerItem: number = 15;
  const subTotal = cartItems.reduce(
    (acc, item) => acc + (getProductById(item.id)?.price ?? 0) * item.quantity,
    0
  );
  const shippingCost =
    cartItems.length > 0 ? cartItems.length * deliveryPricePerItem : 0;
  const totalFinal = subTotal + shippingCost;

  function renderCart() {
    if (cartItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full mt-44">
          <h2 className="text-2xl text-white">Seu carrinho está vazio</h2>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-amber-400 text-sky-950 font-semibold rounded hover:bg-amber-500 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>
      );
    }
    return (
      <>
        <button
          onClick={() => navigate("/")}
          className="text-xs self-start text-white px-4 py-2 mb-4 hover:text-amber-300 transition-colors"
        >
          {"< Continuar comprando"}
        </button>
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          <div className="w-full lg:flex-[3] overflow-x-auto">
            {/* ... Tabela ... */}
            <table className="min-w-full w-full bg-white table-auto overflow-hidden rounded shadow-lg">
              <thead>
                <tr className="text-center border-b border-gray-200">
                  <th className="py-3 px-2 md:px-4 text-left font-semibold text-gray-700 text-sm">
                    Produto
                  </th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-700 text-sm">
                    Quantidade
                  </th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-700 text-sm hidden md:table-cell">
                    Total Item
                  </th>
                  <th className="py-3 px-1 md:px-2"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: CartItem) => (
                  <ProductCartCard
                    key={item.id}
                    productQuantity={item.quantity}
                    product={getProductById(item.id)}
                    onRemoveClicked={removeItem}
                    onMinusClicked={() => {
                      updateItemQuantity(item.id, item.quantity - 1);
                    }}
                    onPlusClicked={() => {
                      updateItemQuantity(item.id, item.quantity + 1);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full lg:flex-[1] rounded-lg flex flex-col flex-shrink-0">
            <CartSummary
              subTotal={subTotal}
              shippingCost={shippingCost}
              totalFinal={totalFinal}
              onConfirm={() => navigate("/checkout")}
              confirmLabel="Confirmar Pedido"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    // ... (Layout)
    <Layout>
      <div className="flex flex-col p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-6 md:mb-8">
          Meu Carrinho
        </h1>
        {renderCart()}
      </div>
    </Layout>
  );
}

export default Cart;
