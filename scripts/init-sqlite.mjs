import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";

const dbPath = path.join(process.cwd(), "dev.db");
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

const db = new DatabaseSync(dbPath);

db.exec(`
PRAGMA foreign_keys = ON;

CREATE TABLE User (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'CLIENT',
  city TEXT,
  phone TEXT,
  authProvider TEXT NOT NULL DEFAULT 'credentials',
  passwordUpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  rating REAL NOT NULL DEFAULT 0,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Shop (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  city TEXT NOT NULL,
  ownerId TEXT NOT NULL UNIQUE,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ownerId) REFERENCES User(id)
);

CREATE TABLE Category (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE Product (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  image TEXT NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  city TEXT NOT NULL,
  sales INTEGER NOT NULL DEFAULT 0,
  rating REAL NOT NULL DEFAULT 0,
  reviewCount INTEGER NOT NULL DEFAULT 0,
  score REAL NOT NULL DEFAULT 0,
  sellerId TEXT NOT NULL,
  shopId TEXT,
  categoryId TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sellerId) REFERENCES User(id),
  FOREIGN KEY (shopId) REFERENCES Shop(id),
  FOREIGN KEY (categoryId) REFERENCES Category(id)
);

CREATE TABLE "Order" (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'PENDING',
  paymentMethod TEXT NOT NULL,
  total INTEGER NOT NULL,
  address TEXT NOT NULL,
  clientId TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (clientId) REFERENCES User(id)
);

CREATE TABLE OrderItem (
  id TEXT PRIMARY KEY,
  quantity INTEGER NOT NULL,
  unitPrice INTEGER NOT NULL,
  orderId TEXT NOT NULL,
  productId TEXT NOT NULL,
  FOREIGN KEY (orderId) REFERENCES "Order"(id),
  FOREIGN KEY (productId) REFERENCES Product(id)
);

CREATE TABLE Delivery (
  id TEXT PRIMARY KEY,
  fee INTEGER NOT NULL,
  currentLat REAL,
  currentLng REAL,
  orderId TEXT NOT NULL UNIQUE,
  courierId TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'ASSIGNED',
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (orderId) REFERENCES "Order"(id),
  FOREIGN KEY (courierId) REFERENCES User(id)
);

CREATE TABLE Review (
  id TEXT PRIMARY KEY,
  rating INTEGER NOT NULL,
  comment TEXT NOT NULL,
  productId TEXT,
  authorId TEXT NOT NULL,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES Product(id),
  FOREIGN KEY (authorId) REFERENCES User(id)
);

CREATE TABLE Report (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  priority TEXT NOT NULL DEFAULT 'NORMAL',
  status TEXT NOT NULL DEFAULT 'OPEN',
  reporterId TEXT,
  reporterRole TEXT,
  pageUrl TEXT,
  createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`);

const insertUser = db.prepare("INSERT INTO User (id, name, email, password, role, city, rating) VALUES (?, ?, ?, ?, ?, ?, ?)");
insertUser.run("u_admin", "Admin Kanomenak", "admin@kanomenak.com", "kanomenak123", "ADMIN", "Dakar", 0);
insertUser.run("u_jules", "Jules Sane", "julessane94@gmail.com", "Baye1994@", "ADMIN", "Dakar", 0);
insertUser.run("u_vendor", "Awa Boutique", "vendeur@kanomenak.com", "kanomenak123", "VENDEUR", "Dakar", 4.8);
insertUser.run("u_courier", "Moussa Livraison", "livreur@kanomenak.com", "kanomenak123", "LIVREUR", "Dakar", 4.7);
insertUser.run("u_client", "Client Demo", "client@kanomenak.com", "kanomenak123", "CLIENT", "Dakar", 0);

db.prepare("INSERT INTO Shop (id, name, slug, description, city, ownerId) VALUES (?, ?, ?, ?, ?, ?)")
  .run("s_awa", "Awa Boutique", "awa-boutique", "Produits frais et articles populaires du marche urbain.", "Dakar", "u_vendor");

const categories = ["Alimentation", "Fruits et legumes", "Electronique", "Telephones", "Habillement", "Beaute", "Maison"];
const insertCategory = db.prepare("INSERT INTO Category (id, name, slug) VALUES (?, ?, ?)");
for (const name of categories) {
  insertCategory.run("c_" + name.toLowerCase().replaceAll(" ", "_"), name, name.toLowerCase().replaceAll(" ", "-"));
}

const insertProduct = db.prepare("INSERT INTO Product (id, name, description, price, image, stock, city, sales, rating, reviewCount, score, sellerId, shopId, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
insertProduct.run("p_riz", "Pack riz premium", "Riz local de qualite pour famille.", 12500, "/products/riz.jpg", 40, "Dakar", 82, 4.8, 34, 92, "u_vendor", "s_awa", "c_alimentation");
insertProduct.run("p_legumes", "Panier legumes", "Legumes frais selectionnes au marche.", 8500, "/products/legumes.jpg", 25, "Thies", 64, 4.6, 22, 86, "u_vendor", "s_awa", "c_alimentation");

db.prepare('INSERT INTO "Order" (id, code, paymentMethod, total, address, clientId) VALUES (?, ?, ?, ?, ?, ?)')
  .run("o_0001", "KMK-0001", "CASH_ON_DELIVERY", 12500, "Plateau, Dakar", "u_client");
db.prepare("INSERT INTO OrderItem (id, quantity, unitPrice, orderId, productId) VALUES (?, ?, ?, ?, ?)")
  .run("oi_0001", 1, 12500, "o_0001", "p_riz");
db.prepare("INSERT INTO Delivery (id, fee, orderId, courierId, status) VALUES (?, ?, ?, ?, ?)")
  .run("d_0001", 1500, "o_0001", "u_courier", "ASSIGNED");

db.close();
console.log("Base SQLite creee:", dbPath);
