# GitHub Copilot Instructions for Globokit

This document provides instructions for GitHub Copilot when working in this repository.

## Project Overview

**Globokit** is a modern online toolkit platform for international trade professionals, built with Next.js 14 App Router. The project uses a pure frontend architecture where all calculations run locally in the browser without backend dependencies.

- **Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Shadcn UI, Radix UI
- **Deployment**: Vercel
- **License**: GPL-3.0-only
- **Language**: Simplified Chinese for comments and commit messages, English for technical terms

## Development Workflow

### Common Commands

```bash
npm run dev              # Development server (http://localhost:3000)
npm run build            # Production build
npm run lint             # ESLint check
npx tsc --noEmit         # TypeScript validation
npm run validate:data    # Validate JSON data assets
```

### Code Style

1. **Language Convention**
   - Code comments: Simplified Chinese
   - Variable/function names: English
   - Git commit messages: Simplified Chinese with English tech terms
   - File header comments: Use structured format (see below)

2. **TypeScript**
   - Strict mode enabled
   - Avoid `any` type
   - Explicit return types for exported functions

3. **Styling**
   - Use Tailwind CSS utility classes
   - Dark mode support via `dark:` prefix
   - Reuse Shadcn UI components instead of building from scratch

4. **File Header Format**
   ```typescript
   // 名称: Component/Module Name
   // 描述: Description
   // 路径: Globokit/relative-path
   // 作者: everettlabs
   // 更新时间: YYYY-MM-DD
   ```

## Architecture Patterns

### Tool Registry System (CRITICAL)

The project uses a **centralized registry pattern** to manage tool metadata. Never hardcode tool lists in multiple places.

**Registry Structure**:
- `lib/tools/registry.ts` - Main registry entry point
- `lib/tools/registry-{finance|logistics|general|barcode}.ts` - Category-specific registries
- `lib/tools/registry-types.ts` - Type definitions

**When adding a new tool**:
1. Add metadata to the appropriate category registry
2. Required fields: `id`, `slug`, `title`, `shortTitle`, `description`, `category`, `iconName`, `href`, `updatedAt`
3. The registry automatically updates: homepage, navigation, sitemap, SEO metadata

### Directory Structure Convention

```
app/tools/{tool-slug}/
  ├── page.tsx              # Page entry (composes form + result components)
  ├── {tool}-form.tsx       # Input form component
  ├── {tool}-result.tsx     # Result display component
  └── {tool}-data.ts        # Static data (optional)

lib/tools/
  ├── {tool-name}.ts        # Pure function algorithms
  └── data/                 # JSON data assets
```

### Separation of Concerns

- **Algorithm Layer** (`lib/tools/`): Pure functions, no side effects, easy to test
- **UI Layer** (`app/tools/`): React components for state management and user interaction
- **Data Assets** (`lib/tools/data/`): Large static data stored as JSON, exported via TypeScript facade

## Data Asset Management

The project includes structured country information and holiday data (2025-2027) in `lib/tools/data/`:

- `global-country-info.json` - Information for 171 countries
- `holidays-{year}.json` / `holidays-curated-{year}.json` - Annual holiday data
- `holiday-country-overrides.json` - Manual country information corrections
- `holiday-observances.json` - International and religious holidays

**Important**: After modifying any data assets, always run `npm run validate:data` to verify schema compliance.

## Component Patterns

### Naming Conventions

- Page components: `{ToolName}Page` or `export default function`
- Form components: `{ToolName}Form`
- Result components: `{ToolName}Result`
- Data files: `{tool-name}-data.ts`

### Layout Patterns

Most tool pages use consistent responsive layout:

```tsx
<div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
  <Card>{/* Form section */}</Card>
  <Card>{/* Result section */}</Card>
</div>
```

- Stat cards: `md:grid-cols-4`
- Page title section: `mb-8`
- Main grid gap: `gap-6`

### Path Aliases

Use `@/*` to reference project root:

```typescript
import { SITE_NAME } from '@/lib/site'
import { Button } from '@/components/ui/button'
```

## Partner Resources

Business resources (proxies, hosting, AI tools) are centrally managed in `lib/partner-resources.ts`:

```typescript
export interface PartnerResource {
  id: string
  name: string
  type: PartnerResourceType  // 客户开发, 代理网络, AI 工具, etc.
  href: string
  description: string
  bestFor: string[]
  badge?: string
}
```

New resources automatically appear on the `/resources` page in the corresponding category.

## Version Release Process

When releasing a new version:

1. Update version in `package.json` and `package-lock.json` (follow SemVer)
2. Document changes in `CHANGELOG.md` (新增, 优化, 修复)
3. Update version number and feature list in `README.md`
4. Verify with `npm run validate:data` and `npm run build`
5. Create matching Git tag and GitHub Release

## Important Reminders

- **No Backend**: All calculations run in browser, no API calls
- **Use Registry**: Don't hardcode tool lists, always use the registry system
- **Update All**: When adding tools, update registry, navigation, README, and CHANGELOG
- **Large Data**: Extract datasets over 1000 lines to JSON data assets
- **Validate Data**: Run `npm run validate:data` after modifying data assets
- **Commit Style**: Simplified Chinese messages with English tech terms

## Code Generation Guidelines

When generating code:

1. Match existing code style and patterns
2. Use pure functions for calculation logic
3. Separate UI and business logic
4. Include proper TypeScript types
5. Add file header comments
6. Follow responsive layout patterns
7. Reuse existing Shadcn UI components
8. Validate data assets if modifying JSON files
