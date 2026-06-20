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
  { name: "Gel antiseptique familial", description: "Solution d'hygiene pour maison, bureau et commerce.", category: "Pharmacies", price: 4200, stock: 45, city: "Dakar", sales: 44, rating: 4.7, reviewCount: 19, score: 85, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=900&auto=format&fit=crop" },
  { name: "Pack hygiene sante", description: "Produits courants de pharmacie a utiliser selon conseil professionnel.", category: "Pharmacies", price: 7800, stock: 24, city: "Sedhiou", sales: 22, rating: 4.6, reviewCount: 11, score: 82, image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=900&auto=format&fit=crop" },
  { name: "Pack pains frais", description: "Selection de pains frais pour famille, boutique ou petit dejeuner.", category: "Boulangeries", price: 3500, stock: 80, city: "Dakar", sales: 73, rating: 4.7, reviewCount: 21, score: 91, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=900&auto=format&fit=crop" },
  { name: "Baguettes artisanales", description: "Baguettes croustillantes preparees le matin.", category: "Boulangeries", price: 2500, stock: 90, city: "Dakar", sales: 96, rating: 4.8, reviewCount: 33, score: 90, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=900&auto=format&fit=crop" },
  { name: "Viennoiseries du matin", description: "Assortiment de croissants et pains au lait pour livraison locale.", category: "Boulangeries", price: 4800, stock: 48, city: "Sedhiou", sales: 41, rating: 4.6, reviewCount: 15, score: 84, image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=900&auto=format&fit=crop" }
];

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  const defaultPassword = await bcrypt.hash("nafaa123", 10);
  const adminPassword = await bcrypt.hash("Baye1994@", 10);

  const admin = await prisma.user.upsert({
    where: { email: "julessane94@gmail.com" },
    update: { password: adminPassword, role: Role.ADMIN },
    create: { name: "Jules Sane", email: "julessane94@gmail.com", password: adminPassword, role: Role.ADMIN, city: "Dakar" }
  });
  await prisma.user.upsert({
    where: { email: "admin@nafaa.com" },
    update: {},
    create: { name: "Admin Nafaa", email: "admin@nafaa.com", password: defaultPassword, role: Role.ADMIN, city: "Dakar" }
  });
  const vendeur = await prisma.user.upsert({
    where: { email: "vendeur@nafaa.com" },
    update: {},
    create: { name: "Awa Boutique", email: "vendeur@nafaa.com", password: defaultPassword, role: Role.VENDEUR, city: "Dakar", rating: 4.8 }
  });
  const livreur = await prisma.user.upsert({
    where: { email: "livreur@nafaa.com" },
    update: {},
    create: { name: "Moussa Livraison", email: "livreur@nafaa.com", password: defaultPassword, role: Role.LIVREUR, city: "Dakar", rating: 4.7, isAvailable: true }
  });
  const client = await prisma.user.upsert({
    where: { email: "client@nafaa.com" },
    update: {},
    create: { name: "Client Demo", email: "client@nafaa.com", password: defaultPassword, role: Role.CLIENT, city: "Dakar" }
  });
  const pharmacie = await prisma.user.upsert({
    where: { email: "pharmacie@nafaa.com" },
    update: { accountType: "PHARMACIE" },
    create: { name: "Pharmacie Plateau", email: "pharmacie@nafaa.com", password: defaultPassword, role: Role.VENDEUR, accountType: "PHARMACIE", city: "Dakar", phone: "+221778851691", rating: 4.8 }
  });
  const boulangerie = await prisma.user.upsert({
    where: { email: "boulangerie@nafaa.com" },
    update: { accountType: "BOULANGERIE" },
    create: { name: "Boulangerie Medina", email: "boulangerie@nafaa.com", password: defaultPassword, role: Role.VENDEUR, accountType: "BOULANGERIE", city: "Dakar", phone: "+221775335320", rating: 4.7 }
  });

  for (const name of categoryNames) {
    await prisma.category.upsert({ where: { slug: slugify(name) }, update: { name }, create: { name, slug: slugify(name) } });
  }

  const shop = await prisma.shop.upsert({
    where: { slug: "awa-boutique" },
    update: {},
    create: { name: "Awa Boutique", slug: "awa-boutique", description: "Produits frais et articles populaires du marche urbain.", city: "Dakar", ownerId: vendeur.id }
  });
  await prisma.shop.upsert({
    where: { slug: "pharmacie-plateau" },
    update: {},
    create: { name: "Pharmacie Plateau", slug: "pharmacie-plateau", description: "Pharmacie enrolee par l'administration Nafaa.", city: "Dakar", ownerId: pharmacie.id }
  });
  await prisma.shop.upsert({
    where: { slug: "boulangerie-medina" },
    update: {},
    create: { name: "Boulangerie Medina", slug: "boulangerie-medina", description: "Boulangerie enrolee par l'administration Nafaa.", city: "Dakar", ownerId: boulangerie.id }
  });

  for (const product of productSeeds) {
    const category = await prisma.category.findUniqueOrThrow({ where: { slug: slugify(product.category) } });
    const { category: _categoryName, ...productData } = product;
    await prisma.product.upsert({
      where: { id: slugify(product.name) },
      update: { ...productData, categoryId: category.id, sellerId: vendeur.id, shopId: shop.id },
      create: { id: slugify(product.name), ...productData, categoryId: category.id, sellerId: vendeur.id, shopId: shop.id }
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
    data: { userId: admin.id, role: Role.ADMIN, title: "Plateforme initialisee", body: "Base PostgreSQL Nafaa prete." }
  });

  console.log("Seed PostgreSQL Nafaa termine.");
}

main().finally(async () => prisma.$disconnect());
