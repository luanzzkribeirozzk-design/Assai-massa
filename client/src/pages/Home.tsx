import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import ProductCatalog from "@/components/ProductCatalog";
import Cart from "@/components/Cart";
import Header from "@/components/Header";

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <Header showCart={showCart} setShowCart={setShowCart} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showCart ? (
          <Cart onClose={() => setShowCart(false)} />
        ) : (
          <ProductCatalog />
        )}
      </main>

      {/* Floating Cart Button */}
      {!showCart && getTotalItems() > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-40 flex items-center gap-2"
        >
          <ShoppingCart size={24} />
          <span className="font-bold text-lg">{getTotalItems()}</span>
        </button>
      )}
    </div>
  );
}
