import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBDFQVFQGXvP6CISwo8kgwauAcSCHIQ_ek",
  authDomain: "assaiteria-f2597.firebaseapp.com",
  projectId: "assaiteria-f2597",
  storageBucket: "assaiteria-f2597.firebasestorage.app",
  messagingSenderId: "725325088259",
  appId: "1:725325088259:web:cf3645525252ae0fbb7036"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const products = [
  {
    name: "Tapioca de Frango",
    description: "Tapioca crocante recheada com frango desfiado",
    basePrice: 12.00,
    category: "tapioca",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/tapioca-frango-YpTMKQiAXfzzMBMytGLHPv.webp",
    available: true,
    components: [
      { id: "1", name: "Queijo", price: 2.00, category: "extras" },
      { id: "2", name: "Calabresa", price: 2.50, category: "extras" },
      { id: "3", name: "Bacon", price: 3.00, category: "extras" },
      { id: "4", name: "Nata", price: 2.00, category: "extras" }
    ],
    maxComponents: 3
  },
  {
    name: "Açaí Tradicional 250ml",
    description: "Açaí puro com granola, banana e mel",
    basePrice: 15.00,
    category: "acai",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/acai-tradicional-UhPj7o3m5UTdA8eRotPJ6J.webp",
    available: true,
    components: [
      { id: "5", name: "Morango", price: 0, category: "frutas" },
      { id: "6", name: "Banana", price: 0, category: "frutas" },
      { id: "7", name: "Granola", price: 0, category: "toppings" },
      { id: "8", name: "Coco Ralado", price: 0, category: "toppings" }
    ],
    maxComponents: 2
  },
  {
    name: "Cuscuz Recheado",
    description: "Cuscuz tradicional com recheios variados",
    basePrice: 20.00,
    category: "cuscuz",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/cuscuz-recheado-BcWnsTAsD9V7TzTUsD4Jig.webp",
    available: true,
    components: [
      { id: "9", name: "Frango", price: 0, category: "carnes" },
      { id: "10", name: "Queijo", price: 0, category: "queijos" },
      { id: "11", name: "Calabresa", price: 0, category: "carnes" },
      { id: "12", name: "Presunto", price: 0, category: "carnes" },
      { id: "13", name: "Bacon", price: 0, category: "carnes" },
      { id: "14", name: "Nata", price: 2.00, category: "extras" }
    ],
    maxComponents: 3
  },
  {
    name: "Hot Dog Gourmet",
    description: "Pão artesanal com salsicha premium e acompanhamentos",
    basePrice: 20.00,
    category: "hot-dog",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/hot-dog-gourmet-DgEZ8Qjysce9du832gbDoZ.webp",
    available: true,
    components: [
      { id: "15", name: "Azeitona", price: 0, category: "acompanhamentos" },
      { id: "16", name: "Coentro", price: 0, category: "acompanhamentos" },
      { id: "17", name: "Vinagrete", price: 0, category: "acompanhamentos" },
      { id: "18", name: "Queijo", price: 1.50, category: "queijos" },
      { id: "19", name: "Bacon", price: 2.00, category: "carnes" }
    ],
    maxComponents: 5
  },
  {
    name: "Milkshake de Morango",
    description: "Milkshake cremoso de morango com leite condensado",
    basePrice: 18.00,
    category: "milkshake",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/milkshake-morango-PWRtb8uW9skETsSiHwtVPd.webp",
    available: true,
    components: [],
    maxComponents: 0
  },
  {
    name: "Mini Coxinhas (30 un)",
    description: "Coxinhas crocantes de frango - 30 unidades",
    basePrice: 19.00,
    category: "mini-salgados",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/mini-coxinha-QJsa8SCrJBfgAbYn2LUjm2.webp",
    available: true,
    components: [],
    maxComponents: 0
  },
  {
    name: "Salada de Frutas Gourmet",
    description: "Mix de frutas tropicais frescas com mel",
    basePrice: 16.00,
    category: "salada",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/salada-frutas-N7PFV7rbkfUJF7D7ruSwVz.webp",
    available: true,
    components: [],
    maxComponents: 0
  },
  {
    name: "Tapioca Nutella com Morango",
    description: "Tapioca doce com Nutella e morango fresco",
    basePrice: 18.00,
    category: "tapioca",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/nutella-morango-Sai2sKesLvqSaEKpg4pZFn.webp",
    available: true,
    components: [],
    maxComponents: 0
  },
  {
    name: "Mini Bolinhos de Queijo (30 un)",
    description: "Bolinhos de queijo crocantes - 30 unidades",
    basePrice: 19.00,
    category: "mini-salgados",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/bolinho-queijo-WArwNC4jVx3tyjP8kFnB7c.webp",
    available: true,
    components: [],
    maxComponents: 0
  },
  {
    name: "Açaí 500ml Premium",
    description: "Açaí grande com múltiplos sabores e coberturas",
    basePrice: 28.00,
    category: "acai",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663570217212/3rZFgUivNsiX4XDcsmiSg4/acai-500ml-GUQCxichtVcytqbxUwj76A.webp",
    available: true,
    components: [
      { id: "20", name: "Morango", price: 0, category: "frutas" },
      { id: "21", name: "Banana", price: 0, category: "frutas" },
      { id: "22", name: "Granola", price: 0, category: "toppings" },
      { id: "23", name: "Mel", price: 0, category: "toppings" }
    ],
    maxComponents: 3
  }
];

async function seedProducts() {
  try {
    console.log("Iniciando seed de produtos...");
    const productsCollection = collection(db, "products");
    
    for (const product of products) {
      const docRef = await addDoc(productsCollection, {
        ...product,
        createdAt: Timestamp.now().toMillis(),
        updatedAt: Timestamp.now().toMillis()
      });
      console.log(`✓ Produto criado: ${product.name} (ID: ${docRef.id})`);
    }
    
    console.log("\n✅ Seed concluído com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erro ao fazer seed:", error);
    process.exit(1);
  }
}

seedProducts();
