# Testing Patterns

**Analysis Date:** 2026-02-16

## Test Framework

**Status:** No test framework detected

**What's configured:**
- No Jest, Vitest, Mocha, or other test framework found
- No test configuration files (`jest.config.js`, `vitest.config.ts`, etc.)
- No test scripts in `package.json`
- No `.test.js` or `.spec.js` files in the codebase

**Development dependencies:**
- No testing libraries in `package.json` dependencies
- Project uses Prettier for formatting and ESLint for linting, but no testing infrastructure

## Testing Gap Analysis

**Current state:**
- This is a Hugo portfolio theme (`themes/toha/`) with JavaScript client-side code
- 38 JavaScript files across modules (`core/`, `sections/`, `features/`, `pages/`)
- Zero test coverage

**High-risk, untested modules:**

**DOM State Management (`core/device.js`):**
- What's tested: Nothing
- Risk: Device state detection (mobile/tablet/laptop) broken unnoticed
- Files: `themes/toha/assets/scripts/core/device.js` (36 lines)
- Impact: Mobile responsiveness depends on this; breakage affects entire site

**Theme Switching (`features/theme/index.js`, `features/darkmode/index.js`):**
- What's tested: Nothing
- Risk: localStorage handling, CSS attribute updates, icon switching
- Files:
  - `themes/toha/assets/scripts/features/theme/index.js` (88 lines)
  - `themes/toha/assets/scripts/features/darkmode/index.js` (70 lines)
- Impact: Dark mode broken unnoticed; localStorage issues silently fail

**Gallery Layout (`sections/achievements.js`):**
- What's tested: Nothing
- Risk: Responsive layout calculations (232 lines of layout logic)
- Files: `themes/toha/assets/scripts/sections/achievements.js`
- Impact: Achievement gallery may render incorrectly without catching errors

**Navigation (`sections/sidebar.js`, `sections/navbar.js`):**
- What's tested: Nothing
- Risk: Toggle state management, DOM manipulation
- Files:
  - `themes/toha/assets/scripts/sections/sidebar.js` (38 lines)
  - `themes/toha/assets/scripts/sections/navbar.js` (63 lines)
- Impact: Navigation broken unnoticed on responsive layouts

**DOM Utilities (`core/insertScript.js`):**
- What's tested: Nothing
- Risk: Script injection, async/defer behavior
- Files: `themes/toha/assets/scripts/core/insertScript.js` (14 lines)
- Impact: Feature flags may not load scripts correctly

## Recommended Testing Strategy

**Phase 1: Unit Tests**
- Test framework: Vitest (lightweight, ESM-first, suitable for ES modules)
- Setup in `themes/toha/`

**Test structure:**
```
themes/toha/
├── assets/scripts/
│   ├── core/
│   │   ├── device.js
│   │   ├── device.test.js        (NEW)
│   │   └── insertScript.test.js  (NEW)
│   ├── features/
│   │   └── theme/
│   │       ├── index.js
│   │       └── index.test.js     (NEW)
```

**Mock strategy for browser APIs:**
- Mock `localStorage`
- Mock `window.matchMedia()` for theme preference detection
- Mock `document.querySelector()`, `getElementById()` with JSDOM
- Mock `window.addEventListener()`

**Integration tests:**
- Verify DOM manipulation with mocked DOM
- Test state propagation through modules
- Test event listener binding and triggering

## What to Test First (Priority Order)

**1. Device State Detection (`core/device.js`):**
```javascript
// Should test viewport size detection
// Should update state on window resize
// Should return copy of state (immutability)
```

**2. Theme Persistence (`features/theme/index.js`):**
```javascript
// Should load saved theme from localStorage
// Should fall back to system preference
// Should save theme selection
// Should update HTML data-theme attribute
// Should apply correct icon
```

**3. DOM State Toggles (`sections/sidebar.js`, `sections/navbar.js`):**
```javascript
// Should toggle class on element
// Should manage related elements correctly
// Should handle null/missing elements gracefully
```

**4. Module Exports (`core/index.js`):**
```javascript
// Should export device utilities
// Should export script insertion utilities
```

## Current Code Quality Observations

**Strengths:**
- Modular organization by feature/section
- Clear separation of concerns
- Barrel files organize exports
- Comments explain non-obvious behavior
- Early returns prevent nesting

**Test-blocking patterns:**
- Heavy DOM coupling - requires mocked DOM for testing
- localStorage direct access - requires mocking
- window object side effects - requires mocking
- No dependency injection - services tightly coupled to globals
- No abstraction layer for DOM operations

**Refactoring needed for testability:**
- Extract pure functions from DOM-coupled code
- Create abstraction for localStorage access
- Create abstraction for window/document global access
- Separate business logic from DOM manipulation

## Setting Up Tests

**Recommended configuration:**

**`themes/toha/vitest.config.js`:**
```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/*.test.js'],
  },
})
```

**`themes/toha/package.json` updates:**
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "jsdom": "^23.0.0",
  },
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

**Fixture example:**
```javascript
// features/theme/index.test.js
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest'

describe('Theme Module', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    document.documentElement.removeAttribute('data-theme')
  })

  it('should load saved theme from localStorage', () => {
    localStorage.setItem('theme-scheme', 'dark')
    // Import and run module initialization
    // Assert theme applied
  })
})
```

## Code Coverage Gaps by Module

| Module | Lines | Complexity | Test Status | Priority |
|--------|-------|-----------|------------|----------|
| `core/device.js` | 36 | Medium | Untested | High |
| `core/insertScript.js` | 14 | Low | Untested | Medium |
| `features/theme/index.js` | 88 | High | Untested | High |
| `features/darkmode/index.js` | 70 | High | Untested | High |
| `sections/achievements.js` | 232 | Very High | Untested | High |
| `sections/navbar.js` | 63 | Medium | Untested | High |
| `sections/sidebar.js` | 38 | Low | Untested | Medium |
| `sections/education.js` | 30 | Low | Untested | Low |
| `features/copyCode/copyCode.js` | 22 | Low | Untested | Low |

**Total lines of untested code: ~593 lines**

## Known Testing Risks

**Risk 1: localStorage not cleared between browser sessions**
- Files: `features/theme/index.js`, `features/darkmode/index.js`
- Impact: Theme preference persists incorrectly, confusing users
- Test needed: Verify localStorage cleared, system preference as fallback

**Risk 2: Device state calculation on viewport size**
- Files: `core/device.js`
- Impact: Breakpoints may be off (425px, 768px are hardcoded)
- Test needed: Mock window.innerWidth at boundary values

**Risk 3: DOM manipulation with null element references**
- Files: `sections/achievements.js`, `sections/navbar.js`, `sections/sidebar.js`
- Impact: Silent failures when DOM structure changes
- Test needed: Test with missing elements, verify graceful handling

**Risk 4: Event listener binding on DOMContentLoaded**
- Files: Multiple section files
- Impact: Event listeners may not bind if DOM structure changes
- Test needed: Mock and verify addEventListener calls

---

*Testing analysis: 2026-02-16*
