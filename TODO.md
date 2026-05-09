# TODO - 骗了吗 Implementation Tasks

## Phase 1: Project Initialization
- [ ] Initialize Next.js 14 with App Router and TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up project structure (`app/`, `components/`, `lib/`, `types/`, `data/`)
- [ ] Create type definitions (`types/index.ts`)
- [ ] Add seed data (`data/seed.ts`) with 5-10 sample scams
- [ ] Write unit tests for types and seed data
- [ ] **Commit after Phase 1**

## Phase 2: Static Data Layer
- [ ] Create `lib/data.ts` to expose seed data
- [ ] Build `SearchBar.tsx` component
- [ ] Build `CategoryGrid.tsx` component (10 categories)
- [ ] Build `HotScams.tsx` component
- [ ] Build `TagCloud.tsx` component
- [ ] Build homepage (`app/page.tsx`)
- [ ] Build category browsing (`app/category/[slug]/page.tsx`)
- [ ] Build scam detail page (`app/scam/[slug]/page.tsx`) with `RedFlagTable.tsx`
- [ ] Build search results page (`app/search/page.tsx`)
- [ ] Write unit tests for components and data utilities
- [ ] **Commit after Phase 2**

## Phase 3: Search Functionality
- [ ] Implement `lib/search.ts` with keyword matching
- [ ] Add search highlighting
- [ ] Build search results page with sorting (热度/最新/相关度)
- [ ] Handle "no results" case with contribute CTA
- [ ] Write unit tests for search logic
- [ ] **Commit after Phase 3**

## Phase 4: Contribution System
- [ ] Build `ContributeForm.tsx` component
- [ ] Create `app/contribute/page.tsx`
- [ ] Create `lib/contributions.ts` for storing submissions
- [ ] Add "投稿须知" section
- [ ] Write unit tests for form validation
- [ ] **Commit after Phase 4**

## Phase 5: API Routes
- [ ] Create `app/api/scams/route.ts` (GET all, GET by slug)
- [ ] Create `app/api/search/route.ts` (GET search)
- [ ] Create `app/api/contribute/route.ts` (POST submission)
- [ ] Wire up components to use API routes
- [ ] Write integration tests for API routes
- [ ] **Commit after Phase 5**

## Phase 6: Supabase Integration (Optional for V1)
- [ ] Configure Supabase client (`lib/supabase.ts`)
- [ ] Create database tables (scams, contributions)
- [ ] Migrate seed data to Supabase
- [ ] Update API routes to use Supabase
- [ ] Write tests for database operations
- [ ] **Commit after Phase 6**

---

## Components Checklist

- [ ] `SearchBar.tsx`
- [ ] `CategoryGrid.tsx`
- [ ] `ScamCard.tsx`
- [ ] `RedFlagTable.tsx`
- [ ] `HotScams.tsx`
- [ ] `TagCloud.tsx`
- [ ] `CaseList.tsx`
- [ ] `ShareButtons.tsx`
- [ ] `ContributeForm.tsx`

---

## Testing Requirements
- [ ] Unit tests for types (`types/index.ts`)
- [ ] Unit tests for seed data (`data/seed.ts`)
- [ ] Unit tests for search logic (`lib/search.ts`)
- [ ] Unit tests for contribution form validation
- [ ] Integration tests for API routes
- [ ] Component render tests
