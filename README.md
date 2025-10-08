# Expense Tracker

Small React + Vite expense tracker app with Chart.js visualizations and LocalStorage persistence. Styled with Tailwind (via CDN for quick dev) and includes a dark mode.

## Features
- Add income / expense entries (category, amount, type)
- Persistent data in LocalStorage
- Filter by category and type
- Charts (pie + bar) using Chart.js
- Dark mode with theme toggle
- Edit and delete entries (edit via modal)

## Tech
- React + Vite
- Chart.js (react-chartjs-2)
- Tailwind (CDN for dev)

## Local setup
Requirements: Node.js (16+), npm

1. Install dependencies
```powershell
cd "d:\Music\Expense Tracker"
npm install
```

2. Run dev server
```powershell
npm run dev
```

3. Build for production
```powershell
npm run build
# serve a local preview
npm run preview
```

## Deploy
I recommend Vercel for quick static hosting. In Vercel use:
- Build command: `npm run build`
- Output directory: `dist`

Or use the Vercel CLI:
```powershell
npm i -g vercel
vercel
```

## Notes
- The project currently uses the Tailwind CDN for development convenience. If you switch to a PostCSS/Tailwind build pipeline, add the required devDependencies and Tailwind config.
- Data is stored locally in the browser; there's no backend.

## License
MIT
