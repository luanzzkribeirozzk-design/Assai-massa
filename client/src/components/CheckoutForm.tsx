import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";

interface CheckoutFormProps {
  onBack: () => void;
  totalPrice: number;
}

export default function CheckoutForm({ onBack, totalPrice }: CheckoutFormProps) {
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatOrderMessage = () => {
    let message = `*NOVO PEDIDO - AÇAÍTERIA MASSA*\n\n`;
    message += `*Cliente:* ${formData.name}\n`;
    message += `*Telefone:* ${formData.phone}\n`;
    message += `*Endereço:* ${formData.address}\n\n`;
    message += `*Produtos:*\n`;

    items.forEach((item) => {
      message += `\n• ${item.productName} (x${item.quantity})\n`;
      if (item.selectedComponents.length > 0) {
        message += `  Componentes:\n`;
        item.selectedComponents.forEach((comp) => {
          message += `  - ${comp.componentName}\n`;
        });
      }
      message += `  Subtotal: R$ ${item.totalPrice.toFixed(2)}\n`;
    });

    message += `\n*TOTAL A PAGAR: R$ ${totalPrice.toFixed(2)}*\n`;
    message += `\nObrigado por escolher a Açaíteria Massa! 🍇`;

    return encodeURIComponent(message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const message = formatOrderMessage();
      const whatsappNumber = "5587988203203"; // Número padrão - será configurável no admin
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

      // Abrir WhatsApp
      window.open(whatsappUrl, "_blank");

      // Limpar carrinho após enviar
      setTimeout(() => {
        clearCart();
        toast.success("Pedido enviado com sucesso!");
        onBack();
      }, 1000);
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      toast.error("Erro ao enviar pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-gray-800 transition p-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold text-gray-800">Finalizar Pedido</h2>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-purple-100 to-orange-100 rounded-lg p-6 space-y-3">
        <h3 className="text-lg font-bold text-gray-800">Resumo do Pedido</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.productName} x{item.quantity}
              </span>
              <span className="font-semibold text-gray-800">
                R$ {item.totalPrice.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t-2 border-gray-300 pt-3 flex justify-between">
          <span className="font-bold text-gray-800">Total:</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
            R$ {totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Seu nome"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Telefone/WhatsApp *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="(87) 98820-3203"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Endereço de Entrega *
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Rua, número, complemento, bairro, cidade"
            rows={3}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition resize-none"
            required
          />
        </div>

        {/* Info */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-blue-800">
            <strong>ℹ️ Informação:</strong> Você será redirecionado para o WhatsApp para confirmar seu pedido. Responda a mensagem para que possamos processar seu pedido.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="flex-1"
          >
            <ArrowLeft className="mr-2" size={18} />
            Voltar
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-all duration-300"
          >
            <Send className="mr-2" size={18} />
            {loading ? "Enviando..." : "Enviar Pedido via WhatsApp"}
          </Button>
        </div>
      </form>
    </div>
  );
}
