# Base de donnees kanomenak

La plateforme est maintenant configuree pour PostgreSQL via Prisma.

## Local

1. Demarrer PostgreSQL :

```powershell
docker compose up -d
```

2. Creer les tables :

```powershell
npx prisma db push
```

3. Ajouter les donnees initiales :

```powershell
npm run db:seed
```

4. Lancer l'application :

```powershell
npm run dev
```

## Production Vercel

Renseigner `DATABASE_URL` avec une base PostgreSQL hebergee, par exemple Neon, Supabase, Railway ou Vercel Postgres.

Comptes seed :
- Admin : `julessane94@gmail.com` / `Baye1994@`
- Vendeur : `vendeur@kanomenak.com` / `kanomenak123`
- Livreur : `livreur@kanomenak.com` / `kanomenak123`
- Client : `client@kanomenak.com` / `kanomenak123`
