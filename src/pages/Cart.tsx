// src/pages/Cart.tsx ou similar

import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProductCartCard from "../components/ProductCartCard"; // Você precisará adaptar este componente
import { formatPrice, getProductById } from "../utils/productUtils";
import { useCartContext, type CartItem } from "../contexts/CartContext"; // Importe do seu contexto

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeItem,
    updateItemQuantity, // Usaremos para ProductCartCard
    // getItemCount, // Se precisar do total de unidades
    // clearCart, // Se tiver um botão de limpar carrinho
  } = useCartContext();

  const deliveryPricePerItemType: number = 15; // Ou como você calcular o frete

  // Calcula o subtotal dos produtos no carrinho
  const subTotal = cartItems.reduce(
    (acc, item) => acc + (getProductById(item.id)?.price ?? 0) * item.quantity,
    0
  );

  // Calcula o frete (exemplo: por tipo de item diferente no carrinho)
  // Se o carrinho estiver vazio, o frete é 0
  const shippingCost =
    cartItems.length > 0 ? cartItems.length * deliveryPricePerItemType : 0;
  // Ou, se for um valor fixo quando há itens:
  // const shippingCost = cartItems.length > 0 ? deliveryPrice : 0;

  const totalFinal = subTotal + shippingCost;

  // A função onRemoveProduct agora usa 'removeItem' do contexto
  // Esta função pode ser passada diretamente para ProductCartCard ou chamada aqui
  // Por simplicidade, passaremos 'removeItem' diretamente.

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
        <div className="overflow-x-auto flex flex-col lg:flex-row gap-5">
          <table className="w-full lg:w-3/4 bg-white table-fixed rounded h-fit shadow-lg">
            <colgroup>
              <col style={{ width: "55%" }} /> {/* Produto */}
              <col style={{ width: "20%" }} /> {/* Quantidade */}
              <col style={{ width: "20%" }} /> {/* Preço Total do Item */}
              <col style={{ width: "5%" }} /> {/* Remover */}
            </colgroup>
            <thead>
              <tr className="text-center border-b">
                <th className="py-3 px-4 text-left font-semibold text-gray-700">
                  Produto
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Quantidade
                </th>
                <th className="py-3 px-4 font-semibold text-gray-700">
                  Total Item
                </th>
                <th className="py-3 px-4 border-b"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: CartItem) => (
                <ProductCartCard
                  key={item.id}
                  productQuantity={item.quantity}
                  product={getProductById(item.id)} // Passe o CartItem inteiro
                  onRemoveClicked={removeItem}
                  onMinusClicked={() => {
                    updateItemQuantity(item.id, item.quantity - 1);
                  }}
                  onPlusClicked={() => {
                    updateItemQuantity(item.id, item.quantity + 1);
                  }} // Passe a função removeItem do contexto
                  // onUpdateQuantity={updateItemQuantity} // Passe a função updateItemQuantity
                />
              ))}
            </tbody>
          </table>
          <div className="flex flex-col bg-white rounded p-6 shadow-lg w-full lg:w-1/4 h-fit mt-5 lg:mt-0">
            <h1 className="text-gray-800 mb-5 text-2xl font-semibold border-b pb-3">
              Resumo
            </h1>
            <div className="text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(subTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Frete:</span>
                <span>{formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-3 border-t">
                <span>Total:</span>
                <span>R$ {formatPrice(totalFinal)}</span>
              </div>
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded mt-6 transition-colors">
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <Layout>
      {" "}
      {/* Certifique-se que Layout usa CartProvider corretamente em algum nível acima */}
      <div className="flex flex-col p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl text-white font-bold mb-6">
          Meu Carrinho
        </h1>
        {renderCart()}
      </div>
    </Layout>
  );
}

export default Cart;
