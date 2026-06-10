export type Role = "admin" | "vendeur" | "livreur" | "client";

export type Product = {
  id: string;
  name: string;
  category: string;
  seller: string;
  city: string;
  price: number;
  rating: number;
  sales: number;
  reviews: number;
  image: string;
  badge: string;
  score: number;
};

export type Kpi = {
  label: string;
  value: string;
  trend: string;
};
