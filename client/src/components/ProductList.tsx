import { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Edit2, Trash2, Eye, EyeOff } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onRefresh: () => void;
}

export default function ProductList({ products, onEdit, onRefresh }: ProductListProps) {
  const handleDelete = async (productId: string, productName: string) => {
    if (confirm(`Tem certeza que deseja deletar "${productName}"?`)) {
      try {
        await deleteDoc(doc(db, "products", productId));
        toast.success("Produto deletado com sucesso!");
        onRefresh();
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        toast.error("Erro ao deletar produto");
      }
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    try {
      await updateDoc(doc(db, "products", product.id), {
        available: !product.available,
      });
      toast.success(`Produto ${!product.available ? "ativado" : "desativado"}!`);
      onRefresh();
    } catch (error) {
      console.error("Erro ao atualizar disponibilidade:", error);
      toast.error("Erro ao atualizar disponibilidade");
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-2xl text-gray-600">Nenhum produto cadastrado</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 transition-all duration-300 ${
            product.available
              ? "border-green-500 hover:shadow-lg"
              : "border-red-500 opacity-75"
          }`}
        >
          {/* Image */}
          <div className="relative h-40 overflow-hidden bg-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {!product.available && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-bold">Indisponível</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 capitalize mt-1">
                {product.category}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-purple-600">
                R$ {product.basePrice.toFixed(2)}
              </span>
            </div>

            {/* Components Count */}
            {product.components && product.components.length > 0 && (
              <p className="text-sm text-gray-600">
                {product.components.length} componentes disponíveis
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-gray-200">
              <Button
                onClick={() => handleToggleAvailability(product)}
                variant="outline"
                size="sm"
                className="flex-1 flex items-center justify-center gap-1"
              >
                {product.available ? (
                  <>
                    <EyeOff size={16} />
                    Desativar
                  </>
                ) : (
                  <>
                    <Eye size={16} />
                    Ativar
                  </>
                )}
              </Button>
              <Button
                onClick={() => onEdit(product)}
                variant="outline"
                size="sm"
                className="flex-1 flex items-center justify-center gap-1"
              >
                <Edit2 size={16} />
                Editar
              </Button>
              <Button
                onClick={() => handleDelete(product.id, product.name)}
                variant="outline"
                size="sm"
                className="flex-1 text-red-600 hover:text-red-700 flex items-center justify-center gap-1"
              >
                <Trash2 size={16} />
                Deletar
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
