import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true, seller: true, shop: true },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json({
    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category.name,
      seller: product.shop?.name || product.seller.name,
      city: product.city,
      price: product.price,
      rating: product.rating,
      sales: product.sales,
      reviews: product.reviewCount,
      image: product.image,
      badge: product.stock > 0 ? "Disponible" : "Stock bas",
      score: product.score
    }))
  });
}
