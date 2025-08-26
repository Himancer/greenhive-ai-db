
# GreenHive.ai — DB Edition (Next.js 14 + Prisma + Postgres)

Dynamic plant catalog with filters, image fallbacks, and a rule-based chatbot backed by your database.

## Setup
1) Create a Postgres DB (Neon/Supabase/Railway) and copy your connection string.
2) Set `DATABASE_URL` in `.env` (locally) and in Vercel project settings.

```bash
npm i
cp .env.example .env   # paste your DATABASE_URL
npx prisma db push
npx tsx scripts/seed.ts
npm run dev
```

Routes:
- `GET /api/plants?q=&petSafe=true&difficulty=Easy`
- `POST /api/ask` { q: string }
