# Blackjack AI Trainer (Supabase Edition)

An interactive blackjack trainer app powered by:
- 🧠 **Next.js** (App Router)
- 🔐 **Clerk** (authentication & subscription)
- 🗃 **Supabase** (PostgreSQL + RLS + analytics)
- 🎨 **TailwindCSS** (modern UI)

---

## 🧩 Key Features

- ✅ Basic Strategy Practice with hand feedback
- ✅ Daily limits (free tier), tracked by Supabase
- 🔒 Pro features: unlimited hands, card counting trainer
- 🧠 Hi-Lo card counting drills with feedback
- 📊 Deviation trainer for true count-based adjustments
- 📘 Reference charts built from JSON

---

## 📁 Folder Structure

```bash
/components          → UI Components
/lib                 → Supabase client + game logic
/public/data         → JSON charts (basic strategy, deviations)
/docs                → PRDs and system architecture
/supabase/schema.sql → SQL tables + RLS setup
```

---

## 🛠 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Add Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pk
CLERK_SECRET_KEY=your_clerk_sk
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Dev Server
```bash
npm run dev
```

---

## 🧠 Supabase Schema Setup

In your Supabase SQL editor, paste the contents of `/supabase/schema.sql`.
This will:
- Create tables: `users`, `hand_history`, `drill_sessions`
- Link rows to Clerk user IDs via JWT claim (`sub`)
- Enforce RLS (Row Level Security)

---

## 🔐 Clerk Setup
- Go to [Clerk Dashboard](https://dashboard.clerk.com/)
- Create a new application
- Get your **publishable** and **secret** keys
- Add them to `.env.local`

---

## 📦 JSON Chart Files
- `/public/data/basicStrategy.json`
- `/public/data/countDeviations.json`

Used by `basicStrategy.ts` and `countingLogic.ts` in `/lib/`.

---

## 🧪 Testing
- Navigate to `/practice` to test strategy trainer
- Navigate to `/counting` to test card counting drill

---

## 📘 Docs
All product requirement documents are stored in `/docs/`:
- Basic Strategy Module
- Card Counting System
- Tier System & Monetization
- Charts & Visuals
- Convex-to-Supabase migration (this one)

---

> For any issues, inspect the browser console or Supabase logs.
> Deployment target: [Vercel](https://vercel.com) (auto-connected to GitHub repo).

