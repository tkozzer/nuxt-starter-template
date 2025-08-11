# Nuxt Starter Template

A comprehensive **Nuxt 3** template with modern development tools, state management, database integration, and TypeScript support. This template provides everything you need to build scalable, production-ready web applications.

## 🚀 Included Features & Components

### ✅ **Core Framework**

- **[Nuxt 3.17.4](https://nuxt.com/docs)** - Full-stack Vue.js framework with SSR, auto-imports, and file-based routing

### ✅ **Database & ORM**

- **[Drizzle ORM 0.44.2](https://orm.drizzle.team/)** - TypeScript ORM with SQL-like syntax and excellent TypeScript support
- **[Drizzle Kit 0.31.1](https://orm.drizzle.team/kit-docs/overview)** - CLI companion for schema management, migrations, and introspection
- **[PostgreSQL](https://www.postgresql.org/)** - Robust, open-source relational database
- **[@supabase/supabase-js 2.50.0](https://supabase.com/docs/reference/javascript)** - Supabase client for authentication, real-time, and storage

### ✅ **UI & Styling**

- **[shadcn-nuxt 2.2.0](https://www.shadcn-vue.com/)** - Vue port of shadcn/ui components with Reka UI and Tailwind CSS
- **[Tailwind CSS 4.1.8](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[@tailwindcss/vite 4.1.8](https://tailwindcss.com/docs/installation/using-vite)** - Official Tailwind CSS integration for Vite
- **[@nuxtjs/color-mode 3.5.2](https://color-mode.nuxtjs.org/)** - Dark/light mode with auto detection and system preference support
- **[@nuxt/icon 1.13.0](https://nuxt.com/modules/icon)** - Access to 200,000+ icons from Iconify with SSR support
- **[@iconify-json/lucide](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[@iconify-json/simple-icons](https://simpleicons.org/)** - Popular brand icons

### ✅ **State Management**

- **[Pinia 3.0.3](https://pinia.vuejs.org/)** - TypeScript-first Vue state management library
- **[@pinia/nuxt 0.11.1](https://pinia.vuejs.org/ssr/nuxt.html)** - Official Nuxt integration for Pinia

### ✅ **Authentication**

- **[Better Auth 1.2.x](https://github.com/better-auth/better-auth#readme)** - Email/password, email verification, password reset, Google OAuth
- Middleware: `auth`, `admin`, optional `email-verified`
- SSR-friendly session refresh with cookie forwarding

### ✅ **Validation & Type Safety**

- **[Zod 3.25.53](https://zod.dev/)** - TypeScript-first schema validation with static type inference
- **[TypeScript 5.8.3](https://www.typescriptlang.org/)** - Static type checking and enhanced IDE support

### ✅ **Code Quality & Linting**

- **[@antfu/eslint-config 4.13.3](https://github.com/antfu/eslint-config)** - Opinionated ESLint preset with auto-fix formatting
- **[@nuxt/eslint 1.4.1](https://eslint.nuxt.com/)** - Official Nuxt ESLint integration
- **[ESLint 9.28.0](https://eslint.org/)** - Pluggable linting utility for JavaScript and TypeScript

### ✅ **Development Tools**

- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **Hot Module Replacement** - Instant updates during development
- **Auto-imports** - Automatic imports for Vue composables, utilities, and shadcn-vue components
- **File-based routing** - Automatic route generation from file structure

## 📁 Project Structure

```
nuxt-starter-template/
├── components/
│   └── ui/             # shadcn-vue components (auto-generated)
├── assets/
│   └── css/            # Global styles and Tailwind CSS
├── pages/              # File-based routing pages
├── composables/        # Vue composables (auto-imported)
├── layouts/            # Page layouts
├── middleware/         # Route middleware
├── plugins/            # Nuxt plugins
├── lib/
│   ├── db/             # Database configuration and schema
│   │   ├── migrations/ # Database migration files
│   │   └── schema/     # Drizzle schema definitions
│   ├── env/            # Environment variable validation
│   ├── types/          # TypeScript type definitions
│   └── utils.ts        # Utility functions
├── scripts/
│   └── db/             # Database seeding and utility scripts
├── server/             # Server-side API routes
│   └── api/            # API endpoints
├── public/             # Static assets
├── utils/              # Utility functions (auto-imported)
├── .cursor/rules/      # Cursor AI rules for development
├── nuxt.config.ts      # Nuxt configuration
├── drizzle.config.ts   # Drizzle ORM configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── eslint.config.ts    # ESLint configuration
```

## 🛠️ Setup

Make sure to install the dependencies:

```bash
# pnpm (recommended)
pnpm install

# npm
npm install

# yarn
yarn install

# bun
bun install
```

## 🗄️ Database Setup

1. **Set up your database** (PostgreSQL or Supabase)
2. **Configure environment variables** in `.env`:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   # For Supabase (optional)
   SUPABASE_URL="your-supabase-url"
   SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-key"
   ```
3. **Generate and run migrations**:

   ```bash
   # Generate migration files from schema changes
   pnpm run db:generate

   # Apply migrations to database
   pnpm run db:migrate

   # Or push schema directly (development)
   pnpm run db:push
   ```

4. **Seed the database** (optional):

   ```bash
   # Seed with sample data
   pnpm run db:seed

   # Seed with sample users
   pnpm run db:seed:users
   ```

## 🚀 Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm (recommended)
pnpm run dev
```

## 🔧 Available Scripts

```bash
# Development
pnpm run dev          # Start development server

# Building
pnpm run build        # Build for production
pnpm run generate     # Generate static site
pnpm run preview      # Preview production build

# Database
pnpm run db:generate  # Generate migration files from schema
pnpm run db:migrate   # Run database migrations
pnpm run db:push      # Push schema to database (development)
pnpm run db:studio    # Open Drizzle Studio (database GUI)
pnpm run db:seed      # Seed database with sample data
pnpm run db:seed:users # Seed database with sample users
pnpm run db:delete-all # Delete all data from database

# Code Quality
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Run ESLint with auto-fix
pnpm run typecheck    # Run TypeScript type checking
pnpm run check        # Run both linting and type checking

# Setup
pnpm run postinstall  # Prepare Nuxt (auto-run after install)
```

## 🔐 Authentication (Better Auth)

This template ships with Better Auth fully wired-up for email/password, email verification, password reset, and Google OAuth, with SSR-friendly session handling.

### Features

- Email/password auth with email verification and password reset
- Social login: Google
- SSR-safe session refresh and cookie forwarding
- Route protection via middleware: `auth`, `admin`, optional `email-verified`

### Flows & Usage

- Login/Signup/Logout: handled via `authClient` in UI forms and `useAuth()` composable
- Authenticated routes: add page meta

```ts
// pages/any-protected-page.vue
definePageMeta({ middleware: "auth" });

// Admin-only route
definePageMeta({ middleware: "admin" });

// Require verified email (optional)
definePageMeta({ middleware: ["auth", "email-verified"] });
```

- Session refresh (SSR-friendly): `useAuth().refresh()` forwards cookies on server

```ts
// useAuth() excerpt showing SSR cookie forwarding for session
// Server: forwards incoming Cookie header to /api/auth/session
// Client: uses credentials: 'include'
```

### API Routes

- Better Auth handler: `server/api/auth/[...all].ts` → proxies all Better Auth endpoints under `/api/auth/*`
- Session endpoint: `server/api/auth/session.get.ts` → returns `{ user, success }`, augments `user.admin`

### Environment Variables

Set these in `.env` (see `.env.example` for placeholders):

- Core: `NODE_ENV`, `DATABASE_URL`
- Better Auth: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`
- OAuth (Google): `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
- SMTP (Ethereal/dev): `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM_NAME`, `SMTP_FROM_EMAIL`

Production guidance:

- Set `BETTER_AUTH_URL` to your canonical HTTPS domain
- Review secure cookie options in Better Auth config before deploying

### Local Testing

- Seed users: `pnpm db:seed:users`
- Test credentials: see `scripts/docs/test-credentials.md`
- Admin: `admin@example.com` / `admin123`

## 🚀 Production

Build the application for production:

```bash
# pnpm (recommended)
pnpm run build
```

Locally preview production build:

```bash
# pnpm (recommended)
pnpm run preview
```

## 📚 Documentation Links

- **[Nuxt 3 Documentation](https://nuxt.com/docs)** - Learn about Nuxt features and API
- **[Better Auth Documentation](https://github.com/better-auth/better-auth#readme)** - Authentication library used in this template
- **[Drizzle ORM Documentation](https://orm.drizzle.team/)** - TypeScript ORM for SQL databases
- **[Drizzle Kit Documentation](https://orm.drizzle.team/kit-docs/overview)** - Migration and schema management tools
- **[Supabase Documentation](https://supabase.com/docs)** - Open source Firebase alternative
- **[shadcn-vue Documentation](https://www.shadcn-vue.com/)** - Vue port of shadcn/ui component library
- **[shadcn-vue Components](https://www.shadcn-vue.com/docs/components)** - Browse all available components
- **[shadcn-vue CLI](https://www.shadcn-vue.com/docs/cli)** - Command line tools for component management
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)** - Utility-first CSS framework guide
- **[Pinia Documentation](https://pinia.vuejs.org/)** - State management patterns and best practices
- **[Zod Documentation](https://zod.dev/)** - Schema validation and type inference
- **[Deployment Guide](https://nuxt.com/docs/getting-started/deployment)** - Deploy your Nuxt application

## 🎯 Getting Started

1. **Clone this template** and install dependencies with `pnpm install`
2. **Set up your database** and configure environment variables
3. **Run database migrations** with `pnpm run db:push` or `pnpm run db:migrate`
4. **Start development server** with `pnpm run dev`
5. **Add shadcn-vue components** with `pnpm dlx shadcn-vue@latest add [component-name]`
6. **Explore the `/pages`** directory to add your routes
7. **Check `/lib/db/schema`** for database schema definitions
8. **Add icons** using the [Nuxt Icon module](https://nuxt.com/modules/icon)
9. **Manage state** with [Pinia stores](https://pinia.vuejs.org/)
10. **Validate data** using [Zod schemas](https://zod.dev/)

### 🎨 Using shadcn-vue Components

```bash
# Initialize shadcn-vue (if not already done)
pnpm dlx shadcn-vue@latest init

# Add specific components
pnpm dlx shadcn-vue@latest add button
pnpm dlx shadcn-vue@latest add card dialog

# View all available components
pnpm dlx shadcn-vue@latest add
```

Components are automatically imported in your Vue files:

```vue
<template>
  <div>
    <Button variant="default">
      Click me
    </Button>
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Your content here</p>
      </CardContent>
    </Card>
  </div>
</template>
```

### 🗄️ Working with the Database

Define your schema in `lib/db/schema/`:

```typescript
import { createId } from "@paralleldrive/cuid2";
// lib/db/schema/users.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey().$defaultFn(() => createId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

Use in your API routes:

```typescript
// server/api/users.get.ts
import { db } from "~/lib/db";
import { users } from "~/lib/db/schema";

export default defineEventHandler(async (event) => {
  const allUsers = await db.select().from(users);
  return allUsers;
});
```

Happy coding! 🎉
