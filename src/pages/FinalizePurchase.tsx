import { useState } from "react";
import Layout from "../components/Layout";
import CartSummary from "../components/CartSummary"; // Certifique-se que o caminho está correto
import { ShieldCheck, CreditCard, CheckCircle, QrCode } from "lucide-react";
import { getProductById } from "../utils/productUtils";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function FinalizePurchase() {
  const [currentStep, setCurrentStep] = useState("review"); // 'review', 'pixPayment', 'creditCardPayment'
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("pix"); // 'pix' ou 'creditCard'
  const navigate = useNavigate();
  const handleProceedToPayment = () => {
    if (selectedPaymentMethod === "pix") {
      setCurrentStep("pixPayment");
    } else if (selectedPaymentMethod === "creditCard") {
      setCurrentStep("creditCardPayment");
      //alert("Lógica para pagamento com Cartão de Crédito a ser implementada.");
    }
  };

  const { cartItems } = useCartContext();

  const deliveryPricePerItem: number = 15;
  const subTotal = cartItems.reduce(
    (acc, item) => acc + (getProductById(item.id)?.price ?? 0) * item.quantity,
    0
  );
  const shippingCost =
    cartItems.length > 0 ? cartItems.length * deliveryPricePerItem : 0;
  const totalFinal = subTotal + shippingCost;

  const renderStepContent = () => {
    switch (currentStep) {
      case "review":
        return (
          <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
            {/* Coluna da Esquerda: Seleção de Pagamento */}
            <div className="flex-1 bg-gray-50 p-6 md:p-8 rounded shadow-md order-2 lg:order-1">
              <div className="flex items-center text-xl md:text-2xl font-semibold text-gray-700 mb-6">
                <CreditCard className="w-7 h-7 mr-3 text-sky-600" />
                Escolha a forma de pagamento
              </div>

              {/* Opções de Pagamento */}
              <section className="mb-8">
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedPaymentMethod("pix")}
                    className={`w-full flex items-center text-left p-4 border rounded-lg transition-colors duration-150 ease-in-out ${
                      selectedPaymentMethod === "pix"
                        ? "bg-sky-100 border-sky-500 text-sky-700 ring-2 ring-sky-500 shadow-md"
                        : "bg-white hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    <QrCode className="w-6 h-6 mr-3 text-sky-600" />
                    <span className="font-medium text-lg">PIX</span>
                    {selectedPaymentMethod === "pix" && (
                      <CheckCircle className="w-6 h-6 ml-auto text-sky-600" />
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedPaymentMethod("creditCard")}
                    className={`w-full flex items-center text-left p-4 border rounded-lg transition-colors duration-150 ease-in-out ${
                      selectedPaymentMethod === "creditCard"
                        ? "bg-sky-100 border-sky-500 text-sky-700 ring-2 ring-sky-500 shadow-md"
                        : "bg-white hover:bg-gray-100 border-gray-300"
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mr-3 text-sky-600" />
                    <span className="font-medium text-lg">
                      Cartão de Crédito
                    </span>
                    {selectedPaymentMethod === "creditCard" && (
                      <CheckCircle className="w-6 h-6 ml-auto text-sky-600" />
                    )}
                  </button>
                </div>
              </section>
              <div className="flex flex-col gap-4">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-sky-950 font-semibold px-6 py-4 rounded transition-colors text-lg shadow-md"
                >
                  Prosseguir para Pagamento
                </button>
                <button
                  onClick={() => {
                    navigate("/cart");
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-sky-950 font-semibold px-6 py-4 rounded transition-colors text-lg shadow-md"
                >
                  Voltar para o Carrinho
                </button>
              </div>
            </div>

            <div className="w-full lg:w-2/5 order-1 lg:order-2 bg-green-700 rounded-lg shadow-xl h-full">
              <CartSummary
                subTotal={subTotal}
                shippingCost={shippingCost}
                totalFinal={totalFinal}
                growing={true}
              />
            </div>
          </div>
        );

      case "pixPayment":
        return (
          // Seu código da tela de pagamento PIX (mantido como antes)
          <div className="bg-white rounded shadow-md p-8 w-full max-w-4xl mb-6">
            <div className="flex items-center mb-6 gap-2 justify-center">
              <ShieldCheck className="w-10 h-10 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                Pagamento com PIX
              </h1>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center flex-1">
                <img
                  src="/site-qr-code.png"
                  className="w-64 h-64 mb-4"
                  alt="Imagem do qr code"
                />
                <p className="text-gray-700 text-lg text-center">
                  Escaneie o QR Code para realizar o pagamento.
                </p>
              </div>
              <div className="flex flex-col flex-1 md:pl-8 md:border-l md:border-gray-200 text-left">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Como pagar com Pix:
                </h2>
                <ol className="list-decimal list-inside text-gray-700 space-y-2">
                  <li>Acesse o app ou site do seu banco</li>
                  <li>Busque a opção de pagar com Pix</li>
                  <li>Leia o QR code ou código Pix</li>
                  <li>Pronto! Você verá a confirmação do pagamento</li>
                </ol>
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  <p className="font-semibold">
                    {`O seu QR Code é válido até ${new Date(
                      Date.now() + 30 * 60 * 1000 // 30 minutos de validade
                    ).toLocaleString("pt-BR", {
                      // Formato brasileiro
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}`}
                  </p>
                  <p>
                    A confirmação do pagamento será realizada em até 30 minutos.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => setCurrentStep("review")}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded transition-colors mr-4"
              >
                Alterar forma de pagamento
              </button>
            </div>
          </div>
        );

      case "creditCardPayment":
        return (
          // Seu placeholder para Cartão de Crédito (mantido como antes)
          <div className="bg-white rounded shadow-md p-8 w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Pagamento com Cartão de Crédito
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Esta funcionalidade será implementada em breve.
            </p>
            <CreditCard className="w-16 h-16 text-sky-600 mb-6" />
            <button
              onClick={() => setCurrentStep("review")}
              className="bg-amber-400 hover:bg-amber-500 text-sky-950 font-semibold px-6 py-3 rounded transition-colors"
            >
              Voltar
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-[70vh] p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {currentStep === "review" ? "Detalhes Finais" : "Finalizar Compra"}
        </h1>
        {renderStepContent()}
      </div>
    </Layout>
  );
}

export default FinalizePurchase;
