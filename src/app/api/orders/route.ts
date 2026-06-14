import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";

const orderSchema = z.object({
  clientId: z.string().optional(),
  items: z.array(z.object({ productId: z.string(), quantity: z.number().min(1), seller: z.string().optional(), price: z.number().optional() })),
  paymentMethod: z.enum(["WAVE", "ORANGE_MONEY", "CASH_ON_DELIVERY"]),
  address: z.string().min(3)
});

export async function POST(request: Request) {
  const payload = orderSchema.parse(await request.json());
  const session = await getSession();
  if (!session.userId) return NextResponse.json({ error: "Connexion requise" }, { status: 401 });

  const productIds = payload.items.map((item) => item.productId);
  const products = await prisma.product.findMany({ where: { id: { in: productIds } }, include: { seller: true } });
  if (products.length !== productIds.length) return NextResponse.json({ error: "Produit introuvable" }, { status: 400 });

  const total = payload.items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId)!;
    return sum + product.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      code: `KMK-${Date.now().toString().slice(-6)}`,
      clientId: session.userId,
      paymentMethod: payload.paymentMethod,
      address: payload.address,
      total,
      items: {
        create: payload.items.map((item) => {
          const product = products.find((entry) => entry.id === item.productId)!;
          return { productId: product.id, quantity: item.quantity, unitPrice: product.price };
        })
      }
    },
    include: { items: { include: { product: true } } }
  });

  const sellerIds = Array.from(new Set(order.items.map((item) => item.product.sellerId)));
  await prisma.notification.createMany({
    data: sellerIds.map((sellerId) => ({ userId: sellerId, role: "VENDEUR", title: "Nouvelle commande", body: `Commande ${order.code} a preparer.` }))
  });

  return NextResponse.json({ code: order.code, status: order.status, total: order.total, notifiedSellers: sellerIds.length }, { status: 201 });
}
