# Nuxt UI Template

A comprehensive **Nuxt 3** template with modern development tools, UI components, state management, and TypeScript support. This template provides everything you need to build scalable, production-ready web applications.

## 🚀 Included Features & Components

### ✅ **Core Framework**
- **[Nuxt 3.17.4](https://nuxt.com/docs)** - Full-stack Vue.js framework with SSR, auto-imports, and file-based routing

### ✅ **UI & Styling**
- **[@nuxt/ui 3.1.3](https://ui.nuxt.com/)** - 50+ customizable components built with Tailwind CSS v4 and Reka UI
- **[@nuxtjs/color-mode 3.5.2](https://color-mode.nuxtjs.org/)** - Dark/light mode with auto detection and system preference support
- **[@nuxt/icon 1.13.0](https://nuxt.com/modules/icon)** - Access to 200,000+ icons from Iconify with SSR support
- **[@iconify-json/lucide](https://lucide.dev/)** - Beautiful & consistent icon toolkit
- **[@iconify-json/simple-icons](https://simpleicons.org/)** - Popular brand icons

### ✅ **State Management**
- **[Pinia 3.0.3](https://pinia.vuejs.org/)** - TypeScript-first Vue state management library
- **[@pinia/nuxt 0.11.1](https://pinia.vuejs.org/ssr/nuxt.html)** - Official Nuxt integration for Pinia

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
- **Auto-imports** - Automatic imports for Vue composables and utilities
- **File-based routing** - Automatic route generation from file structure

## 📁 Project Structure

```
nuxt-ui-template/
├── app/
│   ├── assets/css/     # Global styles and CSS assets
│   └── pages/          # File-based routing pages
├── public/             # Static assets
├── server/             # Server-side API routes
├── nuxt.config.ts      # Nuxt configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── eslint.config.mjs   # ESLint configuration
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

## 🚀 Development Server

Start the development server on `http://localhost:3000`:

```bash
# pnpm (recommended)
pnpm run dev

# npm
npm run dev

# yarn
yarn dev

# bun
bun run dev
```

## 🔧 Available Scripts

```bash
# Development
pnpm run dev          # Start development server

# Building
pnpm run build        # Build for production
pnpm run generate     # Generate static site
pnpm run preview      # Preview production build

# Code Quality
pnpm run lint         # Run ESLint
pnpm run lint:fix     # Run ESLint with auto-fix

# Setup
pnpm run postinstall  # Prepare Nuxt (auto-run after install)
```

## 🚀 Production

Build the application for production:

```bash
# pnpm (recommended)
pnpm run build

# npm
npm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# pnpm (recommended)
pnpm run preview

# npm
npm run preview

# yarn
yarn preview

# bun
bun run preview
```

## 📚 Documentation Links

- **[Nuxt 3 Documentation](https://nuxt.com/docs)** - Learn about Nuxt features and API
- **[Nuxt UI Documentation](https://ui.nuxt.com/)** - Explore available components and customization
- **[Pinia Documentation](https://pinia.vuejs.org/)** - State management patterns and best practices
- **[Zod Documentation](https://zod.dev/)** - Schema validation and type inference
- **[Deployment Guide](https://nuxt.com/docs/getting-started/deployment)** - Deploy your Nuxt application

## 🎯 Getting Started

1. **Clone this template** and install dependencies
2. **Start development server** with `pnpm run dev`
3. **Explore the `/app/pages`** directory to add your routes
4. **Check `/app/assets/css`** for global styles
5. **Use Nuxt UI components** from the [component library](https://ui.nuxt.com/)
6. **Add icons** using the [Nuxt Icon module](https://nuxt.com/modules/icon)
7. **Manage state** with [Pinia stores](https://pinia.vuejs.org/)
8. **Validate data** using [Zod schemas](https://zod.dev/)

Happy coding! 🎉
