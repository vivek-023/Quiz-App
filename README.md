# Quiz App (React + TypeScript + Vite)

Clean, responsive Quiz application showing one question at a time with scoring and a results summary.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run dev server:
   ```bash
   npm run dev
   ```
3. Open the printed local URL.

## Features

- Single-question flow with 4 options
- Prevent next without a selection
- Score tracking and final results page
- Progress indicator
- Restart quiz
- Local `public/questions.json` as data source

## Tech

- React functional components with hooks
- React Router (`/quiz`, `/results`)
- TypeScript types in `src/types.ts`
- Basic CSS in `src/App.css`

## Architecture

- `src/pages/QuizPage.tsx`: Loads questions, manages selection, navigation, and computes score. Stores final result in `sessionStorage`.
- `src/pages/ResultsPage.tsx`: Reads stored result, displays per-question correctness and restart.
- `src/components/QuestionCard.tsx`: Presentational question + options.
- `src/components/ProgressBar.tsx`: Progress and percentage.
- `public/questions.json`: Local question set (5–10). Replace with API if desired.

## Replacing with Open Trivia DB (optional)

Swap the loader in `QuizPage` to fetch from Open Trivia DB, normalize into the `Question` shape (id, question, options[4], correctIndex).

## Deployment

Build and deploy via any static host (GitHub Pages, Netlify, Vercel):

```bash
npm run build
```

The `dist/` folder contains the production assets.
