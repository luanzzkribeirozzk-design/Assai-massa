import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const q = query(
          collection(db, "products"),
          where("available", "==", true)
        );
        const querySnapshot = await getDocs(q);
        const productsData: Product[] = [];
        querySnapshot.forEach((doc) => {
          productsData.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(productsData.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    { id: "all", name: "Todos" },
    { id: "tapioca", name: "Tapiocas" },
    { id: "acai", name: "Açaís" },
    { id: "mini-salgados", name: "Mini Salgados" },
    { id: "cuscuz", name: "Cuscuz" },
    { id: "hot-dog", name: "Hot Dog" },
    { id: "salada", name: "Saladas" },
    { id: "milkshake", name: "Milkshakes" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-white shadow-xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Bem-vindo à Açaíteria Massa!
        </h2>
        <p className="text-lg md:text-xl opacity-90">
          Descubra nossos produtos deliciosos e feitos com qualidade premium
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 md:px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-gradient-to-r from-purple-600 to-orange-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin text-purple-600" size={48} />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-600">Nenhum produto disponível nesta categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
