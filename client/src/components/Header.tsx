import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface HeaderProps {
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

export default function Header({ showCart, setShowCart }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { getTotalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-gradient-to-r from-purple-600 to-orange-500">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            🍇
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Açaíteria Massa
            </h1>
            <p className="text-xs text-gray-600">Comidas Deliciosas</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Cardápio
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Sobre
          </a>
          <a href="#" className="text-gray-700 hover:text-purple-600 font-medium transition">
            Contato
          </a>
        </nav>

        {/* Cart Button */}
        <button
          onClick={() => setShowCart(!showCart)}
          className="relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-orange-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <ShoppingCart size={20} />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
          <span className="hidden sm:inline">Carrinho</span>
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="md:hidden text-gray-700"
        >
          {showMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-3">
          <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">
            Cardápio
          </a>
          <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">
            Sobre
          </a>
          <a href="#" className="block text-gray-700 hover:text-purple-600 font-medium">
            Contato
          </a>
        </div>
      )}
    </header>
  );
}
