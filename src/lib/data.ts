import type { Kpi, Product } from "@/types";

export const categories = [
  "Alimentation",
  "Fruits et legumes",
  "Viande et poisson",
  "Electronique",
  "Telephones",
  "Informatique",
  "Habillement",
  "Chaussures",
  "Beaute",
  "Sante",
  "Maison",
  "Construction",
  "Agriculture"
];

export const products: Product[] = [
  { id: "p1", name: "Pack riz premium", category: "Alimentation", seller: "Awa Boutique", city: "Dakar", price: 12500, rating: 4.8, sales: 82, reviews: 34, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=900&auto=format&fit=crop", badge: "Populaire", score: 92 },
  { id: "p2", name: "Panier legumes frais", category: "Fruits et legumes", seller: "Marche Sandaga", city: "Dakar", price: 8500, rating: 4.6, sales: 64, reviews: 22, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=900&auto=format&fit=crop", badge: "Recommande", score: 86 },
  { id: "p3", name: "Smartphone 128 Go", category: "Telephones", seller: "Tech Medina", city: "Thies", price: 145000, rating: 4.7, sales: 31, reviews: 18, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop", badge: "Nouveau", score: 78 },
  { id: "p4", name: "Baskets urbaines", category: "Chaussures", seller: "Style Market", city: "Pikine", price: 22000, rating: 4.5, sales: 55, reviews: 27, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop", badge: "Promo", score: 81 },
  { id: "p5", name: "Kit beaute naturel", category: "Beaute", seller: "Natura Shop", city: "Rufisque", price: 18000, rating: 4.9, sales: 42, reviews: 30, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=900&auto=format&fit=crop", badge: "Top note", score: 89 },
  { id: "p6", name: "Lampe solaire maison", category: "Maison", seller: "Eco Maison", city: "Dakar", price: 15500, rating: 4.4, sales: 39, reviews: 14, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=900&auto=format&fit=crop", badge: "Proche", score: 74 }
];

export const adminKpis: Kpi[] = [
  { label: "Clients", value: "12 480", trend: "+18%" },
  { label: "Vendeurs", value: "1 245", trend: "+9%" },
  { label: "Livreurs", value: "384", trend: "+12%" },
  { label: "Commandes", value: "8 920", trend: "+21%" },
  { label: "CA", value: "84,6M FCFA", trend: "+16%" },
  { label: "Livraisons", value: "7 860", trend: "+19%" }
];

export const sellerKpis: Kpi[] = [
  { label: "Produits", value: "126", trend: "+8" },
  { label: "Commandes", value: "482", trend: "+14%" },
  { label: "Revenus", value: "4,8M FCFA", trend: "+11%" },
  { label: "Note", value: "4.8/5", trend: "+0.2" }
];

export const courierKpis: Kpi[] = [
  { label: "Missions", value: "74", trend: "+13%" },
  { label: "Livrees", value: "69", trend: "93%" },
  { label: "Revenus", value: "276K FCFA", trend: "+17%" },
  { label: "Note", value: "4.7/5", trend: "+0.1" }
];

export const monthlySales = [
  { month: "Jan", ventes: 320, revenus: 4.2 },
  { month: "Fev", ventes: 410, revenus: 5.3 },
  { month: "Mar", ventes: 520, revenus: 6.1 },
  { month: "Avr", ventes: 610, revenus: 7.5 },
  { month: "Mai", ventes: 760, revenus: 8.8 },
  { month: "Juin", ventes: 830, revenus: 9.4 }
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("fr-SN", { style: "currency", currency: "XOF", maximumFractionDigits: 0 }).format(value);
}
