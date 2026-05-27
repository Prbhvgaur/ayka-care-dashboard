# AYKA Care Dashboard

> Enterprise healthcare dashboard built with Next.js, TypeScript, Tailwind CSS, React Query, and JWT auth.

##  Features

-  Secure demo authentication with JWT, httpOnly cookies, SameSite protection, and rate limiting
-  Executive dashboard with animated KPIs, activity area chart, and task status donut chart
-  User directory with debounced search, filters, sort, table/grid views, and pagination
-  Care operations task board with Kanban + list views and validated task creation modal
-  Product catalog with search, filters, loading states, and responsive product cards
-  Responsive design system with light/dark theming, accent controls, and polished empty/loading states
-  Security-first API layer with Zod validation, sanitization, cache headers, and protected routes

##  Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack React Query
- Zustand
- React Hook Form + Zod
- Radix UI primitives
- Recharts
- Lucide React
- Vercel

##  Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create local environment variables:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) and sign in with the demo credentials below.

##  Demo Credentials

Email: `admin@aykacare.in`  
Password: `Admin@123`

## Project Structure

```text
src
├── app
│   ├── (auth)/login
│   ├── (dashboard)/dashboard
│   ├── (dashboard)/users
│   ├── (dashboard)/tasks
│   ├── (dashboard)/settings
│   ├── api/auth
│   ├── api/users
│   ├── api/tasks
│   └── api/stats
├── components
│   ├── dashboard
│   ├── layout
│   ├── tasks
│   ├── ui
│   └── users
├── data
├── hooks
├── lib
├── store
└── types
```

##  Security

- JWT session token stored in an httpOnly cookie
- SameSite=Strict CSRF cookie
- Rate limiting on login requests
- Zod validation for auth, filters, profile data, and task creation
- Sanitized request inputs
- Security headers and CSP configured in `next.config.ts`
- Route protection through `src/proxy.ts`

##  API Endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Authenticate demo admin and issue session |
| `POST` | `/api/auth/logout` | Clear session + CSRF cookies |
| `GET` | `/api/users` | Filtered, sorted, paginated user directory |
| `GET` | `/api/tasks` | Filtered, paginated task board data |
| `GET` | `/api/products` | Filtered, paginated product catalog data |
| `POST` | `/api/tasks` | Create a validated task record |
| `GET` | `/api/stats` | Dashboard KPI, chart, and summary data |

##  Deployment

1. Push the repository to GitHub.
2. Run `vercel` to link the project.
3. Add the production environment variables:
   - `JWT_SECRET`
   - `NEXT_PUBLIC_APP_URL`
   - `NEXT_PUBLIC_APP_NAME`
4. Deploy with:

```bash
vercel --prod
```
