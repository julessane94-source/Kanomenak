import { PrismaClient, Role, PaymentMethod } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categoryNames = [
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

const productSeeds = [
  { name: "Pack riz premium", description: "Riz local selectionne, ideal pour les achats familiaux.", category: "Alimentation", price: 12500, stock: 40, city: "Dakar", sales: 82, rating: 4.8, reviewCount: 34, score: 92, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=900&auto=format&fit=crop" },
  { name: "Panier legumes frais", description: "Assortiment de legumes frais pour cuisine quotidienne.", category: "Fruits et legumes", price: 8500, stock: 25, city: "Dakar", sales: 64, rating: 4.6, reviewCount: 22, score: 86, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=900&auto=format&fit=crop" },
  { name: "Smartphone 128 Go", description: "Telephone debloque, stockage 128 Go.", category: "Telephones", price: 145000, stock: 12, city: "Thies", sales: 31, rating: 4.7, reviewCount: 18, score: 78, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=900&auto=format&fit=crop" },
  { name: "Trousse premiers soins", description: "Kit pharmacie avec pansements, antiseptique et essentiels de secours.", category: "Pharmacies", price: 9500, stock: 30, city: "Dakar", sales: 28, rating: 4.8, reviewCount: 16, score: 88, image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?q=80&w=900&auto=format&fit=crop" },
  { name: "Pack pains frais", description: "Selection de pains frais pour famille, boutique ou petit dejeuner.", category: "Boulangeries", price: 3500, stock: 80, city: "Dakar", sales: 73, rating: 4.7, reviewCount: 21, score: 91, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop" }
];

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  const defaultPassword = await bcrypt.hash("kanomenak123", 10);
  const adminPassword = await bcrypt.hash("Baye1994@", 10);

  const admin = await prisma.user.upsert({
    where: { email: "julessane94@gmail.com" },
    update: { password: adminPassword, role: Role.ADMIN },
    create: { name: "Jules Sane", email: "julessane94@gmail.com", password: adminPassword, role: Role.ADMIN, city: "Dakar" }
  });
  await prisma.user.upsert({
    where: { email: "admin@kanomenak.com" },
    update: {},
    create: { name: "Admin Kanomenak", email: "admin@kanomenak.com", password: defaultPassword, role: Role.ADMIN, city: "Dakar" }
  });
  const vendeur = await prisma.user.upsert({
    where: { email: "vendeur@kanomenak.com" },
    update: {},
    create: { name: "Awa Boutique", email: "vendeur@kanomenak.com", password: defaultPassword, role: Role.VENDEUR, city: "Dakar", rating: 4.8 }
  });
  const livreur = await prisma.user.upsert({
    where: { email: "livreur@kanomenak.com" },
    update: {},
    create: { name: "Moussa Livraison", email: "livreur@kanomenak.com", password: defaultPassword, role: Role.LIVREUR, city: "Dakar", rating: 4.7 }
  });
  const client = await prisma.user.upsert({
    where: { email: "client@kanomenak.com" },
    update: {},
    create: { name: "Client Demo", email: "client@kanomenak.com", password: defaultPassword, role: Role.CLIENT, city: "Dakar" }
  });

  for (const name of categoryNames) {
    await prisma.category.upsert({ where: { slug: slugify(name) }, update: { name }, create: { name, slug: slugify(name) } });
  }

  const shop = await prisma.shop.upsert({
    where: { slug: "awa-boutique" },
    update: {},
    create: { name: "Awa Boutique", slug: "awa-boutique", description: "Produits frais et articles populaires du marche urbain.", city: "Dakar", ownerId: vendeur.id }
  });

  for (const product of productSeeds) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: slugify(product.category) } });
    await prisma.product.upsert({
      where: { id: slugify(product.name) },
      update: { ...product, categoryId: category.id, sellerId: vendeur.id, shopId: shop.id },
      create: { id: slugify(product.name), ...product, categoryId: category.id, sellerId: vendeur.id, shopId: shop.id }
    });
  }

  const firstProduct = await prisma.product.findFirstOrThrow();
  await prisma.order.upsert({
    where: { code: "KMK-0001" },
    update: {},
    create: {
      code: "KMK-0001",
      paymentMethod: PaymentMethod.CASH_ON_DELIVERY,
      total: firstProduct.price,
      address: "Plateau, Dakar",
      clientId: client.id,
      items: { create: [{ productId: firstProduct.id, quantity: 1, unitPrice: firstProduct.price }] },
      delivery: { create: { fee: 1500, courierId: livreur.id, status: "ASSIGNED" } }
    }
  });

  await prisma.notification.create({
    data: { userId: admin.id, role: Role.ADMIN, title: "Plateforme initialisee", body: "Base PostgreSQL kanomenak prete." }
  });

  console.log("Seed PostgreSQL kanomenak termine.");
}

main().finally(async () => prisma.$disconnect());
