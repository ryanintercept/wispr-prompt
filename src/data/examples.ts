import type { ExtractedComponents, TaskType } from '../types';

export interface ExamplePrompt {
  id: string;
  label: string;
  icon: string;
  category: TaskType;
  rawInput: string;
  components: ExtractedComponents;
  optimizedPrompts: {
    claude: string;
    gpt: string;
    gemini: string;
    llama: string;
    reasoning: string;
  };
}

export const EXAMPLES: ExamplePrompt[] = [
  {
    id: 'dashboard-builder',
    label: 'Dashboard Builder',
    icon: '📊',
    category: 'build',
    rawInput: `okay so I need to build a React component that shows a dashboard with like charts and stuff, it should pull data from my API, oh and make sure it's responsive and uses Tailwind, also I want dark mode support and it should have a sidebar with navigation, and like maybe some loading states too`,
    components: {
      task_type: 'build',
      context: 'Building a React dashboard component for an existing application with a REST API backend.',
      objective: 'Create a responsive dashboard with sidebar navigation, chart panels, dark mode, and loading states.',
      tech_stack: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
      constraints: [
        'Use Tailwind CSS for all styling (no custom CSS)',
        'Include loading skeleton states for async data',
        'Sidebar should be collapsible on mobile',
        'Use React hooks for state management (no external state library)',
      ],
      expected_output: 'Single React component file with TypeScript. Include inline comments explaining key decisions.',
      edge_cases: 'Handle API errors gracefully with fallback UI. Consider empty data states for charts.',
      priority: 'Responsive layout and dark mode support',
      ambiguities: [
        'Which charting library to use (inferred Recharts from React ecosystem)',
        'Specific API endpoint structure not provided',
      ],
    },
    optimizedPrompts: {
      claude: `<context>
Building a React dashboard component for an existing application.
Tech stack: React, TypeScript, Tailwind CSS, REST API integration.
The dashboard will serve as the main analytics view with multiple data panels.
</context>

<task>
Create a responsive dashboard component with the following requirements:

1. Layout: Sidebar navigation + main content area
   - Sidebar with nav links and collapsible behavior on mobile
   - Main area with a grid of dashboard panels
2. Charts: Data visualization panels using Recharts
   - At least 2-3 chart types (line, bar, area)
   - Charts should resize responsively
3. Data: Fetch from REST API with proper state handling
   - Loading skeleton states while data is fetching
   - Error state with retry option
   - Empty state when no data is available
4. Theming: Dark mode support via Tailwind
   - Use Tailwind's dark: modifier
   - Toggle switch in the sidebar or header
5. Responsive: Mobile-friendly layout
   - Sidebar collapses to hamburger menu on mobile
   - Chart grid adjusts from multi-column to single column
</task>

<constraints>
- Use Tailwind CSS for all styling — do NOT write custom CSS
- Use React hooks (useState, useEffect, useReducer) for state management — no Redux or Zustand
- Include loading skeleton states for every async data panel
- Handle all error states gracefully with user-facing messages
- Sidebar must be collapsible on screens below 768px
</constraints>

<output_format>
Single React component file with TypeScript.
Include inline comments explaining key architectural decisions.
Export the component as default.
</output_format>`,

      gpt: `**System:** You are a senior React developer specializing in dashboard UIs with Tailwind CSS. You write clean, well-structured TypeScript components with thorough state handling.

**User:** Build me a responsive React dashboard component with these specs:

## Requirements
- **Sidebar navigation** that collapses into a hamburger menu on mobile (below 768px)
- **Chart panels** using Recharts — include at least a line chart, bar chart, and area chart
- **REST API data fetching** with loading skeletons, error states with retry, and empty data handling
- **Dark mode support** using Tailwind's \`dark:\` modifier with a toggle switch
- **Responsive grid layout** that goes from multi-column on desktop to single column on mobile

## Tech Stack
React + TypeScript + Tailwind CSS + Recharts

## Constraints
- All styling via Tailwind (no custom CSS)
- React hooks only for state (no external state libraries)
- Every async panel needs a loading skeleton

## Output
Single TypeScript component file with inline comments on key decisions. Export as default.`,

      gemini: `# Task: Build a Responsive React Dashboard Component

You are helping build a production React dashboard. Approach this as a senior frontend engineer would.

## Project Context
- Framework: React + TypeScript
- Styling: Tailwind CSS only (no custom CSS)
- Charts: Recharts
- Data source: REST API

## Goal
Create a single dashboard component with:
1. Sidebar navigation (collapses to hamburger on mobile <768px)
2. Multiple chart panels (line, bar, area) using Recharts
3. Data fetching with loading skeletons, error states, and empty states
4. Dark mode toggle using Tailwind's \`dark:\` modifier
5. Responsive grid layout (multi-column → single column on mobile)

## Constraints
- Tailwind only — no custom CSS files
- React hooks only for state — no Redux, Zustand, or other libraries
- Every async panel needs a loading skeleton
- Handle all error states with user-facing messages

## Deliverable
Provide a single TypeScript component file. Include inline comments explaining key architectural decisions. Export as default.`,

      llama: `[INST] You are a senior React developer. Build a production-quality dashboard component.

Requirements:
- React + TypeScript + Tailwind CSS + Recharts
- Sidebar navigation that collapses to hamburger menu below 768px
- Chart panels: line chart, bar chart, area chart (Recharts)
- REST API data fetching with loading skeletons, error states, and empty data handling
- Dark mode via Tailwind's dark: modifier with toggle
- Responsive grid: multi-column desktop → single column mobile

Constraints:
- Tailwind only, no custom CSS
- React hooks only, no external state libraries
- Every async panel must have a loading skeleton
- All error states need user-facing messages

Output: A single TypeScript component file with inline comments on key decisions. Export as default. [/INST]`,

      reasoning: `Build a responsive React dashboard component.

Stack: React + TypeScript + Tailwind CSS + Recharts, REST API backend.

Requirements:
- Sidebar nav (collapses to hamburger below 768px)
- Chart panels: line, bar, area
- Loading skeletons, error states, empty states for all data panels
- Dark mode via Tailwind dark: modifier
- Responsive: multi-column desktop, single column mobile

Hard constraints:
- Tailwind only (no custom CSS)
- React hooks only (no Redux/Zustand)
- All async panels need skeletons
- All error paths need user-facing messages

Deliver one TypeScript component file with inline comments on architectural decisions. Default export.`,
    },
  },
  {
    id: 'debug-auth',
    label: 'Debug Auth Flow',
    icon: '🐛',
    category: 'debug',
    rawInput: `so users are reporting that sometimes when they log in it works fine but then like randomly they get kicked out after a few minutes, I think it might be the token refresh but I'm not sure, we're using JWT with refresh tokens and the access token expires in 15 minutes, the refresh endpoint is /api/auth/refresh, oh and this only seems to happen on mobile browsers not desktop, could be a timing issue or maybe the refresh request is failing silently`,
    components: {
      task_type: 'debug',
      context: 'Production auth system using JWT with refresh tokens. Access tokens expire in 15 minutes. Refresh endpoint at /api/auth/refresh. Users report intermittent logouts, primarily on mobile browsers.',
      objective: 'Diagnose and fix the intermittent session termination issue, likely related to token refresh failures on mobile browsers.',
      tech_stack: ['JWT', 'REST API', 'JavaScript'],
      constraints: [
        'Must not break existing desktop auth flow',
        'Solution should handle network interruptions gracefully',
        'Refresh token rotation must remain secure',
      ],
      expected_output: 'Root cause analysis with code fix for the token refresh mechanism.',
      edge_cases: 'Mobile browsers throttling background timers. Race conditions if multiple tabs attempt refresh simultaneously.',
      priority: 'Identifying the root cause of mobile-specific failures',
      ambiguities: [
        'Frontend framework not specified (React, Vue, etc.)',
        'Whether refresh tokens are stored in httpOnly cookies or localStorage',
        'Server-side refresh endpoint implementation details',
      ],
    },
    optimizedPrompts: {
      claude: `<context>
Production authentication system using JWT with refresh tokens.
- Access token TTL: 15 minutes
- Refresh endpoint: /api/auth/refresh
- Issue: Users are intermittently logged out after a few minutes
- Pattern: Only reproduces on mobile browsers, not desktop
- Suspected cause: Token refresh mechanism failing silently
</context>

<task>
Diagnose the root cause of intermittent session termination on mobile browsers and provide a fix.

Investigate these likely causes in order:

1. Mobile browser timer throttling — setTimeout/setInterval are heavily throttled when tabs are backgrounded on mobile. If the refresh is timer-based, it may never fire.
2. Silent fetch failures — mobile networks drop connections more frequently. If the refresh request fails without retry logic, the session dies.
3. Race conditions — if the user has multiple tabs or the app re-renders, multiple simultaneous refresh requests could invalidate tokens.
4. Storage issues — if tokens are in localStorage/sessionStorage, mobile Safari has known eviction behaviors.
</task>

<constraints>
- Do NOT break the existing desktop auth flow
- The fix must handle intermittent network failures gracefully (retry with backoff)
- Refresh token rotation security must be preserved
- Solution should work across Safari iOS, Chrome Android, and Firefox mobile
</constraints>

<output_format>
1. Root cause analysis (which of the above, or something else, with evidence)
2. Code fix with before/after comparison
3. Testing strategy to verify the fix on mobile
</output_format>`,

      gpt: `**System:** You are a senior backend/auth engineer who specializes in JWT-based authentication systems. You have deep knowledge of mobile browser quirks, token refresh patterns, and race conditions in auth flows.

**User:** I need help debugging an intermittent logout issue in our production auth system.

## Current Setup
- JWT with refresh tokens
- Access token expires in **15 minutes**
- Refresh endpoint: \`/api/auth/refresh\`
- Works fine on desktop browsers

## The Problem
Users on **mobile browsers** are randomly getting logged out after a few minutes. It doesn't happen on desktop. I suspect the token refresh is failing silently.

## What I Need
1. **Root cause analysis** — investigate mobile timer throttling, silent fetch failures, race conditions, and storage eviction as potential causes
2. **Code fix** — show before/after for the token refresh mechanism
3. **Testing strategy** — how to verify the fix specifically on mobile browsers

## Constraints
- Don't break the existing desktop flow
- Handle network interruptions with retry + backoff
- Keep refresh token rotation secure`,

      gemini: `# Task: Debug Intermittent Mobile Logout in JWT Auth System

You are an expert in authentication systems and mobile browser quirks. Help diagnose a production bug.

## Current Setup
- JWT auth with refresh tokens
- Access token TTL: 15 minutes
- Refresh endpoint: \`/api/auth/refresh\`
- Works correctly on desktop browsers

## The Bug
Mobile browser users are randomly logged out after a few minutes. Desktop is unaffected.

## Investigate These Causes (in order)
1. **Mobile timer throttling** — setTimeout/setInterval are heavily throttled on backgrounded mobile tabs
2. **Silent fetch failures** — mobile networks drop connections; refresh requests may fail without retry
3. **Race conditions** — multiple tabs or re-renders triggering simultaneous refresh requests
4. **Storage eviction** — Mobile Safari has aggressive localStorage/sessionStorage eviction

## Constraints
- Don't break the existing desktop flow
- Handle network interruptions with retry + exponential backoff
- Preserve refresh token rotation security
- Solution must work on Safari iOS, Chrome Android, Firefox mobile

## Deliverables
1. Root cause analysis with evidence
2. Code fix with before/after comparison
3. Mobile-specific testing strategy`,

      llama: `[INST] You are a senior backend/auth engineer. Debug an intermittent mobile logout bug.

System:
- JWT with refresh tokens
- Access token expires in 15 minutes
- Refresh endpoint: /api/auth/refresh
- Works on desktop, fails intermittently on mobile

Investigate these likely causes:
1. Mobile browser timer throttling on backgrounded tabs
2. Silent fetch failures on flaky mobile networks
3. Race conditions from multiple tabs hitting refresh simultaneously
4. Mobile Safari localStorage/sessionStorage eviction

Constraints:
- Do not break desktop flow
- Add retry with exponential backoff for network failures
- Keep refresh token rotation secure
- Must work on Safari iOS, Chrome Android, Firefox mobile

Output:
1. Root cause analysis with evidence
2. Before/after code fix
3. Mobile-specific test strategy [/INST]`,

      reasoning: `Diagnose and fix intermittent mobile logout in a JWT auth system.

Setup:
- JWT + refresh tokens, 15 min access TTL
- Refresh endpoint: /api/auth/refresh
- Desktop works, mobile users get logged out randomly after a few minutes

Likely causes to investigate:
1. Mobile timer throttling on backgrounded tabs
2. Silent fetch failures on mobile networks
3. Race conditions from concurrent refresh attempts
4. Mobile Safari storage eviction

Constraints:
- Preserve desktop behavior
- Retry network failures with exponential backoff
- Keep refresh token rotation secure
- Must work on Safari iOS, Chrome Android, Firefox mobile

Deliver: root cause + evidence, code fix (before/after), mobile test plan.`,
    },
  },
  {
    id: 'api-architecture',
    label: 'API Architecture',
    icon: '🏗️',
    category: 'architect',
    rawInput: `I'm thinking about how to structure the API for our new multi-tenant SaaS app, we need to support different pricing tiers with different rate limits per tenant, and I want to make sure the database schema works for tenant isolation, should I use row-level security or separate schemas, also need to think about the API key management system and how tenants authenticate, oh and we're planning to use PostgreSQL with Node.js and maybe Express or Fastify`,
    components: {
      task_type: 'architect',
      context: 'Designing the backend architecture for a new multi-tenant SaaS application. Early-stage design phase — no existing codebase yet.',
      objective: 'Design the API architecture including multi-tenancy strategy, rate limiting by tier, authentication/API key management, and database schema.',
      tech_stack: ['Node.js', 'PostgreSQL', 'Express or Fastify'],
      constraints: [
        'Must support multiple pricing tiers with different rate limits',
        'Tenant data isolation is critical for security',
        'API key management system needed for tenant authentication',
        'Must scale to hundreds of tenants',
      ],
      expected_output: 'Architecture document with database schema design, API structure, and implementation recommendations.',
      edge_cases: 'Tenant migration between tiers. Handling rate limit changes in real-time. Tenant deletion and data cleanup.',
      priority: 'Tenant isolation strategy and rate limiting architecture',
      ambiguities: [
        'Expected number of tenants (10s, 100s, 1000s)',
        'Whether tenants need sub-users/teams',
        'Specific pricing tiers and their rate limit values',
      ],
    },
    optimizedPrompts: {
      claude: `<context>
Designing the backend architecture for a new multi-tenant SaaS application from scratch.
Tech stack: Node.js, PostgreSQL, Express or Fastify.
Key concerns: tenant isolation, tiered rate limiting, API key authentication.
</context>

<task>
First, reason through the architectural trade-offs before proposing a design.

Then provide a complete architecture covering:

1. Multi-tenancy database strategy
   - Compare row-level security (RLS) vs. separate schemas vs. tenant_id column
   - Recommend one approach with justification for a SaaS at the 100s-of-tenants scale
   - Include the core database schema (tenants, users, api_keys, plans tables)

2. Rate limiting system
   - Design a tier-based rate limiting system (e.g., Free: 100 req/hr, Pro: 10k req/hr, Enterprise: unlimited)
   - Where to enforce (middleware vs. API gateway)
   - How to handle tier changes in real-time without restart

3. API authentication
   - API key generation, storage (hashed), and validation flow
   - Tenant identification from API key
   - Key rotation strategy

4. API structure
   - RESTful route design with tenant context
   - Middleware chain: auth → tenant resolution → rate limit → handler
   - Error handling patterns
</task>

<constraints>
- PostgreSQL only — no additional databases for MVP (no Redis requirement for rate limiting)
- Must be horizontally scalable
- Tenant data must be fully isolated — no cross-tenant data leakage
- API keys must be stored hashed, never in plaintext
</constraints>

<output_format>
Architecture document with:
- Database schema (SQL CREATE TABLE statements)
- Middleware chain pseudocode
- API route structure
- Diagrams described in text (request flow)
- Trade-off analysis for key decisions
</output_format>`,

      gpt: `**System:** You are a senior backend architect specializing in multi-tenant SaaS systems built on Node.js and PostgreSQL. You prioritize security, scalability, and clean API design. Think step by step through architectural trade-offs before proposing solutions.

**User:** I need to design the backend architecture for a new multi-tenant SaaS app. Help me make the key architectural decisions.

## Tech Stack
Node.js + PostgreSQL + Express or Fastify

## Key Design Areas

### 1. Multi-Tenancy Strategy
- Compare **row-level security** vs. **separate schemas** vs. **tenant_id column** approach
- Recommend one for ~100s of tenants with justification
- Provide the core database schema (tenants, users, api_keys, plans)

### 2. Tiered Rate Limiting
- Design rate limits per pricing tier (Free, Pro, Enterprise)
- Where to enforce it (middleware vs. gateway)
- **Must handle tier changes in real-time** without restarts

### 3. API Key Authentication
- Key generation, hashed storage, and validation flow
- Tenant identification from API key
- Key rotation strategy

### 4. API Structure
- RESTful route design with tenant context
- Middleware chain: auth → tenant resolution → rate limit → handler

## Constraints
- PostgreSQL only for MVP (no Redis)
- Must be horizontally scalable
- Zero cross-tenant data leakage
- API keys stored hashed, never plaintext

## Output
Full architecture doc with SQL schemas, middleware pseudocode, route structure, and trade-off analysis.`,

      gemini: `# Task: Multi-Tenant SaaS Backend Architecture Design

You are a senior backend architect. Design a scalable, secure multi-tenant SaaS backend.

## Tech Stack
Node.js + PostgreSQL + Express or Fastify

## Design Areas

### 1. Multi-Tenancy Strategy
Compare three approaches:
- Row-level security (RLS)
- Separate schemas per tenant
- \`tenant_id\` column on every table

Recommend one for ~100s of tenants with reasoning. Provide core schema (tenants, users, api_keys, plans).

### 2. Tiered Rate Limiting
- Define limits per tier (Free / Pro / Enterprise)
- Where to enforce (middleware vs. gateway)
- **Must support real-time tier changes without restart**

### 3. API Key Authentication
- Generation, hashed storage, validation
- Tenant identification from key
- Rotation strategy

### 4. API Structure
- RESTful routes with tenant context
- Middleware chain: auth → tenant resolution → rate limit → handler

## Constraints
- PostgreSQL only for MVP (no Redis)
- Horizontally scalable
- Zero cross-tenant data leakage
- API keys hashed, never plaintext

## Deliverable
Architecture document with SQL schemas, middleware pseudocode, route structure, and trade-off analysis for each major decision.`,

      llama: `[INST] You are a senior backend architect specializing in multi-tenant SaaS on Node.js + PostgreSQL.

Design the backend architecture for a new multi-tenant SaaS app.

Stack: Node.js + PostgreSQL + Express or Fastify

Cover these design areas:

1. Multi-tenancy database strategy
   - Compare row-level security vs separate schemas vs tenant_id column
   - Recommend one for ~100s of tenants
   - Provide core schema (tenants, users, api_keys, plans)

2. Tiered rate limiting
   - Free / Pro / Enterprise tiers
   - Middleware vs gateway enforcement
   - Real-time tier changes without restart

3. API key authentication
   - Generation, hashed storage, validation
   - Tenant identification from key
   - Rotation strategy

4. API structure
   - RESTful routes with tenant context
   - Middleware chain: auth → tenant → rate limit → handler

Constraints:
- PostgreSQL only for MVP (no Redis)
- Horizontally scalable
- Zero cross-tenant leakage
- API keys hashed, never plaintext

Output: SQL schemas, middleware pseudocode, route structure, trade-off analysis. [/INST]`,

      reasoning: `Design multi-tenant SaaS backend architecture.

Stack: Node.js + PostgreSQL + Express/Fastify. Scale: ~100s of tenants.

Decide and justify:
1. Multi-tenancy strategy (RLS vs schemas vs tenant_id column) — pick one
2. Tiered rate limiting (Free/Pro/Enterprise) — must support real-time tier changes
3. API key auth (generation, hashed storage, rotation, tenant identification)
4. API structure (middleware chain: auth → tenant → rate limit → handler)

Hard constraints:
- PostgreSQL only (no Redis for MVP)
- Horizontally scalable
- Zero cross-tenant data leakage
- API keys must be hashed at rest

Deliver: core SQL schema, middleware pseudocode, RESTful route structure, trade-off analysis for each major decision.`,
    },
  },
  {
    id: 'refactor-middleware',
    label: 'Refactor Middleware',
    icon: '♻️',
    category: 'refactor',
    rawInput: `we have this old Express middleware that handles auth and it's like 500 lines in one file and it's doing way too many things, it checks JWT tokens and also handles role-based access control and also does rate limiting and logging all in one giant function, I want to break it apart into separate middleware functions that each do one thing, and also add proper TypeScript types because right now it's all any types everywhere, oh and we need to keep backward compatibility with the existing route handlers that depend on req.user being set`,
    components: {
      task_type: 'refactor',
      context: 'Legacy Express middleware file (~500 lines) handling auth, RBAC, rate limiting, and logging in a single monolithic function. Currently JavaScript with no TypeScript types. Route handlers depend on req.user being populated.',
      objective: 'Break the monolithic middleware into separate, single-responsibility middleware functions with proper TypeScript types while maintaining backward compatibility.',
      tech_stack: ['Express', 'TypeScript', 'JWT'],
      constraints: [
        'Must maintain backward compatibility — req.user must still be set for existing route handlers',
        'Each middleware should have a single responsibility',
        'Add proper TypeScript types (no more any)',
        'Existing route handler signatures should not need to change',
      ],
      expected_output: 'Refactored middleware files with TypeScript types and a migration guide.',
      edge_cases: 'Middleware ordering dependencies — rate limiting may need to run before or after auth depending on whether unauthenticated requests should be rate-limited.',
      priority: 'Clean separation of concerns while preserving req.user contract',
      ambiguities: [
        'Whether rate limiting should apply to unauthenticated requests',
        'The specific roles in the RBAC system',
        'Whether logging should capture request body or just metadata',
      ],
    },
    optimizedPrompts: {
      claude: `<context>
Legacy Express middleware: ~500 lines in one file.
Currently handles four concerns in a single function: JWT auth, role-based access control, rate limiting, and request logging.
Written in JavaScript with \`any\` types throughout.
All existing route handlers depend on \`req.user\` being populated by this middleware.
</context>

<task>
Refactor the monolithic middleware into separate, composable middleware functions:

1. \`authMiddleware\` — JWT token validation and \`req.user\` population
   - Verify JWT from Authorization header
   - Decode and attach typed user object to \`req.user\`
   - Handle expired/invalid tokens with proper error responses

2. \`rbacMiddleware(allowedRoles: Role[])\` — Role-based access control
   - Factory function that returns middleware for specific role requirements
   - Reads from \`req.user\` (depends on authMiddleware running first)
   - Returns 403 with clear error message if role check fails

3. \`rateLimitMiddleware\` — Request rate limiting
   - Per-user or per-IP rate limiting
   - Configurable limits (window, max requests)
   - Returns 429 with Retry-After header

4. \`requestLogger\` — Structured request logging
   - Log method, path, status code, duration
   - Attach request ID for tracing
   - Do NOT log request bodies (security)

5. TypeScript types
   - Define \`AuthenticatedRequest\` extending Express Request with typed \`user\` property
   - Define \`User\`, \`Role\`, and config interfaces
   - Export all types for use in route handlers
</task>

<constraints>
- \`req.user\` must remain available to all downstream handlers — do NOT change this contract
- Existing route handler function signatures must not need modification
- Each middleware must be independently testable
- Use proper TypeScript types everywhere — zero \`any\` usage
- Middleware must be composable: routes can use any combination
</constraints>

<output_format>
Provide these files:
1. \`types.ts\` — All TypeScript interfaces
2. \`auth.ts\` — JWT auth middleware
3. \`rbac.ts\` — Role-based access control middleware
4. \`rateLimit.ts\` — Rate limiting middleware
5. \`logger.ts\` — Request logging middleware
6. \`index.ts\` — Re-exports + a \`defaultMiddleware\` stack for backward compatibility
7. Brief migration guide showing before/after route setup
</output_format>`,

      gpt: `**System:** You are a senior Node.js/Express developer specializing in middleware architecture and TypeScript migrations. You write clean, testable code with strong type safety.

**User:** I need to refactor a monolithic Express middleware file (~500 lines) that currently handles everything in one giant function. Break it into clean, single-responsibility middlewares.

## Current State
One file doing **four things** in one function:
1. JWT token validation + \`req.user\` population
2. Role-based access control (RBAC)
3. Rate limiting
4. Request logging

All written in JavaScript with \`any\` types everywhere.

## What I Need

### Separate Middleware Files
- **\`auth.ts\`** — JWT verification, decode token, attach typed user to \`req.user\`
- **\`rbac.ts\`** — Factory function: \`rbacMiddleware(allowedRoles: Role[])\` that checks \`req.user.role\`
- **\`rateLimit.ts\`** — Per-user/per-IP rate limiting with configurable windows, returns 429 with Retry-After
- **\`logger.ts\`** — Structured logging (method, path, status, duration, request ID). **Do not log request bodies.**
- **\`types.ts\`** — \`AuthenticatedRequest\`, \`User\`, \`Role\`, config interfaces
- **\`index.ts\`** — Re-exports + backward-compatible \`defaultMiddleware\` stack

### Critical Constraint
**\`req.user\` must remain set** exactly as it is today — existing route handlers depend on this and must not need changes.

## Output
All 6 files with full TypeScript types (zero \`any\`), plus a brief migration guide showing before/after route setup.`,

      gemini: `# Task: Refactor Monolithic Express Middleware

You are a senior Node.js/Express engineer specializing in middleware architecture and TypeScript migrations.

## Current State
A single ~500-line Express middleware file handles four concerns in one function:
1. JWT token validation + \`req.user\` population
2. Role-based access control
3. Rate limiting
4. Request logging

Written in JavaScript with \`any\` types throughout. All route handlers depend on \`req.user\` being set.

## Goal
Break it into separate, single-responsibility middleware files with proper TypeScript types.

## Required Files
- \`auth.ts\` — JWT verification + \`req.user\` population
- \`rbac.ts\` — Factory: \`rbacMiddleware(allowedRoles: Role[])\`
- \`rateLimit.ts\` — Per-user/per-IP limiting with 429 + Retry-After
- \`logger.ts\` — Structured logging (no request bodies)
- \`types.ts\` — \`AuthenticatedRequest\`, \`User\`, \`Role\`
- \`index.ts\` — Re-exports + backward-compat \`defaultMiddleware\` stack

## Critical Constraint
**\`req.user\` must remain available** to all existing route handlers without changes to their signatures.

## Constraints
- Zero \`any\` types
- Each middleware independently testable
- All middlewares composable

## Deliverable
All 6 files plus a brief migration guide with before/after route setup examples.`,

      llama: `[INST] You are a senior Node.js/Express engineer. Refactor a monolithic middleware file.

Current state:
- ~500-line Express middleware in one file
- Handles JWT auth, RBAC, rate limiting, and request logging in one function
- JavaScript with \`any\` types everywhere
- All route handlers depend on req.user being set

Refactor into:
- auth.ts — JWT verification + req.user population
- rbac.ts — Factory: rbacMiddleware(allowedRoles: Role[])
- rateLimit.ts — Per-user/per-IP with 429 + Retry-After
- logger.ts — Structured logging, no request bodies
- types.ts — AuthenticatedRequest, User, Role types
- index.ts — Re-exports + backward-compat defaultMiddleware stack

Critical:
- req.user contract must not change — existing handlers must work unmodified
- Zero any types
- Each middleware independently testable
- Composable

Deliver all 6 files plus a brief migration guide. [/INST]`,

      reasoning: `Refactor a 500-line monolithic Express middleware into clean single-responsibility modules.

Current: one function does JWT auth, RBAC, rate limiting, and logging. All JavaScript with \`any\` types. Route handlers depend on \`req.user\`.

Split into: auth.ts (JWT + req.user), rbac.ts (role factory), rateLimit.ts (429 + Retry-After), logger.ts (no bodies), types.ts, index.ts (backward-compat default stack).

Hard constraints:
- req.user contract must not change — existing route handlers stay untouched
- Zero \`any\` types
- Each middleware independently testable and composable

Deliver all 6 files plus a brief before/after migration guide.`,
    },
  },
];

export function getExampleById(id: string): ExamplePrompt | undefined {
  return EXAMPLES.find((e) => e.id === id);
}
