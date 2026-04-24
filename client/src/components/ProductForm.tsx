import { useState, useEffect } from "react";
import { Product, ProductComponent } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, updateDoc, doc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import { X, Plus, Upload } from "lucide-react";

interface ProductFormProps {
  product?: Product | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSaved, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: 0,
    category: "tapioca" as "tapioca" | "acai" | "mini-salgados" | "cuscuz" | "hot-dog" | "salada" | "milkshake",
    image: "",
    available: true,
    maxComponents: 0,
  });
  const [components, setComponents] = useState<ProductComponent[]>([]);
  const [newComponent, setNewComponent] = useState({ name: "", price: 0, category: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        basePrice: product.basePrice,
        category: product.category,
        image: product.image,
        available: product.available,
        maxComponents: product.maxComponents || 0,
      });
      setComponents(product.components || []);
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddComponent = () => {
    if (newComponent.name && newComponent.price > 0) {
      const component: ProductComponent = {
        id: Date.now().toString(),
        name: newComponent.name,
        price: newComponent.price,
        category: newComponent.category,
      };
      setComponents([...components, component]);
      setNewComponent({ name: "", price: 0, category: "" });
    } else {
      toast.error("Preencha o nome e preço do componente");
    }
  };

  const handleRemoveComponent = (id: string) => {
    setComponents(components.filter((c) => c.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || formData.basePrice <= 0) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.image;

      // Upload image if new file selected
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const productData = {
        ...formData,
        image: imageUrl,
        components: components.length > 0 ? components : undefined,
        updatedAt: Timestamp.now().toMillis(),
      };

      if (product) {
        // Update existing product
        await updateDoc(doc(db, "products", product.id), productData);
        toast.success("Produto atualizado com sucesso!");
      } else {
        // Create new product
        await addDoc(collection(db, "products"), {
          ...productData,
          createdAt: Timestamp.now().toMillis(),
        });
        toast.success("Produto criado com sucesso!");
      }

      onSaved();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      toast.error("Erro ao salvar produto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Nome do Produto *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ex: Tapioca de Frango"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Categoria *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
          >
            <option value="tapioca">Tapiocas</option>
            <option value="acai">Açaís</option>
            <option value="mini-salgados">Mini Salgados</option>
            <option value="cuscuz">Cuscuz</option>
            <option value="hot-dog">Hot Dog</option>
            <option value="salada">Saladas</option>
            <option value="milkshake">Milkshakes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Preço Base (R$) *
          </label>
          <input
            type="number"
            name="basePrice"
            value={formData.basePrice}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-2">
            Máximo de Componentes
          </label>
          <input
            type="number"
            name="maxComponents"
            value={formData.maxComponents}
            onChange={handleInputChange}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Descrição
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Descrição do produto"
          rows={3}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition resize-none"
        />
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Imagem do Produto
        </label>
        <div className="flex gap-4">
          {formData.image && (
            <img
              src={formData.image}
              alt={formData.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-600 cursor-pointer transition">
              <Upload size={20} />
              <span className="text-gray-700">Selecionar imagem</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="available"
          checked={formData.available}
          onChange={handleInputChange}
          className="w-5 h-5 text-purple-600 rounded cursor-pointer"
        />
        <label className="text-gray-800 font-semibold cursor-pointer">
          Produto disponível
        </label>
      </div>

      {/* Components */}
      <div className="border-t-2 border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Componentes</h3>

        {/* Add Component */}
        <div className="space-y-3 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={newComponent.name}
              onChange={(e) => setNewComponent({ ...newComponent, name: e.target.value })}
              placeholder="Nome do componente"
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
            />
            <input
              type="number"
              value={newComponent.price}
              onChange={(e) => setNewComponent({ ...newComponent, price: parseFloat(e.target.value) })}
              placeholder="Preço adicional"
              step="0.01"
              min="0"
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none transition"
            />
            <Button
              type="button"
              onClick={handleAddComponent}
              className="bg-gradient-to-r from-purple-600 to-orange-500 flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Components List */}
        {components.length > 0 && (
          <div className="space-y-2">
            {components.map((component) => (
              <div
                key={component.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div>
                  <p className="font-semibold text-gray-800">{component.name}</p>
                  <p className="text-sm text-gray-600">+R$ {component.price.toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveComponent(component.id)}
                  className="text-red-500 hover:text-red-700 transition p-2"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-6 border-t-2 border-gray-200">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-purple-600 to-orange-500 hover:shadow-lg transition-all duration-300"
        >
          {loading ? "Salvando..." : product ? "Atualizar Produto" : "Criar Produto"}
        </Button>
      </div>
    </form>
  );
}
