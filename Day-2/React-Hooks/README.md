# PlacementPrep — React Interview Preparation

Complete interview-ready React projects with hooks, state management, and advanced patterns.

---

## 📁 Repository Structure

```
PlacementPrep/
│
├── Day-1-React-Basics/
│   ├── README.md
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig files
│
├── Day-2-Hooks/
│   ├── README.md
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── components/
│       ├── Counter.jsx (useState with history)
│       ├── Users.jsx (useEffect, API fetch, cleanup)
│       └── LiveSearch.jsx (controlled input, filtering)
│
└── README.md (This file)
```

---

## 🎯 Day 1 — React Basics

**Location:** `Day-1-React-Basics/`

Core React concepts:
- Component structure
- Props & state fundamentals
- Event handling
- Conditional rendering
- List rendering

### Run Day-1 Project

```bash
cd Day-1-React-Basics
npm install
npm run dev
```

---

## 🔥 Day 2 — React Hooks Deep Dive

**Location:** `Day-2-Hooks/`

Advanced hook patterns with real-world applications:

### ✅ Task 1 — Smart Counter
- `useState` with functional updates
- Maintaining history of state changes
- Button event handling

### ✅ Task 2 — API Fetch with Hooks
- `useEffect` for side effects
- Dependency arrays (empty, with deps, cleanup)
- Loading, error, and success states
- Cleanup function for subscriptions
- API integration (JSONPlaceholder)

### ✅ Task 3 — Live Search Filter
- Controlled components with `useState`
- Real-time filtering logic
- Case-insensitive search
- Dynamic list rendering

### Run Day-2 Project

```bash
cd Day-2-Hooks
npm install
npm run dev
```

---

## 🚀 Quick Start

### Run Both Projects Locally

**Terminal 1 — Day 1:**
```bash
cd Day-1-React-Basics && npm install && npm run dev
```

**Terminal 2 — Day 2:**
```bash
cd Day-2-Hooks && npm install && npm run dev
```

---

## 📚 Key Concepts Covered

### State Management
- `useState` hook
- Functional state updates
- State batching

### Side Effects
- `useEffect` hook
- Dependency array patterns
- Cleanup functions
- Async operations

### DOM Interactions
- Controlled components
- Event listeners
- Form handling
- Real-time filtering

### API Integration
- Fetch API
- Promise handling
- Error boundaries
- Loading states

---

## 🎓 Interview Prep Topics

Each component demonstrates:
- ✅ Proper hook usage
- ✅ Performance optimization
- ✅ Error handling patterns
- ✅ User experience improvements
- ✅ Clean, readable code

---

## 📝 Technologies Used

- **React 18** — UI library
- **Vite** — Build tool & dev server
- **JavaScript (ES6+)** — Modern syntax
- **CSS** — Styling
- **JSONPlaceholder API** — Mock data

---

## 🔧 Development

Each project is independent with its own:
- `package.json`
- `vite.config` configuration
- `src/` source code
- Node modules (installed separately)

**No shared dependencies** — Each folder is a standalone project.

---

## 📦 Build & Deploy

### Build Day-1:
```bash
cd Day-1-React-Basics
npm run build
```

### Build Day-2:
```bash
cd Day-2-Hooks
npm run build
```

---

## 💡 Learning Path

1. **Start with Day 1** → Understand React fundamentals
2. **Move to Day 2** → Master hooks and side effects
3. **Compare both** → See progression in complexity
4. **Extend components** → Add new features for practice

---

## ✅ Checklist for Interview

- [x] React Basics covered (Day 1)
- [x] All hooks demonstrated (Day 2)
- [x] API integration working
- [x] Error handling implemented
- [x] Clean component structure
- [x] Professional code style

---

## 🤝 Notes

- Each project folder has its own README with detailed component explanations
- All components are functional components using hooks
- No class components
- All async operations properly handled

---

**Created:** March 2026  
**Status:** Interview-Ready ✅
