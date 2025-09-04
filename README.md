# QuizMaster 🎯  

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)  
[![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)](https://vitejs.dev/)  
[![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-brightgreen?logo=netlify)](https://quizmaster-vivek.netlify.app/quiz)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  

👉 **Live Demo:** [quizmaster-vivek.netlify.app](https://quizmaster-vivek.netlify.app/quiz)  

---

## 🌟 Overview
**QuizMaster** is a modern and lightweight quiz application where users can test their knowledge through multiple-choice questions.  
It tracks progress with a live progress bar, evaluates answers instantly, and displays results at the end.  

Built with **React, TypeScript, and Vite**, the app is fast, responsive, and easy to extend.  

---

## ✨ Features
- 🎲 Multiple-choice quiz with shuffled questions  
- 📊 Progress bar to track completion  
- 📝 Instant results summary with correct & incorrect answers  
- 💾 Session storage to persist quiz results until refresh  
- 📱 Fully responsive UI (mobile & desktop)  
- ⚡ Lightning-fast builds and dev server with Vite  

---

## 🛠️ Tech Stack
- **React 19** – UI library  
- **TypeScript** – Strong typing for maintainable code  
- **Vite 7** – Next-gen frontend tooling  
- **React Router 7** – Routing between Quiz & Results pages  
- **CSS** – Custom styling for layout & components  
- **Session Storage** – Temporary quiz result storage  

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/quizmaster.git
cd quizmaster
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Start development server
bash
Copy code
npm run dev
The app will be running at http://localhost:5173

4️⃣ Build for production
bash
Copy code
npm run build
📂 Project Structure
csharp
Copy code
quizmaster/
├── dist/                 # Production build output
├── node_modules/         # Dependencies
├── public/               # Static assets
│   └── vite.svg
├── src/                  # Main source code
│   ├── assets/           # Images, icons, etc.
│   │   └── react.svg
│   ├── components/       # Reusable components
│   │   ├── ProgressBar.tsx
│   │   └── QuestionCard.tsx
│   ├── pages/            # Page-level views
│   │   ├── QuizPage.tsx
│   │   └── ResultsPage.tsx
│   ├── App.css           # Global styles
│   ├── App.tsx           # Main app & routes
│   ├── index.css         # Base styles
│   ├── main.tsx          # Entry point
│   ├── types.ts          # TypeScript type definitions
│   └── vite-env.d.ts     # Vite environment types
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML entry point
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite configuration
└── README.md             # Project documentation
📸 Screenshots
Quiz Page

Results Page

(To add screenshots: create a screenshots/ folder in your repo, drop images there, and update the links above.)

🔮 Future Enhancements
⏱️ Timer for each question

🏆 High score storage (local storage or backend)

📚 Categories & difficulty levels

🎨 Animations and sound effects

🌐 API-based dynamic questions

🤝 Contributing
Contributions are welcome!

Steps:

Fork the repo

Create a feature branch (git checkout -b feature/my-feature)

Commit changes (git commit -m "Add new feature")

Push to branch (git push origin feature/my-feature)

Open a Pull Request

📜 License
This project is licensed under the MIT License.
See the LICENSE file for details.

👉 Try it live now: quizmaster-vivek.netlify.app
