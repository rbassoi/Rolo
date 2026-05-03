---
wave: 1
depends_on: []
autonomous: true
---

# Phase 1 Plan: Foundation & Initial Setup

## Goal
Initialize the Next.js stack, establish the visual theme, and build the Shop Directory scaffolding (REQ-001).

## Tasks

### 1. Next.js Initialization
<read_first>
- .planning/config.json
</read_first>
<action>
Run `npx create-next-app@latest ./ --typescript --eslint --app --src-dir --import-alias "@/*" --use-npm` in non-interactive mode. Do NOT use Tailwind CSS (Vanilla CSS Modules only).
</action>
<acceptance_criteria>
- `package.json` exists and contains `next`, `react`, and `react-dom`.
- `src/app/page.tsx` exists.
- `tailwind.config.js` does NOT exist.
</acceptance_criteria>

### 2. Global Styles and Layout Setup
<read_first>
- src/app/layout.tsx
- src/app/globals.css
</read_first>
<action>
1. Update `src/app/globals.css` with a modern, vibrant CSS variables theme (primary, secondary, background, text colors) reflecting a premium aesthetic.
2. Create `src/components/layout/Header.tsx`, `Header.module.css`, `Footer.tsx`, and `Footer.module.css`. 
3. The Header should contain a logo "Sion Portal" and navigation links for "Home", "Shops", and "Marketplace".
4. Integrate the Header and Footer into `src/app/layout.tsx`.
</action>
<acceptance_criteria>
- `src/app/globals.css` defines CSS variables for colors.
- `src/components/layout/Header.tsx` is implemented and rendered in `layout.tsx`.
- `src/components/layout/Footer.tsx` is implemented and rendered in `layout.tsx`.
</acceptance_criteria>

### 3. Shop Directory Data Model and Mock Data
<read_first>
- src/types/index.ts (to be created)
</read_first>
<action>
1. Create `src/types/index.ts` and define the `Shop` interface. It must include `id`, `name`, `description`, `category`, `address`, `district` (default "Sion"), and `city` (default "Belo Horizonte") to prepare for future expansion.
2. Create `src/lib/mockData.ts` and populate it with 3-5 realistic mock shops located in the Sion District.
</action>
<acceptance_criteria>
- `src/types/index.ts` exports a `Shop` interface with `district` and `city` fields.
- `src/lib/mockData.ts` exports a `shops` array containing valid mock data.
</acceptance_criteria>

### 4. Shop Directory Listing Page
<read_first>
- src/app/shops/page.tsx (to be created)
</read_first>
<action>
1. Create `src/app/shops/page.tsx` and `page.module.css`.
2. Fetch the mock data from `src/lib/mockData.ts`.
3. Render a responsive grid of shop cards. Each card should display the shop name, category, and its location (`district, city`).
</action>
<acceptance_criteria>
- `src/app/shops/page.tsx` exists and renders a list of shops.
- The UI properly displays the `district` and `city` for each shop.
</acceptance_criteria>

## Verification
- Run `npm run build` to ensure the project compiles cleanly.
- Verify that navigating to `/shops` successfully displays the local directory with location-aware data.
