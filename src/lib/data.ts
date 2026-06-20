import type { Kpi, Product } from "@/types";

export type Partner = {
  type: "Pharmacies" | "Boulangeries";
  slug: string;
  name: string;
  city: string;
  description: string;
  rating: number;
  image: string;
};

export type AvailableCourier = {
  id: string;
  name: string;
  city: string;
  zone: string;
  phone: string;
  rating: number;
  deliveries: number;
  fee: number;
  eta: string;
  available: boolean;
};

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
  "Pharmacies",
  "Boulangeries",
  "Maison",
  "Construction",
  "Agriculture"
];

export const products: Product[] = [
  { id: "p1", name: "Pack riz premium", description: "Riz local selectionne, ideal pour les achats familiaux.", category: "Alimentation", seller: "Awa Boutique", city: "Dakar", price: 12500, rating: 4.8, sales: 82, reviews: 34, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=900&auto=format&fit=crop", badge: "Populaire", score: 92 },
  { id: "p2", name: "Panier legumes frais", description: "Assortiment de legumes frais pour cuisine quotidienne.", category: "Fruits et legumes", seller: "Marche Sandaga", city: "Dakar", price: 8500, rating: 4.6, sales: 64, reviews: 22, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=900&auto=format&fit=crop", badge: "Recommande", score: 86 },
  { id: "p3", name: "Smartphone 128 Go", description: "Telephone debloque, stockage 128 Go, bon rapport qualite-prix.", category: "Telephones", seller: "Tech Medina", city: "Thies", price: 145000, rating: 4.7, sales: 31, reviews: 18, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop", badge: "Nouveau", score: 78 },
  { id: "p4", name: "Baskets urbaines", description: "Chaussures confortables pour ville et marche quotidien.", category: "Chaussures", seller: "Style Market", city: "Pikine", price: 22000, rating: 4.5, sales: 55, reviews: 27, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=900&auto=format&fit=crop", badge: "Promo", score: 81 },
  { id: "p5", name: "Kit beaute naturel", description: "Selection de soins naturels pour routine personnelle.", category: "Beaute", seller: "Natura Shop", city: "Rufisque", price: 18000, rating: 4.9, sales: 42, reviews: 30, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=900&auto=format&fit=crop", badge: "Top note", score: 89 },
  { id: "p6", name: "Lampe solaire maison", description: "Lampe solaire pratique pour maison, boutique ou cour.", category: "Maison", seller: "Eco Maison", city: "Dakar", price: 15500, rating: 4.4, sales: 39, reviews: 14, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=900&auto=format&fit=crop", badge: "Proche", score: 74 },
  { id: "p7", name: "Trousse premiers soins", description: "Kit pharmacie avec pansements, antiseptique et essentiels de secours.", category: "Pharmacies", seller: "Pharmacie Plateau", city: "Dakar", price: 9500, rating: 4.8, sales: 28, reviews: 16, image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=900&auto=format&fit=crop", badge: "Sante", score: 88 },
  { id: "p8", name: "Gel antiseptique familial", description: "Solution d'hygiene pour maison, bureau et commerce.", category: "Pharmacies", seller: "Pharmacie Plateau", city: "Dakar", price: 4200, rating: 4.7, sales: 44, reviews: 19, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=900&auto=format&fit=crop", badge: "Disponible", score: 85 },
  { id: "p9", name: "Pack hygiene sante", description: "Produits courants de pharmacie a utiliser selon conseil professionnel.", category: "Pharmacies", seller: "Pharmacie Sedhiou", city: "Sedhiou", price: 7800, rating: 4.6, sales: 22, reviews: 11, image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=900&auto=format&fit=crop", badge: "Sedhiou", score: 82 },
  { id: "p10", name: "Pack pains frais", description: "Selection de pains frais pour famille, boutique ou petit dejeuner.", category: "Boulangeries", seller: "Boulangerie Medina", city: "Dakar", price: 3500, rating: 4.7, sales: 73, reviews: 21, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop", badge: "Frais", score: 91 },
  { id: "p11", name: "Baguettes artisanales", description: "Baguettes croustillantes preparees le matin.", category: "Boulangeries", seller: "Boulangerie Medina", city: "Dakar", price: 2500, rating: 4.8, sales: 96, reviews: 33, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=900&auto=format&fit=crop", badge: "Chaud", score: 90 },
  { id: "p12", name: "Viennoiseries du matin", description: "Assortiment de croissants et pains au lait pour livraison locale.", category: "Boulangeries", seller: "Fournil Sedhiou", city: "Sedhiou", price: 4800, rating: 4.6, sales: 41, reviews: 15, image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=900&auto=format&fit=crop", badge: "Local", score: 84 }
];

export const partners: Partner[] = [
  { type: "Pharmacies", slug: "pharmacie-plateau", name: "Pharmacie Plateau", city: "Dakar", description: "Pharmacie enrolee avec produits de premiers soins, hygiene et commandes rapides.", rating: 4.8, image: "https://images.unsplash.com/photo-1580281657527-47f249e8f4df?q=80&w=1200&auto=format&fit=crop" },
  { type: "Pharmacies", slug: "pharmacie-sedhiou", name: "Pharmacie Sedhiou", city: "Sedhiou", description: "Point sante local pour les produits courants disponibles sur Nafaa.", rating: 4.6, image: "https://images.unsplash.com/photo-1576765608866-5b51046452be?q=80&w=1200&auto=format&fit=crop" },
  { type: "Boulangeries", slug: "boulangerie-medina", name: "Boulangerie Medina", city: "Dakar", description: "Boulangerie enrolee pour pains frais, baguettes et commandes du matin.", rating: 4.7, image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1200&auto=format&fit=crop" },
  { type: "Boulangeries", slug: "fournil-sedhiou", name: "Fournil Sedhiou", city: "Sedhiou", description: "Fournil local avec pains et viennoiseries disponibles en livraison.", rating: 4.6, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop" }
];

export const availableCouriers: AvailableCourier[] = [
  { id: "courier-moussa", name: "Moussa Livraison", city: "Dakar", zone: "Plateau - Medina", phone: "+221765554010", rating: 4.7, deliveries: 69, fee: 1500, eta: "12 min", available: true },
  { id: "courier-fatou", name: "Fatou Express", city: "Dakar", zone: "Almadies - Ngor", phone: "+221771112233", rating: 4.8, deliveries: 104, fee: 2000, eta: "18 min", available: true },
  { id: "courier-ibra", name: "Ibra Sedhiou Courses", city: "Sedhiou", zone: "Sedhiou centre", phone: "+221775335320", rating: 4.6, deliveries: 37, fee: 1200, eta: "15 min", available: true },
  { id: "courier-aminata", name: "Aminata Livraison", city: "Dakar", zone: "Pikine - Thiaroye", phone: "+221778851691", rating: 4.5, deliveries: 52, fee: 1800, eta: "22 min", available: false }
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

export const platformUsers = [
  { role: "ADMIN", count: 2 },
  { role: "VENDEUR", count: 1 },
  { role: "LIVREUR", count: 1 },
  { role: "CLIENT", count: 1 }
];

export const orders = [
  { code: "KMK-0001", status: "En livraison", total: 14000, payment: "Paiement a la livraison" },
  { code: "KMK-0004", status: "En preparation", total: 23500, payment: "Wave" }
];

export function getPlatformStats() {
  const totalProducts = products.length;
  const totalSales = products.reduce((sum, product) => sum + product.sales, 0);
  const revenue = products.reduce((sum, product) => sum + product.sales * product.price, 0);
  const averageRating = products.reduce((sum, product) => sum + product.rating, 0) / products.length;

  return {
    clients: platformUsers.find((user) => user.role === "CLIENT")?.count || 0,
    sellers: platformUsers.find((user) => user.role === "VENDEUR")?.count || 0,
    couriers: platformUsers.find((user) => user.role === "LIVREUR")?.count || 0,
    products: totalProducts,
    orders: orders.length,
    revenue,
    deliveries: orders.filter((order) => order.status.includes("livraison")).length,
    totalSales,
    averageRating
  };
}

export function getAdminKpis(): Kpi[] {
  const stats = getPlatformStats();
  return [
    { label: "Clients", value: String(stats.clients), trend: "actif" },
    { label: "Vendeurs", value: String(stats.sellers), trend: "verifies" },
    { label: "Livreurs", value: String(stats.couriers), trend: "disponible" },
    { label: "Produits", value: String(stats.products), trend: "catalogue" },
    { label: "Commandes", value: String(stats.orders), trend: "en cours" },
    { label: "CA", value: formatPrice(stats.revenue), trend: "ventes" }
  ];
}

export function getSellerKpis(): Kpi[] {
  const sellerProducts = products.filter((product) => product.seller === "Awa Boutique");
  const revenue = sellerProducts.reduce((sum, product) => sum + product.sales * product.price, 0);
  const sales = sellerProducts.reduce((sum, product) => sum + product.sales, 0);
  const rating = sellerProducts.reduce((sum, product) => sum + product.rating, 0) / sellerProducts.length;
  return [
    { label: "Produits", value: String(sellerProducts.length), trend: "publies" },
    { label: "Ventes", value: String(sales), trend: "total" },
    { label: "Revenus", value: formatPrice(revenue), trend: "brut" },
    { label: "Note", value: rating.toFixed(1) + "/5", trend: "clients" }
  ];
}

export function getCourierKpis(): Kpi[] {
  const activeDeliveries = orders.filter((order) => order.status.includes("livraison")).length;
  return [
    { label: "Missions", value: String(orders.length), trend: "assignees" },
    { label: "Actives", value: String(activeDeliveries), trend: "GPS" },
    { label: "Revenus", value: formatPrice(activeDeliveries * 1500), trend: "estime" },
    { label: "Note", value: "4.7/5", trend: "clients" }
  ];
}

export function getComparableOffers(product: Product) {
  const multipliers = [1, 0.96, 1.08, 1.14];
  const sellers = [product.seller, "Marche Sandaga", "Boutique Medina", "Express Local"];
  const cities = [product.city, "Dakar", "Thies", "Pikine"];
  return sellers.map((seller, index) => ({
    seller,
    city: cities[index],
    price: Math.round(product.price * multipliers[index]),
    rating: Math.max(4.1, product.rating - index * 0.1),
    delivery: index === 0 ? "Aujourd'hui" : "24h"
  })).sort((a, b) => a.price - b.price);
}
