# Next.js Migration Plan for Rental Hub Frontend

This document outlines the step-by-step strategy for converting the monolithic 11MB `rentalshub.html` template into a production-ready, modular Next.js (App Router) project. The plan focuses on strict separation of concerns, reusable components, centralizing styling, and preparing the app for seamless API integration later.

## Phase 1: Project Architecture & Styling Setup
**Goal:** Scaffold the foundational folder structure and centralize styling.
*   **Directory Structure Initialization:** Setup standard production directories:
    *   `/components/shared`: Global UI (Buttons, Inputs, Header, Footer, Modals).
    *   `/components/features`: Domain-specific chunks (e.g., `PropertyCard`, `CarSearchWidget`).
    *   `/lib/types`: TypeScript definitions for our data entities.
    *   `/lib/data`: Mock data and API simulation.
    *   `/lib/utils` and `/hooks`: Reusable logic.
*   **Global CSS & Theming:**
    *   Extract repeating color codes (primary, backgrounds, text, borders) from the HTML template.
    *   Define these as CSS variables in `/app/globals.css` (e.g., `--color-primary`, `--color-background`).
    *   Map these variables into the Tailwind CSS v4 configuration to maintain theme consistency throughout the app.
*   **Asset Management:** Extract any massive base64 inline images and inline SVGs from the 11MB HTML file. Save them as static assets in the `/public` directory or convert SVGs into reusable React components.

## Phase 2: Data Modeling & Mock API Layer
**Goal:** Abstract data out of the HTML to make future backend integration trivial.
*   **TypeScript Interfaces:** Define strict shapes for `Property`, `Car`, `Service`, `User`, `Booking`, and `Review` in `/lib/types/index.ts`.
*   **Mock Data Files:** Extract the hardcoded content from the HTML into structured JSON/TS objects (e.g., `/lib/data/mockCars.ts`, `/lib/data/mockProperties.ts`).
*   **Mock Service Architecture:** Create service functions (e.g., `getProperties()`, `getCarById(id)`) inside `/lib/api/` that currently return promises of the mock data. When the backend is ready, we only need to change these functions to make real `fetch` calls.

## Phase 3: Global Shell & Layout Implementation
**Goal:** Build the persistent application shell.
*   **Shared Components:** Extract the `Header` (including the Navigation and Search Widget) and `Footer` from the HTML comments section `<!-- ============ HEADER ============ -->` and `<!-- ============ FOOTER ============ -->`.
*   **Root Layout:** Integrate the Header and Footer into `/app/layout.tsx`.
*   **Modal Provider System:** Extract all global modals (Sign In, Sign Up, List Business, OTP, Payment Confirm, Email Receipt) and implement a global state or context to trigger them seamlessly from anywhere in the app.

## Phase 4: Core Routing & Page Extraction
**Goal:** Map the distinct sections of the single HTML file into Next.js App Router paths.
*   **Home Page:** `/app/page.tsx` (Showcase Rows, Discover Guide).
*   **Stays (House Rentals):**
    *   Catalog: `/app/stays/page.tsx`
    *   Detail View: `/app/stays/[id]/page.tsx`
*   **Cars:**
    *   Catalog: `/app/cars/page.tsx`
    *   Detail View: `/app/cars/[id]/page.tsx`
    *   Checkout/Extras: `/app/cars/[id]/checkout/page.tsx`
*   **Services & Food:**
    *   Index: `/app/services/page.tsx`
    *   Host (Food Supplier): `/app/food/[id]/page.tsx`
*   **User Portals:**
    *   Host Back Office: `/app/host/dashboard/page.tsx`
    *   Guest Profile: `/app/guest/profile/page.tsx`

## Phase 5: Feature Component Implementation
**Goal:** Break the HTML pages into reusable React components.
*   Convert the individual items into components like `<PropertyCard />`, `<CarCard />`, and `<ServiceItem />`.
*   **Server Components:** Use Next.js Server Components for pages to fetch data via our Mock API Layer and pass the data down as props.
*   **Client Components:** Identify and separate interactive pieces (Image Carousels, Date Pickers, Payment toggles) adding the `"use client"` directive.

## Phase 6: Optimization & Polish
**Goal:** Ensure fast load times and clean up legacy HTML cruft.
*   **Next/Image:** Replace all standard `<img>` tags with Next.js `<Image />` component for automatic optimization, using our `/public` directory assets.
*   **Responsive Review:** Verify the Tailwind classes map perfectly to the intended responsive design (mobile/tablet/desktop layouts present in the HTML).
*   **Cleanup:** Discard the remaining parts of `rentalshub.html` once everything is fully migrated.

## Phase 7: API Readiness Verification
**Goal:** Final review to ensure the UI is decoupled from data.
*   Audit all feature components to ensure **no hardcoded data remains** inside the TSX files.
*   Verify loading states (`loading.tsx`) and error states (`error.tsx`) are established across routes.
*   Ensure the structure directly mirrors what the REST/GraphQL endpoints will provide, minimizing integration friction.
