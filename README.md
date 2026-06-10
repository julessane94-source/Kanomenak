# kanomenak

Marketplace moderne reliant clients, vendeurs, livreurs et administrateurs.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Prisma
- SQLite en developpement
- Auth.js pret a brancher
- Cloudinary, Socket.io, Leaflet, Recharts

## Lancer

```powershell
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev
```

Comptes demo seed :

- admin@kanomenak.com
- vendeur@kanomenak.com
- livreur@kanomenak.com
- client@kanomenak.com

Mot de passe : kanomenak123
