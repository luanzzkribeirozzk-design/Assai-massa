import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, Send } from "lucide-react";
import CheckoutForm from "@/components/CheckoutForm";

interface CartProps {
  onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {
  const { items, removeItem, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Carrinho Vazio</h2>
        <p className="text-gray-600 mb-8">Adicione produtos para começar!</p>
        <Button
          onClick={onClose}
          className="bg-gradient-to-r from-purple-600 to-orange-500"
        >
          <ArrowLeft className="mr-2" size={18} />
          Voltar ao Cardápio
        </Button>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <CheckoutForm
        onBack={() => setShowCheckout(false)}
        totalPrice={getTotalPrice()}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800">Seu Carrinho</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 transition"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.productId}
            className="bg-white rounded-lg p-4 md:p-6 shadow-md border-l-4 border-gradient-to-b from-purple-600 to-orange-500"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-gray-800">
                  {item.productName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Quantidade: {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-500 hover:text-red-700 transition p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* Components */}
            {item.selectedComponents.length > 0 && (
              <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Componentes:
                </p>
                <ul className="space-y-1">
                  {item.selectedComponents.map((comp) => (
                    <li key={comp.componentId} className="text-sm text-gray-600">
                      • {comp.componentName} (+R$ {comp.price.toFixed(2)})
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-gray-700 font-semibold">Total:</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                R$ {item.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-purple-100 to-orange-100 rounded-lg p-6 space-y-4">
        <div className="flex justify-between items-center text-lg">
          <span className="font-semibold text-gray-800">Subtotal:</span>
          <span className="font-bold text-gray-800">
            R$ {getTotalPrice().toFixed(2)}
          </span>
        </div>
        <div className="border-t-2 border-gray-300 pt-4 flex justify-between items-center text-2xl">
          <span className="font-bold text-gray-800">Total:</span>
          <span className="font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            R$ {getTotalPrice().toFixed(2)}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onClose}
          variant="outline"
          className="flex-1"
        >
          <ArrowLeft className="mr-2" size={18} />
          Continuar Comprando
        </Button>
        <Button
          onClick={() => setShowCheckout(true)}
          className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-all duration-300"
        >
          <Send className="mr-2" size={18} />
          Finalizar Pedido
        </Button>
      </div>

      {/* Clear Cart */}
      <button
        onClick={() => {
          if (confirm("Tem certeza que deseja limpar o carrinho?")) {
            clearCart();
          }
        }}
        className="w-full text-red-500 hover:text-red-700 font-semibold transition py-2"
      >
        Limpar Carrinho
      </button>
    </div>
  );
}
