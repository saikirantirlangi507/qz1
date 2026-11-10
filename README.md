# Quiz Builder

Interactive quiz management system built with React 18, React Router 6 and Vite. All data (users, quizzes, results) is stored in the browser's `localStorage` and seeded on first run.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Demo logins
| Role  | Email                 | Password    |
|-------|-----------------------|-------------|
| Admin | admin@quizbuilder.com | Admin@123   |
| User  | register a new account, or ananya@example.com / Student@123 |

## Features
- Role-based routes (`ProtectedRoute`), separate Admin / User login, registration with validation
- 5 preloaded quizzes (10 MCQs each) with explanations
- Admin: create/edit/delete/publish/draft/activate quizzes, MCQ + True/False + open-ended questions, manage questions & users (block/delete), results (CSV export), analytics charts, settings, reset demo data
- Student: dashboard, search/filter, timed quiz (randomised questions & options, navigation panel, auto-submit, confirm modal), results with answer review, retake, history, leaderboard, profile
- Open-ended answers are graded by case-insensitive match against accepted answers separated by `|`.

## Notes
Passwords are stored in plain text in localStorage. This is for demonstration only; use a real backend with hashed passwords in production.
"# qz1" 
