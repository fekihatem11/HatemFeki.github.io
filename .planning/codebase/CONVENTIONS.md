# Coding Conventions

**Analysis Date:** 2026-02-16

## Naming Patterns

**Files:**
- Kebab-case for feature modules: `theme-scheme.js`, `insertScript.js`
- Kebab-case for directory names: `features/`, `sections/`, `core/`
- Barrel files use `index.js` convention: `core/index.js`, `features/index.js`

**Functions:**
- camelCase for all function names: `toggleSidebar()`, `getDeviceState()`, `setScheme()`
- Private helper functions within modules use camelCase: `fourColumnRow()`, `loadScheme()`, `setImages()`
- Event handler functions typically descriptive: `updateNavBar()`, `toggleCourseVisibility()`, `toggleTOC()`

**Variables:**
- camelCase for variable names: `deviceState`, `theme`, `sidebar`
- Constants use UPPER_SNAKE_CASE: `PERSISTENCE_KEY`, `FEATURE_VIDEOPLAYER`
- DOM references use `$` prefix by convention in some cases (e.g., `$icon`, `$img`)

**Types/Objects:**
- Objects use camelCase property names: `deviceState = { isMobile: false, isTablet: false, isLaptop: false }`
- Data attributes in HTML use kebab-case: `data-section`, `data-scheme`, `data-theme`

## Code Style

**Formatting:**
- Prettier config (`themes/toha/.prettierrc.yml`):
  - `printWidth: 100` - Lines wrap at 100 characters
  - `tabWidth: 2` - Indent with 2 spaces
  - `semi: false` - No semicolons
  - `singleQuote: true` - Use single quotes
  - `trailingComma: "all"` - Trailing commas in multi-line structures

**Linting:**
- ESLint config (`themes/toha/.eslintrc.yml`):
  - Extends `standard` configuration
  - Includes `plugin:no-jquery/all` for jQuery avoidance
  - Extends `prettier` for formatting consistency
  - `ecmaVersion: latest` - Latest JavaScript features
  - `sourceType: module` - ES modules

## Import Organization

**Order:**
1. External libraries/frameworks: `import Filterizr from 'filterizr'`, `import 'bootstrap'`
2. Internal modules: `import { getDeviceState } from '../core/device'`
3. Side effects: `import '@fortawesome/fontawesome-free/js/all'`

**Path Aliases:**
- Uses relative imports with `../` paths
- Barrel exports for module organization: `export * from './device'`, `export * from './insertScript'`
- Hugo params imported via `import * as params from '@params'` for configuration

## Error Handling

**Patterns:**
- Early returns for null/undefined checks: `if (sidebar == null) { return }`
- Loose equality (`==`) used for null checks: `if (element == null)` checks both null and undefined
- Ternary operators for default values: `const value = localStorage.getItem(key) || 'default'`
- Try-catch not explicitly visible in main code; async/await used where needed
- Errors silently handled with early returns rather than explicit throw statements

## Logging

**Framework:** `console.log()` for debugging

**Patterns:**
- Debugging statements left in code: `console.log(i)` appears in `sections/achievements.js` line 56
- No structured logging framework
- No log level management

## Comments

**When to Comment:**
- Comments explain "why" not "what"
- Inline comments for complex logic: `// returns a copy of the device state` before `export function`
- Section headers with dividers: `// ================== Project cards =====================`
- Comments document non-obvious behavior: `// if toc-section is open, then close it first`
- Comments explain business logic: `// if it is mobile device. then scroll to top.`

**JSDoc/TSDoc:**
- Not used; no type annotations or formal documentation
- Plain JavaScript without TypeScript

## Function Design

**Size:** Functions are generally small (5-30 lines), with clear single responsibilities

**Parameters:**
- Functions typically receive 0-3 parameters
- Getter functions return derived state: `export function getDeviceState()` returns copy of internal state
- Event handlers receive standard event objects: `function toggleTOC()`, `function toggleCourseVisibility(elem)`

**Return Values:**
- Getter functions return objects or primitives: `{ ...deviceState }`
- Boolean returns for state checks
- Early returns (no explicit null returns; implicit undefined)

## Module Design

**Exports:**
- Named exports for utilities: `export const insertScript`, `export function getDeviceState()`
- Re-exports via barrel files: `export * from './device'`
- Event listener modules export nothing; side effects on import

**Barrel Files:**
- Used to organize related functionality: `core/index.js`, `sections/index.js`, `features/index.js`
- Barrel imports trigger module initialization: `import './core'` loads all core functionality
- Conditional module loading via feature flags: `if (process.env.FEATURE_X === '1') { import('./module') }`

## State Management

**Pattern:** Module-scoped state with accessor functions

**Example from `device.js`:**
```javascript
let deviceState = {
  isMobile: false,
  isTablet: false,
  isLaptop: false
}

function detectDeviceState () {
  // ... update deviceState
}

export function getDeviceState () {
  return { ...deviceState }  // Return copy to prevent external mutation
}
```

**Key Convention:** State is private to module, accessed only through getter functions that return copies

## DOM Manipulation

**Patterns:**
- Direct DOM manipulation via standard Web APIs: `document.getElementById()`, `document.querySelector()`
- Class manipulation for state: `element.classList.add()`, `element.classList.remove()`, `element.classList.toggle()`
- Data attributes for configuration: `element.getAttribute('data-section')`
- Event delegation with `addEventListener()`

**Selector Types:**
- ID selectors: `document.getElementById('sidebar-section')`
- Class selectors with `querySelectorAll()`: `document.querySelectorAll('pre > code')`
- Tag selectors: `element.getElementsByTagName('a')`
- Class list methods for dynamic behavior

## Null/Undefined Checks

**Convention:** Using loose equality (`==`) specifically for null checks:
```javascript
if (element == null)  // Checks both null and undefined
if (element != null)  // Not null or undefined
```

**Optional chaining:** Modern optional chaining used where available: `topNavbar?.classList.remove()`

## Async Patterns

**Pattern:** Promises used with `addEventListener('load', async () => {...})`
- Window load event waits for DOM and resources
- Dynamic imports with conditional feature flags

---

*Convention analysis: 2026-02-16*
