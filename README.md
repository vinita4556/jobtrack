# JobTrack

A job application tracker built as a polished SaaS-style dashboard. All data lives in your browser's LocalStorage — no backend required.

## Features

- Dashboard with live stats, interview/response rates, recent applications and upcoming deadlines
- Full CRUD for applications with validation, success toasts and a shared add/edit form
- Applications page with search, status/job type/location filters, sorting, table view (cards on mobile) and a Kanban board with drag-and-drop plus a status dropdown
- Details modal with link to the job posting (opens in a new tab)
- Analytics (line, bar and donut charts) computed from your data
- Light and dark themes, persisted across sessions
- Settings: profile, default job type/status, CSV export, clear-all with confirmation
- Demo data on first launch (deletable)
- Responsive layout with a mobile drawer menu

## Tech Stack

React 18, Vite, JavaScript, Tailwind CSS, React Router, Lucide React, Recharts, LocalStorage

## Screenshots

_Add screenshots here._

## Installation

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Build: `npm run build` · Preview: `npm run preview`

## Project structure

```
src/
  components/ layout/ dashboard/ applications/ common/
  pages/      Dashboard, Applications, AddApplication, Analytics, Settings
  context/    AppContext (state, LocalStorage, toasts, theme)
  utils/      helpers (stats, search, CSV)
  data/       demo applications
```

## Future improvements

- Accessibility audit and automated tests
- Import from CSV
- Reminders for deadlines
- Backend sync and authentication

## Author

Vinita Parmar — GitHub: _add link_

## Live Demo

_Add link after deployment._
