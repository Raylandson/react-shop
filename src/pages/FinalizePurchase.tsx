import { useState, useEffect } from "react"; // Adicionado useEffect
import Layout from "../components/Layout";
import CartSummary from "../components/CartSummary";
import { ShieldCheck, CreditCard, CheckCircle, QrCode } from "lucide-react";
import { getProductById } from "../utils/productUtils";
import { useCartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const PIX_TIMER_DURATION = 10; // Segundos

function FinalizePurchase() {
  const [currentStep, setCurrentStep] = useState("review");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("pix");
  const navigate = useNavigate();

  // Estados do Cartão
  const [cardNumber, setCardNumber] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvcError, setCvcError] = useState("");
  const [isCardPaymentConfirmed, setIsCardPaymentConfirmed] = useState(false);

  // Estados do PIX
  const [pixTimer, setPixTimer] = useState(PIX_TIMER_DURATION);
  const [isPixProcessing, setIsPixProcessing] = useState(false);
  const [isPixConfirmed, setIsPixConfirmed] = useState(false);

  const { cartItems, clearCart } = useCartContext();

  const deliveryPricePerItem: number = 15;
  const subTotal = cartItems.reduce(
    (acc, item) => acc + (getProductById(item.id)?.price ?? 0) * item.quantity,
    0
  );
  const shippingCost =
    cartItems.length > 0 ? cartItems.length * deliveryPricePerItem : 0;
  const totalFinal = subTotal + shippingCost;

  // Efeito para o timer do PIX
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined = undefined;

    if (isPixProcessing && pixTimer > 0) {
      intervalId = setInterval(() => {
        setPixTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (isPixProcessing && pixTimer === 0) {
      // Timer zerou, simular confirmação
      clearCart();
      setIsPixProcessing(false);
      setIsPixConfirmed(true);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPixProcessing, pixTimer, clearCart]);

  const handleProceedToPayment = () => {
    if (selectedPaymentMethod === "pix") {
      setPixTimer(PIX_TIMER_DURATION); // Reseta o timer
      setIsPixProcessing(true); // Inicia o "processamento"
      setIsPixConfirmed(false); // Garante que a tela de confirmação não está ativa
      setCurrentStep("pixPayment");
    } else if (selectedPaymentMethod === "creditCard") {
      setIsCardPaymentConfirmed(false);
      setCardNumber("");
      setCvc("");
      setCardNumberError("");
      setCvcError("");
      setCurrentStep("creditCardPayment");
    }
  };

  const formatCardNumberInput = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
    return formatted.substring(0, 19);
  };

  const handleCreditCardSubmit = () => {
    let isValid = true;
    const cleanedCardNumber = cardNumber.replace(/\s/g, "");

    if (cleanedCardNumber.length !== 16 || !/^\d+$/.test(cleanedCardNumber)) {
      setCardNumberError("Número do cartão deve ter 16 dígitos.");
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (cvc.length !== 3 || !/^\d+$/.test(cvc)) {
      setCvcError("CVC deve ter 3 dígitos.");
      isValid = false;
    } else {
      setCvcError("");
    }

    if (isValid) {
      clearCart();
      setIsCardPaymentConfirmed(true);
    }
  };

  const handleReturnToHomeAndReset = () => {
    navigate("/");
    setCurrentStep("review");
    setSelectedPaymentMethod("pix");
    setIsCardPaymentConfirmed(false);
    setIsPixConfirmed(false);
    setIsPixProcessing(false);
    setPixTimer(PIX_TIMER_DURATION);
    setCardNumber("");
    setCvc("");
    setCardNumberError("");
    setCvcError("");
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "review":
        return (
          <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-gray-50 p-6 md:p-8 rounded-lg shadow-lg order-2 lg:order-1 flex flex-col">
              <div className="flex items-center text-xl md:text-2xl font-semibold text-gray-700 mb-6">
                <CreditCard className="w-7 h-7 mr-3 text-sky-600" />
                Escolha a forma de pagamento
              </div>
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
              <div className="flex flex-col gap-4 mt-auto">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-sky-950 font-semibold px-6 py-3 rounded-md transition-colors text-lg shadow-md"
                >
                  Prosseguir para Pagamento
                </button>
                <button
                  onClick={() => {
                    navigate("/cart");
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-md transition-colors text-lg shadow-md"
                >
                  Voltar para o Carrinho
                </button>
              </div>
            </div>
            <div className="w-full lg:w-2/5 order-1 lg:order-2 bg-white rounded-lg shadow-xl flex flex-col h-full">
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
        if (isPixConfirmed) {
          return (
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md flex flex-col items-center text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pagamento PIX Confirmado!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Seu pedido foi processado com sucesso.
              </p>
              <button
                onClick={handleReturnToHomeAndReset}
                className="w-full bg-amber-500 hover:bg-amber-600 text-sky-950 font-semibold px-6 py-3 rounded-md transition-colors text-lg shadow-md"
              >
                Voltar para a Home
              </button>
            </div>
          );
        }
        return (
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-4xl mb-6">
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
                <p className="text-gray-700 text-lg text-center mb-2">
                  Escaneie o QR Code para realizar o pagamento.
                </p>
                {isPixProcessing && (
                  <p className="text-sky-600 text-md font-semibold">
                    Aguardando confirmação: {pixTimer}s
                  </p>
                )}
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
                      Date.now() + 30 * 60 * 1000 // Validade do QR Code (ex: 30 min)
                    ).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}`}
                  </p>
                  <p>
                    A confirmação do pagamento será realizada em alguns
                    instantes.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setIsPixProcessing(false);
                  setCurrentStep("review");
                }}
                className="w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-md transition-colors text-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Alterar forma de pagamento
              </button>
            </div>
          </div>
        );

      case "creditCardPayment":
        if (isCardPaymentConfirmed) {
          return (
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md flex flex-col items-center text-center">
              <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Pagamento Confirmado!
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Obrigado pela sua compra. Seu pedido foi processado com sucesso.
              </p>
              <button
                onClick={handleReturnToHomeAndReset}
                className="w-full bg-amber-500 hover:bg-amber-600 text-sky-950 font-semibold px-6 py-3 rounded-md transition-colors text-lg shadow-md"
              >
                Voltar para a Home
              </button>
            </div>
          );
        }
        return (
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-lg flex flex-col items-center">
            <div className="flex items-center text-xl md:text-2xl font-semibold text-gray-700 mb-8">
              <CreditCard className="w-8 h-8 mr-3 text-sky-600" />
              Pagamento com Cartão de Crédito
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreditCardSubmit();
              }}
              className="w-full space-y-6"
            >
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Número do Cartão
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => {
                    setCardNumber(formatCardNumberInput(e.target.value));
                    if (cardNumberError) setCardNumberError("");
                  }}
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm ${
                    cardNumberError ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete="cc-number"
                />
                {cardNumberError && (
                  <p className="text-red-500 text-xs mt-1">{cardNumberError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cvc"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  value={cvc}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    setCvc(val);
                    if (cvcError) setCvcError("");
                  }}
                  placeholder="000"
                  maxLength={3}
                  className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm ${
                    cvcError ? "border-red-500" : "border-gray-300"
                  }`}
                  autoComplete="cc-csc"
                />
                {cvcError && (
                  <p className="text-red-500 text-xs mt-1">{cvcError}</p>
                )}
              </div>
              <div className="flex flex-col space-y-4 pt-4">
                <button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-sky-950 font-semibold px-6 py-3 rounded-md transition-colors text-lg shadow-md"
                >
                  Confirmar Pagamento
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep("review");
                    setCardNumber("");
                    setCvc("");
                    setCardNumberError("");
                    setCvcError("");
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-md transition-colors text-lg shadow-md"
                >
                  Voltar
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  let pageTitle = "Finalizar Compra";
  if (currentStep === "review") {
    pageTitle = "Detalhes Finais";
  } else if (currentStep === "pixPayment") {
    pageTitle = isPixConfirmed ? "Pedido Confirmado" : "Pagamento com PIX";
  } else if (currentStep === "creditCardPayment") {
    pageTitle = isCardPaymentConfirmed
      ? "Pedido Confirmado"
      : "Pagamento com Cartão";
  }

  return (
    <Layout>
      <div className="flex flex-col items-center min-h-[70vh] p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {pageTitle}
        </h1>
        {renderStepContent()}
      </div>
    </Layout>
  );
}

export default FinalizePurchase;
