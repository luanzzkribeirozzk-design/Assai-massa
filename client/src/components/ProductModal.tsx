import { useState } from "react";
import { Product, CartItem } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus } from "lucide-react";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleComponentToggle = (componentId: string) => {
    if (product.maxComponents && selectedComponents.length >= product.maxComponents) {
      if (selectedComponents.includes(componentId)) {
        setSelectedComponents(selectedComponents.filter((id) => id !== componentId));
      }
      return;
    }

    if (selectedComponents.includes(componentId)) {
      setSelectedComponents(selectedComponents.filter((id) => id !== componentId));
    } else {
      setSelectedComponents([...selectedComponents, componentId]);
    }
  };

  const calculateTotal = () => {
    let total = product.basePrice;
    selectedComponents.forEach((componentId) => {
      const component = product.components?.find((c) => c.id === componentId);
      if (component) {
        total += component.price;
      }
    });
    return total * quantity;
  };

  const handleAddToCart = () => {
    const componentObjects = selectedComponents
      .map((componentId) => {
        const component = product.components?.find((c) => c.id === componentId);
        return component
          ? {
              componentId: component.id,
              componentName: component.name,
              price: component.price,
            }
          : null;
      })
      .filter(Boolean) as Array<{
      componentId: string;
      componentName: string;
      price: number;
    }>;

    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      quantity,
      basePrice: product.basePrice,
      selectedComponents: componentObjects,
      totalPrice: calculateTotal(),
    };

    addItem(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-orange-500 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />

          {/* Description */}
          <p className="text-gray-700">{product.description}</p>

          {/* Components Selection */}
          {product.components && product.components.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Selecione os componentes
                {product.maxComponents && (
                  <span className="text-sm text-gray-600 ml-2">
                    (Máximo: {product.maxComponents})
                  </span>
                )}
              </h3>
              <div className="space-y-2">
                {product.components.map((component) => (
                  <label
                    key={component.id}
                    className="flex items-center p-3 border-2 border-gray-200 rounded-lg hover:border-purple-600 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedComponents.includes(component.id)}
                      onChange={() => handleComponentToggle(component.id)}
                      disabled={
                        !!(product.maxComponents &&
                        selectedComponents.length >= product.maxComponents &&
                        !selectedComponents.includes(component.id))
                      }
                      className="w-5 h-5 text-purple-600 rounded cursor-pointer"
                    />
                    <span className="flex-1 ml-3 text-gray-800 font-medium">
                      {component.name}
                    </span>
                    <span className="text-orange-600 font-bold">
                      +R$ {component.price.toFixed(2)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-gray-800">Quantidade:</span>
            <div className="flex items-center border-2 border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100 transition"
              >
                <Minus size={20} />
              </button>
              <span className="px-6 py-2 font-bold text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100 transition"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-800">Total:</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
                R$ {calculateTotal().toFixed(2)}
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
              Cancelar
            </Button>
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-all duration-300"
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
