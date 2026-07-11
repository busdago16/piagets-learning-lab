# Piaget's Learning Lab

An interactive website for ETEC 512's Virtual Conference on Learning.

## What is included

- Responsive single-page conference website
- Interactive key-concept explorer
- Assimilation vs. accommodation challenge
- Interactive cognitive-development timeline
- Stage-identification quiz
- Cognitive-conflict falling-object simulation
- Digital-tool stage matcher
- Strengths and limitations section
- Discussion prompt workspace with local draft saving
- Reference section
- Mobile navigation and accessibility support

## Run locally

1. Install Node.js.
2. Open this folder in VS Code.
3. Run:

```bash
npm install
npm run dev
```

Vite will provide a local address, usually `http://localhost:5173`.

## Upload to GitHub

1. Create a new empty GitHub repository.
2. Upload all files and folders from this project.
3. Commit the files.

Or from the terminal:

```bash
git init
git add .
git commit -m "Create Piaget learning conference website"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

## Deploy free with Vercel

1. Sign in to Vercel with GitHub.
2. Select **Add New → Project**.
3. Import the GitHub repository.
4. Vercel should detect **Vite** automatically.
5. Keep these defaults:
   - Build command: `npm run build`
   - Output directory: `dist`
6. Select **Deploy**.

Every later push to the `main` branch will automatically update the website.

## Group edits you should make

Search the project for these items:

- `Piaget's Learning Lab` — replace the title if your group chooses another name.
- `Created for ETEC 512` — add group members.
- The reference list — verify all APA 7 details.
- The discussion section — add your real Canvas, Padlet, blog, or discussion link.
- The Genially iframe — keep it or replace it with your final timeline.
- The cognitive-conflict simulator — it is conceptual, not a full physics engine.

## Project structure

```text
piagets-learning-lab/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.js
    └── style.css
```
