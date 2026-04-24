export interface ProductComponent {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: "tapioca" | "acai" | "mini-salgados" | "cuscuz" | "hot-dog" | "salada" | "milkshake";
  components?: ProductComponent[];
  maxComponents?: number;
  available: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  basePrice: number;
  selectedComponents: {
    componentId: string;
    componentName: string;
    price: number;
  }[];
  totalPrice: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: CartItem[];
  totalPrice: number;
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered";
  createdAt: number;
  updatedAt: number;
}

export interface StoreSettings {
  id: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  storeHours: string;
  whatsappNumber: string;
  updatedAt: number;
}
