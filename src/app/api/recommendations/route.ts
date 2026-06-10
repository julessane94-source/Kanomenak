import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export function GET() {
  const ranked = products
    .map((product) => ({
      ...product,
      recommendationScore: Math.round(product.sales * 0.4 + product.rating * 20 * 0.3 + product.reviews * 0.2 + product.score * 0.1)
    }))
    .sort((a, b) => b.recommendationScore - a.recommendationScore);

  return NextResponse.json({ products: ranked });
}
