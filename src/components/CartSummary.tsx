// No seu arquivo CartSummary.js
import React from "react";
import { formatPrice } from "../utils/productUtils";
import { ShieldCheck, Truck } from "lucide-react";

interface CartSummaryProps {
  subTotal: number;
  shippingCost: number;
  totalFinal: number;
  onConfirm?: () => void;
  confirmLabel?: string;
  growing?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subTotal,
  shippingCost,
  totalFinal,
  onConfirm,
  confirmLabel = "Confirmar Pedido",
  growing = false,
}) => {
  const orderPricingInfo = {
    discountPercentage: 15,
    get discountedPixTotal() {
      return totalFinal * (1 - this.discountPercentage / 100);
    },
    get originalPriceForInstallments() {
      return totalFinal;
    },
    installments: 12,
    get installmentValue() {
      return this.originalPriceForInstallments / this.installments;
    },
  };

  return (
    <>
      <div className="bg-green-700 text-white p-3 rounded-t-lg flex items-center justify-center text-sm flex-shrink-0">
        <ShieldCheck className="w-5 h-5 mr-2" />
        Site seguro protegido com SSL
      </div>

      <div className="flex flex-col bg-white p-6 w-full flex-shrink-0 border-b border-gray-200">
        <h1 className="text-gray-800 mb-5 text-2xl font-semibold border-b border-gray-300 pb-3">
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
          <div className="flex justify-between font-bold text-lg mt-4 pt-3 border-t border-gray-300">
            <span>Total:</span>
            <span>{formatPrice(totalFinal)}</span>
          </div>
          {onConfirm && (
            <button
              onClick={onConfirm}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded mt-6 transition-colors"
            >
              {confirmLabel}
            </button>
          )}
        </div>
      </div>

      <div
        className={
          "bg-white rounded-b-lg p-6 w-full not-only-of-type:flex flex-col" +
          (growing ? " flex-grow h-auto pb-10" : "")
        }
      >
        {/* Conteúdo superior */}
        <div>
          <div className="flex items-center text-sm text-gray-600 mb-4 justify-start sm:justify-center">
            <Truck className="w-5 h-5 mr-2 text-sky-600" />
            <span>Prazo de entrega: até 15 dias úteis.</span>
          </div>
          <div className="text-sm text-green-600 font-semibold text-center">
            <p>
              {formatPrice(orderPricingInfo.discountedPixTotal)} no PIX com{" "}
              {orderPricingInfo.discountPercentage}% de desconto
            </p>
          </div>
        </div>

        {/* Conteúdo inferior - empurrado para baixo pelo mt-auto */}
        <div className="text-xs text-gray-500 text-center mt-auto pt-4">
          <p>
            ou{" "}
            <span className="text-red-500 line-through">
              {formatPrice(orderPricingInfo.originalPriceForInstallments)}
            </span>
          </p>
          <p>
            em até {orderPricingInfo.installments}x de{" "}
            {formatPrice(orderPricingInfo.installmentValue)} sem juros no cartão
          </p>
        </div>
      </div>
    </>
  );
};

export default CartSummary;
