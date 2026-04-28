# College Discovery Platform (MVP) 🚀

A production-grade, full-stack college discovery platform built with **Next.js 14**, **Node.js**, **TypeScript**, and **PostgreSQL**.

## 🌟 Core Features

### 1. Advanced Discovery
- **Search & Filter**: Debounced search by name/city with filters for fees, location, and institution type.
- **URL-Synced State**: Share your filtered results easily. Filters are automatically synced with the browser URL.
- **Premium UX**: High-performance UI built with Tailwind CSS and Framer Motion.

### 2. Intelligent Tools
- **Compare Engine**: Side-by-side comparison of up to 3 colleges with "Best Choice" value highlighting for placements and fees.
- **JEE Rank Predictor**: Smart suggestion engine based on AIR cutoffs.

### 3. Personalization
- **User Authentication**: Secure JWT-based login/signup system with password hashing.
- **Saved Colleges**: Bookmark institutions to your personal profile for later tracking and comparison.

### 4. Comprehensive Data
- **Rich Profiles**: Detailed pages showing placement statistics (highest package, % rate), reviews, and courses.
- **Real-time Stats**: Dynamic calculations for average fees and ranking.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, Zustand, React Query |
| **Backend** | Node.js, Express, TypeScript, Zod |
| **Database** | PostgreSQL, Prisma ORM |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |

---

## ⚡ Setup & Installation

### 1. Prerequisites
- Node.js v18+
- PostgreSQL Instance (Local or Cloud like Neon)

### 2. Backend Setup
```bash
cd backend
npm install
# Configure .env with DATABASE_URL and JWT_SECRET
npx prisma generate
npx prisma migrate dev
npm run seed
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Configure .env with NEXT_PUBLIC_API_URL
npm run dev
```

---

## 🌍 Deployment

### Backend (Railway/Render)
1. Link GitHub repository.
2. Set root directory to `backend`.
3. Configure ENV: `DATABASE_URL`, `JWT_SECRET`.

### Frontend (Vercel)
1. Link GitHub repository.
2. Set root directory to `frontend`.
3. Configure ENV: `NEXT_PUBLIC_API_URL`.

---
Built with Clean Architecture & Scalability in mind.
