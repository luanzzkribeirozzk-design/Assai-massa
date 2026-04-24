import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { LogOut, Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"products" | "settings">("products");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsData.sort((a, b) => a.name.localeCompare(b.name)));
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  const handleProductSaved = () => {
    fetchProducts();
    setShowForm(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-4 border-gradient-to-r from-purple-600 to-orange-500">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <p className="text-sm text-gray-600">Bem-vindo, {user.email}</p>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-gray-200">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-6 py-3 font-semibold transition-all duration-300 ${
              activeTab === "products"
                ? "text-purple-600 border-b-4 border-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Produtos
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-6 py-3 font-semibold transition-all duration-300 ${
              activeTab === "settings"
                ? "text-purple-600 border-b-4 border-purple-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Configurações
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Add Button */}
            {!showForm && (
              <Button
                onClick={() => {
                  setSelectedProduct(null);
                  setShowForm(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Plus size={20} />
                Adicionar Novo Produto
              </Button>
            )}

            {/* Product Form */}
            {showForm && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <ProductForm
                  product={selectedProduct}
                  onSaved={handleProductSaved}
                  onCancel={() => {
                    setShowForm(false);
                    setSelectedProduct(null);
                  }}
                />
              </div>
            )}

            {/* Products List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <ProductList
                products={products}
                onEdit={(product: Product) => {
                  setSelectedProduct(product);
                  setShowForm(true);
                }}
                onRefresh={fetchProducts}
              />
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Configurações da Loja</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Endereço da Loja
                </label>
                <input
                  type="text"
                  defaultValue="R. José Benício de Araújo, 203, Massaranduba - PB, 58120-000"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Número do WhatsApp
                </label>
                <input
                  type="tel"
                  defaultValue="5587988203203"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
                />
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-orange-500">
                Salvar Configurações
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
