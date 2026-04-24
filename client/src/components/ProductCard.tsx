import { useState } from "react";
import { Product, CartItem } from "@/lib/types";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProductModal from "@/components/ProductModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = () => {
    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      quantity: 1,
      basePrice: product.basePrice,
      selectedComponents: [],
      totalPrice: product.basePrice,
    };
    addItem(cartItem);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Image Container */}
        <div className="relative h-48 md:h-56 overflow-hidden bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 space-y-3">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-800 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              R$ {product.basePrice.toFixed(2)}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            {product.components && product.components.length > 0 ? (
              <Button
                onClick={() => setShowModal(true)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-all duration-300"
              >
                Personalizar
              </Button>
            ) : (
              <Button
                onClick={handleQuickAdd}
                className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Adicionar
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {showModal && (
        <ProductModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
