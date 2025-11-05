# Tailwind CSS Setup

This document describes the Tailwind CSS v4 integration in the Music Notes Guesser application.

## Overview

The project uses **Tailwind CSS v4.1.16**, the latest version of the utility-first CSS framework. Tailwind v4 has a simplified setup compared to v3.

## Installation

Tailwind CSS v4 is installed with the following packages:

```bash
npm install -D tailwindcss @tailwindcss/postcss autoprefixer
```

### Packages Installed:
- `tailwindcss@^4.1.16` - Core Tailwind CSS framework
- `@tailwindcss/postcss@^4.1.16` - PostCSS plugin for Tailwind v4
- `autoprefixer@^10.4.21` - Adds vendor prefixes automatically

## Configuration

### 1. PostCSS Configuration (`postcss.config.js`)

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

**Note:** Tailwind v4 uses `@tailwindcss/postcss` instead of the old `tailwindcss` plugin.

### 2. CSS Import (`src/assets/main.css`)

```css
@import "tailwindcss";
```

**Note:** Tailwind v4 uses a single `@import` statement instead of the three `@tailwind` directives used in v3.

### 3. Main Entry Point (`src/main.ts`)

```typescript
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// ...
```

The Tailwind CSS file is imported at the top of `main.ts` to ensure it's loaded before the Vue app.

## Tailwind v4 Changes

Tailwind CSS v4 introduced several changes from v3:

### Simplified Setup
- **No `tailwind.config.js` required** - Configuration is optional in v4
- **Single CSS import** - Use `@import "tailwindcss"` instead of three `@tailwind` directives
- **New PostCSS plugin** - Use `@tailwindcss/postcss` instead of `tailwindcss`

### Configuration (Optional)

If you need custom configuration, create a `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'music-purple': '#667eea',
        'music-violet': '#764ba2',
      },
    },
  },
  plugins: [],
}
```

## Usage in Components

You can now use Tailwind utility classes in your Vue components:

### Example 1: Basic Utilities

```vue
<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-violet-600">
    <div class="bg-white rounded-lg shadow-xl p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Hello Tailwind!</h1>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        Click Me
      </button>
    </div>
  </div>
</template>
```

### Example 2: Responsive Design

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="p-4 bg-white rounded shadow">Card 1</div>
    <div class="p-4 bg-white rounded shadow">Card 2</div>
    <div class="p-4 bg-white rounded shadow">Card 3</div>
  </div>
</template>
```

### Example 3: Custom Styles with Tailwind

You can mix Tailwind classes with scoped styles:

```vue
<template>
  <div class="container mx-auto px-4">
    <button class="custom-button">Custom Button</button>
  </div>
</template>

<style scoped>
.custom-button {
  @apply px-6 py-3 bg-purple-500 text-white rounded-lg font-semibold;
  @apply hover:bg-purple-600 transition-colors duration-200;
}
</style>
```

## Migrating Existing Styles to Tailwind

The current project uses scoped CSS in `App.vue`. You can gradually migrate to Tailwind:

### Before (Scoped CSS):
```vue
<style scoped>
.container {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
</style>
```

### After (Tailwind):
```vue
<template>
  <div class="bg-white p-10 rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center max-w-[600px] mx-auto">
    <!-- content -->
  </div>
</template>
```

## Best Practices

1. **Use Tailwind for Layout and Common Styles**
   - Flexbox/Grid layouts
   - Spacing (padding, margin)
   - Colors and backgrounds
   - Typography
   - Responsive design

2. **Keep Scoped CSS for Complex/Custom Styles**
   - Musical staff rendering
   - Note positioning
   - Complex animations
   - Component-specific styles

3. **Combine Both Approaches**
   ```vue
   <template>
     <div class="flex items-center justify-center p-4">
       <div class="staff-container">
         <!-- Custom musical staff -->
       </div>
     </div>
   </template>

   <style scoped>
   .staff-container {
     /* Complex custom styles */
   }
   </style>
   ```

4. **Use Tailwind's @apply for Reusable Patterns**
   ```css
   .btn-primary {
     @apply px-4 py-2 bg-blue-500 text-white rounded;
     @apply hover:bg-blue-600 transition-colors;
   }
   ```

## Development

### Build Process

Tailwind CSS is automatically processed during:

- **Development**: `npm run dev` - Hot reload with Tailwind
- **Production**: `npm run build` - Optimized and purged CSS

### CSS Purging

Tailwind v4 automatically removes unused CSS in production builds based on the content configuration. Only the classes you actually use will be included in the final bundle.

### Bundle Size

- **Development**: Full Tailwind CSS (~3-4 MB uncompressed)
- **Production**: Only used utilities (~8-15 KB gzipped)

Current production build:
- CSS: 8.15 kB (gzipped: 2.45 kB)
- Includes Tailwind base styles + custom component styles

## Troubleshooting

### Issue: Tailwind classes not working

**Solution**: Make sure you've imported the CSS in `main.ts`:
```typescript
import './assets/main.css'
```

### Issue: Build fails with PostCSS error

**Solution**: Ensure you're using `@tailwindcss/postcss` in `postcss.config.js`, not `tailwindcss`:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // ✓ Correct for v4
    // 'tailwindcss': {},        // ✗ Wrong for v4
  },
}
```

### Issue: Styles not updating in dev mode

**Solution**: Restart the dev server:
```bash
npm run dev
```

## Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS with Vue.js](https://tailwindcss.com/docs/guides/vite#vue)
- [Tailwind CSS v4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)

## Future Enhancements

Potential improvements for Tailwind usage:

- [ ] Migrate more component styles to Tailwind utilities
- [ ] Add custom color palette in `tailwind.config.js`
- [ ] Create reusable component classes with `@apply`
- [ ] Add Tailwind plugins (forms, typography, etc.)
- [ ] Implement dark mode support
- [ ] Use Tailwind's animation utilities

