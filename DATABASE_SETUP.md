# Base de donnees Nafaa

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

## Production Vercel avec Neon

Renseigner `DATABASE_URL` avec l'URL Neon pooled (hostname avec `-pooler`) et `DIRECT_URL` avec l'URL directe Neon (hostname sans `-pooler`).
Executer ensuite `npm run db:init` avec ces variables pour creer les tables et les comptes seed dans la base en ligne.

Comptes seed :
- Admin : `julessane94@gmail.com` / `Baye1994@`
- Vendeur : `vendeur@nafaa.com` / `nafaa123`
- Livreur : `livreur@nafaa.com` / `nafaa123`
- Client : `client@nafaa.com` / `nafaa123`
