# TaskFlow — Modern Progressive Web App (PWA) Todo Application

<div align="center">

![TaskFlow Banner](https://img.shields.io/badge/TaskFlow-PWA%20Todo%20App-2563eb?style=for-the-badge&logo=pwa&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live_Demo-pwa--progressive--web--app.vercel.app-22c55e?style=for-the-badge&logo=vercel&logoColor=white)](https://pwa-progressive-web-app.vercel.app/)

[![React 19](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn UI](https://img.shields.io/badge/UI-Shadcn_UI-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)
[![PWA](https://img.shields.io/badge/PWA-Installable-blue?style=flat-square&logo=pwa&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**A high-performance, installable Progressive Web App (PWA) task management system built with React, Vite, Tailwind CSS v4, and Shadcn UI principles.**

🔗 **Live Demo:** [https://pwa-progressive-web-app.vercel.app/](https://pwa-progressive-web-app.vercel.app/)

</div>


---

## 📖 About The Project

**TaskFlow** is an executive-grade, mobile-responsive Todo and productivity application designed to provide a fast, distraction-free workflow across desktop and mobile devices.

Unlike traditional web-only todo lists, TaskFlow is engineered as a **Full Progressive Web App (PWA)** — allowing users to install it as a standalone native app on **Windows, macOS, Android, and iOS**, complete with offline service worker caching and zero-latency local storage synchronization.

---

## ✨ Key Features

### 📱 Progressive Web App (PWA)
- **Native Installation**: Install directly to your Desktop Dock, Start Menu, or Mobile Home Screen via the built-in `Install App` button or browser address bar.
- **Offline First**: Powered by `vite-plugin-pwa` and Workbox service workers to cache app assets for instant loading even without an internet connection.
- **Standalone Mode**: Runs in a dedicated app window without browser URL bars or navigation clutter.

### 🌓 Professional Light & Dark Themes
- **Executive Palette**: High-contrast, accessibility-tested color system (Sapphire Blue accent, Slate/Obsidian dark mode, and clean Porcelain light mode).
- **Zero-Flicker Persistence**: Instant theme detection reading system preferences and saved `localStorage` state.

### 📝 Comprehensive Task Management
- **Hierarchical Checklists**: Add, track, and complete nested subtasks with real-time percentage progress bars.
- **Priority Matrix**: Color-coded urgency levels (`Urgent`, `High`, `Medium`, `Low`).
- **Category Grouping**: Tag tasks into projects (`Work`, `Personal`, `Health`, `Learning`, `Finance`).
- **Smart Scheduling**: Due date picker with automatic indicators (`Today`, `Tomorrow`, and overdue alerts).
- **Pin to Top**: Pin critical tasks to the top of your workspace.
- **Custom Tagging**: Multi-tag search support (`#DevOps`, `#Finance`, `#Study`).

### 🔍 Smart Views & Filtering
- **Quick Tabs**: Instant filtering by `All`, `Active`, `Today`, and `Done`.
- **Fuzzy Search**: Instant search across titles, descriptions, subtask names, and tags.
- **Multi-Field Sorting**: Sort by Due Date, Priority (High-to-Low), Title (A–Z), or Recently Added.

### 💾 Data Security & Portability
- **100% Client-Side Privacy**: Data stays securely in your browser's `localStorage` — no unauthorized tracking.
- **JSON Backup & Restore**: One-click **Export Backup** and **Import Backup** to transfer tasks between devices.
- **Clean Reset**: Clear all tasks with a single click.

### 📱 Mobile-First Responsive Design
- **Adaptive Stacking**: Smooth column-wise stacked layouts on mobile phones and fluid multi-column arrangements on tablets and desktops.
- **Touch-Friendly Targets**: Fully optimized tap targets with gesture support.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **[React 19](https://react.dev/)** | Modern UI rendering and state management |
| **[Vite 7](https://vitejs.dev/)** | Ultra-fast next-generation frontend tooling |
| **[Tailwind CSS v4](https://tailwindcss.com/)** | Utility-first CSS styling and custom color tokens |
| **[Radix UI](https://www.radix-ui.com/)** | Headless accessible UI primitives (Dialogs, Dropdowns, Tabs, Selects) |
| **[Vite PWA Plugin](https://vite-pwa-org.netlify.app/)** | Web App Manifest & Workbox Service Worker generation |
| **[Lucide React](https://lucide.dev/)** | Clean, consistent modern icon system |
| **[Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)** | Interactive celebratory completion animations |

---

## 📂 Project Architecture

```plaintext
PWA/
├── public/
│   ├── icons/
│   │   ├── icon-192x192.png       # PWA manifest 192x192 icon
│   │   └── icon-512x512.png       # PWA manifest 512x512 icon
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable Shadcn UI primitives
│   │   │   ├── badge.jsx          # Priority & category pill badges
│   │   │   ├── button.jsx         # Button variants (default, outline, ghost)
│   │   │   ├── card.jsx           # Surface containers & headers
│   │   │   ├── checkbox.jsx       # Radix-powered checkbox
│   │   │   ├── dialog.jsx         # Accessible modal dialog
│   │   │   ├── dropdown-menu.jsx  # Context & options dropdowns
│   │   │   ├── input.jsx          # Styled input field
│   │   │   ├── progress.jsx       # Animated completion progress bar
│   │   │   ├── select.jsx         # Native-styled custom select dropdown
│   │   │   ├── tabs.jsx           # Segmented view tabs
│   │   │   └── textarea.jsx       # Notes & description textarea
│   │   ├── EmptyState.jsx         # Zero-state empty workspace view
│   │   ├── HeroBanner.jsx         # Dynamic greeting & daily progress counter
│   │   ├── Navbar.jsx             # Top bar with PWA install, theme, and backup menu
│   │   ├── QuickAddBar.jsx        # 1-click inline task creator with quick selectors
│   │   ├── TaskFilterBar.jsx      # Tabs, instant search, and sorting bar
│   │   ├── TaskItem.jsx           # Interactive task card with subtasks & menu
│   │   └── TaskModal.jsx          # Comprehensive task create/edit modal
│   ├── data/
│   │   └── initialTodos.js        # Categories & priority metadata definitions
│   ├── hooks/
│   │   └── useTodos.js            # Custom hook for CRUD, filtering, sorting, storage
│   ├── lib/
│   │   └── utils.js               # Tailwind class merger utility (cn)
│   ├── App.jsx                    # Root application component
│   ├── index.css                  # Global Tailwind v4 tokens & dark mode styles
│   └── main.jsx                   # React DOM mount entry
├── index.html                     # HTML5 shell with PWA manifest & viewport meta
├── vite.config.js                 # Vite configuration with PWA plugin & path aliases
└── package.json                   # Project dependencies and build scripts
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have **Node.js 18+** installed on your system.

### 1. Clone the repository
```bash
git clone https://github.com/Darshanwalher/PWA---Progressive-Web-App.git
cd PWA---Progressive-Web-App
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the local development server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173/`.

### 4. Build and preview the PWA production bundle
```bash
npm run build
npm run preview
```
Open `http://localhost:4173/` to test Service Worker registration, offline caching, and PWA installation.

---

## 🚢 Deployment (Vercel, Netlify, Cloudflare)

The application is deployed and live at: **[https://pwa-progressive-web-app.vercel.app/](https://pwa-progressive-web-app.vercel.app/)**

### Deploy your own copy to Vercel

1. **Via Vercel CLI**:
   ```bash
   npx vercel
   ```
2. **Via Vercel Dashboard**:
   - Push your code to GitHub.
   - Go to [vercel.com](https://vercel.com) and click **Add New Project**.
   - Select your repository.
   - Set **Framework Preset** to `Vite`, **Build Command** to `npm run build`, and **Output Directory** to `dist`.
   - Click **Deploy**.

> **Note**: Vercel automatically enables **HTTPS**, which is mandatory for PWA installation prompts to display on mobile and desktop browsers.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>N</kbd> | Open New Task modal dialog |
| <kbd>/</kbd> | Focus instant search bar |
| <kbd>↵ Enter</kbd> | Submit quick task / add subtask / add tag |
| <kbd>Esc</kbd> | Close active modal dialog or dropdown |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
