# Coding Conventions

**Analysis Date:** 2026-02-22

## Naming Patterns

**Files:**
- JavaScript files use lowercase with hyphens for multi-word names: `theme-scheme.js`, `insertScript.js`
- Configuration files use camelCase with dots: `.eslintrc.yml`, `.prettierrc.yml`
- HTML template files use lowercase with hyphens: `navbar-2.html`, `footer.html`
- SCSS/CSS override files match their purpose: `override.scss`

**Functions:**
- camelCase for function names: `updateNavBar()`, `toggleSidebar()`, `detectDeviceState()`, `getDeviceState()`, `insertScript()`
- Private helper functions use camelCase: `toggleCourseVisibility()`, `addCopyButtons()`, `setScheme()`, `getPreferredColorScheme()`
- Exported functions clearly marked with `export`: `export const insertScript = ...`

**Variables:**
- camelCase for all variable names: `deviceState`, `topNavbar`, `navbarToggler`, `themeIcon`, `scriptTag`
- Constants use UPPERCASE_SNAKE_CASE: `PERSISTENCE_KEY`, `THEME_DARK`, `THEME_LIGHT`, `THEME_DEFAULT`
- Single-letter or short variables acceptable only for loop iterators: `el`, `btn`, `e` (event)
- DOM element references prefixed with `$` or descriptive names: `$icon`, `$img`, `topNavbar`

**Types:**
- No TypeScript configuration detected. codebase is vanilla JavaScript.
- JSDoc comments describe function parameters and return values

**CSS/SCSS:**
- CSS custom properties (variables) use lowercase with hyphens: `--hero-bg-color`, `--hero-text-color`, `--text-xs`, `--tracking-wide`
- BEM-like class naming with hyphens: `navbar-collapse`, `card-title`, `hero-wrapper`, `logo-holder`
- SCSS nesting follows component structure, not deep nesting (max 3-4 levels)
- Media query breakpoints reference Bootstrap mixins: `@include media-breakpoint-down(md)`, `@include media-breakpoint-up(md)`

## Code Style

**Formatting:**
- Tool: Prettier
- Print width: 100 characters
- Tab width: 2 spaces
- Semicolons: disabled (semi: false)
- Quotes: single quotes ('string' not "string")
- Trailing commas: enabled for all (trailing-comma: "all")

**Linting:**
- Tool: ESLint with standard config
- Environment: browser and ES2021
- Extensions: `eslint-config-prettier` (disables conflicts with Prettier)
- Special plugin: `eslint-plugin-no-jquery` with all rules enabled (encourages vanilla JavaScript)
- Parser options: ES modules with latest ECMAVersion

**Key ESLint Rules:**
- No jQuery usage enforced via `eslint-plugin-no-jquery/all`
- Standard JS rules applied (`eslint-config-standard`)
- Configuration: `/Users/artem/Desktop/Personal-projects/my-portfolio/themes/toha/.eslintrc.yml`

## Import Organization

**Order:**
1. Third-party libraries: `import 'popper.js'`, `import 'bootstrap'`, `import '@fortawesome/fontawesome-free/js/all'`
2. Named package imports: `import Filterizr from 'filterizr'`, `import feather from 'feather-icons'`
3. Relative module imports: `import { insertScript } from '../core'`, `import { getDeviceState } from '../core/device'`
4. Hugo parameters: `import * as params from '@params'`

**Path Aliases:**
- `@params` maps to Hugo build parameters
- Theme assets use relative imports: `../core`, `../core/device`
- Barrel files used for organizing exports: `export * from './device'` in `core/index.js`

**Module Loading Pattern:**
- ES module syntax: `import` / `export`
- Hugo handles bundling and minification
- Modules loaded via `application.js` entry point in `assets/scripts/`

## Error Handling

**Patterns:**
- Null/undefined checks using optional chaining: `topNavbar?.classList.remove()`, `menu?.getElementsByTagName()`
- Explicit null comparison: `if (menu == null)` and `if (sidebar == null)` (not `!menu`)
- Guard clauses to return early: `if (sidebar == null) { return }`
- Defensive DOM selection: `document.getElementById()` returns null if not found, checked before use
- try/catch not observed in codebase; errors not explicitly thrown
- Async operations: `window.addEventListener('load', async () => { ... })`

**Error Prevention:**
- DOM elements checked before method calls
- Array operations use `Array.from()` for NodeLists to ensure array methods available
- Default values provided in ternary operators: `typeof themeOptions.dark === 'undefined' ? true : themeOptions.dark`
- LocalStorage operations wrapped in functions without error handling (assumes browser API available)

## Logging

**Framework:** console (no logging framework detected)

**Patterns:**
- No logging calls found in codebase (debugging via browser DevTools)
- Comments used for inline documentation instead of console logs
- Event handlers and state changes rely on DOM mutations for side effects

## Comments

**When to Comment:**
- Use comments for non-obvious logic or browser API interactions
- Document event binding intentions: `// bind click event to #sidebar-toggler in navbar-2.html`
- Explain complex selectors or CSS workarounds

**JSDoc/TSDoc:**
- Not systematically used
- Function documentation through inline comments instead
- Example: `// returns a copy of the device state so other parts of code can't override this.` in `device.js`

**Comment Style:**
- Single-line comments: `// comment`
- Multi-line comments for section headers in SCSS:
  ```scss
  // ============================================================
  // SECTION NAME
  // ============================================================
  ```

## Function Design

**Size:** Functions are compact and focused
- `updateNavBar()`: 25 lines
- `toggleSidebar()`: 17 lines
- `insertScript()`: 10 lines
- Most helper functions under 30 lines

**Parameters:**
- Minimal parameters (0-2 typically)
- Uses object destructuring for options: `{ controlsSelector }` in Filterizr initialization
- Uses dataset attributes for passing data: `container.getAttribute('data-section')`, `btn.dataset.scheme`

**Return Values:**
- Explicit return statements
- Functions performing DOM mutations often return nothing (void)
- State getter functions return object copies for immutability: `return { ...deviceState }`
- Arrow functions used for callbacks: `const button = document.createElement('button')`

**Arrow Function Usage:**
- Event listeners: `.addEventListener('click', (e) => { ... })`
- Callbacks and array operations: `.forEach((el) => el.addEventListener(...))`
- State setters and getters: `const setScheme = (newScheme) => { ... }`

## Module Design

**Exports:**
- Selective exports using `export const` and `export function`
- Re-exports via barrel files: `export * from './device'`
- No default exports observed

**Barrel Files:**
- `core/index.js` aggregates: `export * from './device'` and `export * from './insertScript'`
- `sections/index.js` imports all section modules
- `features/index.js` imports all feature modules
- Pattern reduces import complexity at application level

**File Organization:**
- Modules organized by feature area: `sections/`, `features/`, `core/`
- Each section/feature in own directory with `index.js` entry point
- Small utilities (`insertScript.js`) exported from core module

## Code Patterns

**DOM Manipulation:**
- Direct DOM manipulation via `document.getElementById()`, `document.querySelector()`, `document.querySelectorAll()`
- Class toggling: `.classList.add()`, `.classList.remove()`, `.classList.toggle()`
- Attribute manipulation: `.setAttribute()`, `.getAttribute()`, `.dataset` property access
- Style manipulation: `.style.display = 'none'` for direct visibility control

**Event Binding:**
- `DOMContentLoaded` listener to ensure DOM ready before manipulation
- Direct event listener binding: `.addEventListener('click', handler)`
- Implicit event delegation for dynamically created elements
- Target detection via `e.target.tagName` and `e.target.classList`

**State Management:**
- LocalStorage for persistence: `localStorage.getItem()`, `localStorage.setItem()`
- Module-level variables for state: `let deviceState = { ... }`
- Immutable state copies: `return { ...deviceState }` prevents external mutation

**Configuration:**
- Hugo parameters injected via `@params`: `import * as params from '@params'`
- Theme configuration accessed from params: `params.theme.dark`, `params.theme.light`
- Constants derived from params with defaults: `const THEME_DARK = typeof themeOptions.dark === 'undefined' ? true : themeOptions.dark`

---

*Convention analysis: 2026-02-22*
