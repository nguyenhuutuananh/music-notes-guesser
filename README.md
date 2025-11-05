# 🎵 Music Notes Guesser

A simple and interactive web app to help you learn and practice reading music notes on the treble clef staff.

## 🌐 Live Demo

Visit the live app: [https://nguyenhuutuananh.github.io/music-notes-guesser/](https://nguyenhuutuananh.github.io/music-notes-guesser/)

## ✨ Features

- Random note generation on the musical staff
- Interactive note guessing with instant feedback
- Score tracking (correct/incorrect answers)
- Auto-advance to next note after correct answer
- Vietnamese note names (Đô, Rê, Mi, Fa, Sol, La, Si)
- Beautiful gradient UI design
- Built with Vue 3 and TypeScript

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- tests/example.spec.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## 🚀 Deploy to GitHub Pages

### Automatic Deployment (Recommended)

The project is configured with GitHub Actions for automatic deployment. Every push to the `main` branch will automatically build and deploy to GitHub Pages.

**Setup Steps:**

1. Go to your GitHub repository settings
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Push your code to the `main` branch
5. The workflow will automatically build and deploy your site

### Manual Deployment

You can also deploy manually using the deploy script:

```sh
npm run deploy
```

This will:
1. Build the production version
2. Create a `.nojekyll` file to prevent Jekyll processing
3. Deploy the `dist` folder to the `gh-pages` branch

## 📝 Configuration

The app is configured for GitHub Pages deployment with:
- Base URL set to `/music-notes-guesser/` in `vite.config.ts`
- GitHub Actions workflow in `.github/workflows/deploy.yml`
- `.nojekyll` file to prevent Jekyll processing

## 🛠️ Tech Stack

- **Vue 3.5.22** - Progressive JavaScript Framework
- **TypeScript** - Type-safe JavaScript
- **Vite 7** - Next Generation Frontend Tooling
- **Vue Router 4** - Official router for Vue.js
- **Vitest** - Unit testing framework
- **Playwright** - End-to-end testing
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📄 License

MIT
