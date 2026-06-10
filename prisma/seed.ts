import { PrismaClient, Role, PaymentMethod } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("kanomenak123", 10);
  const [admin, vendeur, livreur, client] = await Promise.all([
    prisma.user.upsert({ where: { email: "admin@kanomenak.com" }, update: {}, create: { name: "Admin Kanomenak", email: "admin@kanomenak.com", password, role: Role.ADMIN, city: "Dakar" } }),
    prisma.user.upsert({ where: { email: "vendeur@kanomenak.com" }, update: {}, create: { name: "Awa Boutique", email: "vendeur@kanomenak.com", password, role: Role.VENDEUR, city: "Dakar", rating: 4.8 } }),
    prisma.user.upsert({ where: { email: "livreur@kanomenak.com" }, update: {}, create: { name: "Moussa Livraison", email: "livreur@kanomenak.com", password, role: Role.LIVREUR, city: "Dakar", rating: 4.7 } }),
    prisma.user.upsert({ where: { email: "client@kanomenak.com" }, update: {}, create: { name: "Client Demo", email: "client@kanomenak.com", password, role: Role.CLIENT, city: "Dakar" } })
  ]);

  const categories = ["Alimentation", "Fruits et legumes", "Electronique", "Telephones", "Habillement", "Beaute", "Maison"];
  for (const name of categories) {
    await prisma.category.upsert({ where: { slug: name.toLowerCase().replaceAll(" ", "-") }, update: {}, create: { name, slug: name.toLowerCase().replaceAll(" ", "-") } });
  }

  const alimentation = await prisma.category.findUniqueOrThrow({ where: { slug: "alimentation" } });
  const shop = await prisma.shop.upsert({
    where: { slug: "awa-boutique" },
    update: {},
    create: { name: "Awa Boutique", slug: "awa-boutique", description: "Produits frais et articles populaires du marche urbain.", city: "Dakar", ownerId: vendeur.id }
  });

  await prisma.product.createMany({
    data: [
      { name: "Pack riz premium", description: "Riz local de qualite pour famille.", price: 12500, image: "/products/riz.jpg", stock: 40, city: "Dakar", sales: 82, rating: 4.8, reviewCount: 34, score: 92, sellerId: vendeur.id, shopId: shop.id, categoryId: alimentation.id },
      { name: "Panier legumes", description: "Legumes frais selectionnes au marche.", price: 8500, image: "/products/legumes.jpg", stock: 25, city: "Thies", sales: 64, rating: 4.6, reviewCount: 22, score: 86, sellerId: vendeur.id, shopId: shop.id, categoryId: alimentation.id }
    ],
    skipDuplicates: true
  });

  const product = await prisma.product.findFirstOrThrow();
  await prisma.order.upsert({
    where: { code: "KMK-0001" },
    update: {},
    create: {
      code: "KMK-0001",
      paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
      total: product.price,
      address: "Plateau, Dakar",
      clientId: client.id,
      items: { create: [{ productId: product.id, quantity: 1, unitPrice: product.price }] },
      delivery: { create: { fee: 1500, courierId: livreur.id, status: "ASSIGNED" } }
    }
  });

  console.log("Seed kanomenak termine.");
}

main().finally(async () => prisma.$disconnect());
