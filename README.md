# FlavorFinds — Next.js

A recipe discovery app built with Next.js 14 (App Router) and TypeScript, powered by [TheMealDB API](https://www.themealdb.com/).

## Project Structure

```
flavorfindsnext/
├── app/
│   ├── globals.css       # All styles (converted from styles.css)
│   ├── layout.tsx        # Root layout (loads Font Awesome)
│   └── page.tsx          # Home page (main logic, converted from script.js)
├── components/
│   ├── RecipeCard.tsx    # Individual recipe card
│   └── RecipeModal.tsx   # Recipe detail modal
├── lib/
│   ├── api.ts            # MealDB API functions
│   └── types.ts          # TypeScript interfaces
├── next.config.js
├── tsconfig.json
└── package.json
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What Changed from Vanilla JS → Next.js

| Vanilla | Next.js |
|---|---|
| `index.html` | `app/layout.tsx` + `app/page.tsx` |
| `styles.css` | `app/globals.css` |
| `script.js` | Split into `page.tsx`, `RecipeCard.tsx`, `RecipeModal.tsx`, `lib/api.ts` |
| `document.getElementById` | React `useState` + JSX |
| `addEventListener` | React event handlers (`onClick`, `onChange`) |
| Imperative DOM manipulation | Declarative rendering |

## Features

- 🔍 Search recipes by name
- 🌍 Filter by cuisine (American, Indian, Italian, etc.)
- 🏷️ Filter by category (dynamically loaded)
- 🥕 Filter by ingredient (dynamically loaded)
- 📋 Full recipe modal with ingredients, step-by-step instructions
- 📺 YouTube video link when available
- 📱 Fully responsive
