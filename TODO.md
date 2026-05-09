# TODO - 骗了吗 Implementation Tasks

## Phase 1: Project Initialization
- [x] Initialize Next.js 14 with App Router and TypeScript
- [x] Configure Tailwind CSS
- [x] Set up project structure (`app/`, `components/`, `lib/`, `types/`, `data/`)
- [x] Create type definitions (`types/index.ts`)
- [x] Add seed data (`data/seed.ts`) with 5-10 sample scams
- [x] Write unit tests for types and seed data
- [x] **Commit after Phase 1**

## Phase 2: Static Data Layer
- [x] Create `lib/data.ts` to expose seed data
- [x] Build `SearchBar.tsx` component
- [x] Build `CategoryGrid.tsx` component (10 categories)
- [x] Build `HotScams.tsx` component
- [x] Build `TagCloud.tsx` component
- [x] Build homepage (`app/page.tsx`)
- [x] Build category browsing (`app/category/[slug]/page.tsx`)
- [x] Build scam detail page (`app/scam/[slug]/page.tsx`) with `RedFlagTable.tsx`
- [x] Build search results page (`app/search/page.tsx`)
- [x] Write unit tests for components and data utilities
- [x] **Commit after Phase 2**

## Phase 3: Search Functionality
- [x] Implement `lib/search.ts` with keyword matching
- [x] Add search highlighting
- [x] Build search results page with sorting (热度/最新/相关度)
- [x] Handle "no results" case with contribute CTA
- [x] Write unit tests for search logic
- [x] **Commit after Phase 3**

## Phase 4: Contribution System
- [ ] Build `ContributeForm.tsx` component
- [ ] Create `app/contribute/page.tsx`
- [ ] Create `lib/contributions.ts` for storing submissions
- [ ] Add "投稿须知" section
- [ ] Write unit tests for form validation
- [ ] **Commit after Phase 4**

## Phase 5: API Routes (Completed in Phase 3)
- [x] Create `app/api/scams/route.ts` (GET all, GET by slug)
- [x] Create `app/api/search/route.ts` (GET search)
- [x] Create `app/api/contribute/route.ts` (POST submission)
- [x] Wire up components to use API routes
- [ ] Write integration tests for API routes
- [x] **Commit after Phase 3**

## Phase 6: Supabase Integration (Optional for V1)
- [ ] Configure Supabase client (`lib/supabase.ts`)
- [ ] Create database tables (scams, contributions)
- [ ] Migrate seed data to Supabase
- [ ] Update API routes to use Supabase
- [ ] Write tests for database operations
- [ ] **Commit after Phase 6**

---

## Components Checklist

- [x] `SearchBar.tsx`
- [x] `CategoryGrid.tsx`
- [x] `ScamCard.tsx`
- [x] `RedFlagTable.tsx`
- [x] `HotScams.tsx`
- [x] `TagCloud.tsx`
- [x] `CaseList.tsx`
- [x] `ShareButtons.tsx`
- [x] `ContributeForm.tsx`

---

## Testing Requirements
- [x] Unit tests for types (`types/index.ts`)
- [x] Unit tests for seed data (`data/seed.ts`)
- [x] Unit tests for lib/data.ts
- [x] Unit tests for search logic (`lib/search.ts`)
- [ ] Unit tests for contribution form validation
- [ ] Integration tests for API routes
- [ ] Component render tests
