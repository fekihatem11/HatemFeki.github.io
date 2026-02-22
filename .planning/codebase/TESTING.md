# Testing Patterns

**Analysis Date:** 2026-02-22

## Test Framework

**Status:** Not detected

This is a Hugo static site generator project with vanilla JavaScript for interactivity. No testing framework is configured:

- Jest: not installed
- Vitest: not installed
- Mocha: not installed
- Chai, Jasmine, or other assertion libraries: not installed
- Test configuration files (jest.config.js, vitest.config.ts, mocha.opts): not found
- Test scripts in package.json: none

**Build Configuration:**
- Hugo handles site generation
- ESLint and Prettier for code quality only
- No unit test runner installed

## Test File Organization

**Current State:** No test files exist

No `.test.js`, `.spec.js`, `.test.ts`, or `.spec.ts` files found anywhere in the project (excluding `node_modules`).

**Observation:** The codebase is primarily frontend interactivity scripts for a static site. Testing would require:
1. A test runner (Jest, Vitest, etc.)
2. DOM testing utilities (jsdom, @testing-library/dom)
3. Test file structure convention (co-located with source or in separate `/tests` directory)

## Testing Strategy (Not Implemented)

**If testing were to be added:**

**Test Location Pattern (recommended):**
```
assets/scripts/
├── core/
│   ├── device.js
│   ├── device.test.js          # Co-located tests
│   ├── insertScript.js
│   └── insertScript.test.js
├── sections/
│   ├── navbar.js
│   ├── navbar.test.js
│   └── ...
└── features/
    ├── darkmode/
    │   ├── index.js
    │   └── index.test.js
    └── ...
```

**Alternative (separate directory):**
```
tests/
├── unit/
│   ├── core/
│   │   ├── device.test.js
│   │   └── insertScript.test.js
│   ├── sections/
│   │   └── navbar.test.js
│   └── features/
│       └── darkmode.test.js
├── integration/
└── fixtures/
```

## Module Testing Patterns (Hypothetical)

Based on code structure, testable modules:

**Module: `core/device.js`**
```javascript
// Hypothetical test structure
import { getDeviceState } from './device'

describe('device state detection', () => {
  // Test device state based on window.innerWidth
  // Mock window.innerWidth and trigger resize event
  // Verify getDeviceState() returns correct values
})
```

**Testable Aspects:**
- Window width breakpoint detection (425px, 768px)
- Device state object structure and immutability
- Resize event listener registration

**Module: `core/insertScript.js`**
```javascript
// Hypothetical test structure
import { insertScript } from './insertScript'

describe('insertScript', () => {
  // Test script element creation
  // Test script attributes (id, src, defer, async)
  // Test insertion into DOM
  // Test idempotency (not re-inserting if exists)
  // Test onload callback execution
})
```

**Testable Aspects:**
- DOM element creation
- Attribute assignment
- Document structure manipulation
- Callback execution

**Module: `sections/navbar.js`**
```javascript
// Hypothetical test structure
describe('navbar scroll behavior', () => {
  // Mock DOM elements (#top-navbar, #navbar-toggler, etc.)
  // Simulate scroll events at different scroll positions
  // Verify class additions/removals
  // Verify logo switching
})
```

**Testable Aspects:**
- Class toggling based on scroll position
- DOM element selection
- Conditional class manipulation

## Mocking Patterns (Not Currently Used)

**If testing were implemented, mocking strategy would be:**

**DOM Mocking:**
```javascript
// Mock window and document objects
// Use jsdom or @testing-library/dom
const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
global.window = dom.window
global.document = dom.window.document
```

**LocalStorage Mocking:**
```javascript
// Mock localStorage for theme persistence tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock
```

**Window.matchMedia Mocking:**
```javascript
// Mock media queries for color scheme detection
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))
})
```

**Event Mocking:**
```javascript
// Simulate DOMContentLoaded
const event = new Event('DOMContentLoaded')
document.dispatchEvent(event)

// Simulate scroll events
window.scrollY = 50
window.dispatchEvent(new Event('scroll'))

// Simulate click events
element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
```

## What Would Be Tested

**Unit Tests (per module):**

`core/device.js`:
- Breakpoint detection for mobile (≤425px), tablet (≤768px), laptop (>768px)
- getDeviceState() immutability (returns copy, not reference)
- Resize event listener adds/removes properly

`core/insertScript.js`:
- Script element creation with correct attributes
- Idempotency (calling twice doesn't insert twice)
- Callback execution on script load
- Defer and async flags set correctly

`sections/navbar.js`:
- updateNavBar() applies correct classes at different scroll positions
- Logo switching logic
- Mobile nav collapse on link click
- Class removal of unrelated elements

`sections/sidebar.js`:
- toggleSidebar() expands/collapses correctly
- Hero area hiding on mobile
- Content section toggle
- Interaction with TOC section

`sections/skills.js` and `sections/projects.js`:
- Filterizr initialization with correct selector
- Filter button rendering
- Card filtering functionality

`features/darkmode/index.js` and `features/theme/index.js`:
- Dark/light mode toggle
- LocalStorage persistence
- System preference detection via matchMedia
- Icon switching
- Logo visibility toggling
- Preference loading and saving

**Integration Tests:**
- Scroll triggering navbar appearance
- Theme persistence across page reload
- Multiple filtering systems coexisting
- Sidebar toggle with TOC interaction

## Coverage Gaps (Not Measurable)

Since no testing framework is installed, coverage cannot be measured. However, untested areas would include:

- Filterizr library integration (filter button click handling)
- Bootstrap/Popper.js DOM manipulation
- FontAwesome icon rendering
- Hugo-generated HTML structure assumptions

## Test Commands (Not Applicable)

No test scripts configured in `package.json`. If Jest were added:

```bash
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Generate coverage report
```

## Current Quality Assurance

**What replaces testing:**

1. **ESLint static analysis:** `/Users/artem/Desktop/Personal-projects/my-portfolio/themes/toha/.eslintrc.yml`
   - Validates code style and prevents common errors
   - Enforces no jQuery usage

2. **Prettier code formatting:** `/Users/artem/Desktop/Personal-projects/my-portfolio/themes/toha/.prettierrc.yml`
   - Enforces consistent formatting across modules

3. **Manual testing:** Git commit messages indicate careful feature validation
   - Commits describe specific UI changes
   - "feat(quick-4): remove theme switcher..." shows deliberate testing before commit

4. **Browser DevTools:** Direct manual testing in browser
   - DOM inspection for structure
   - Network tab for resource loading
   - Console for runtime errors

---

*Testing analysis: 2026-02-22*
