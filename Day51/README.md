# ContentSpark

**An AI-powered content ideation studio for social media marketers.**

Built by [Sadia Ramzan](https://github.com/sadiaramzan838) as a 10-day capstone project for the **AB Talks 60-Day Claude AI Challenge**.

🔗 **Live Demo:** https://60-days-challenge-on-claude.vercel.app
📦 **Repository:** https://github.com/sadiaramzan838/60-days-challenge-on-Claude (project lives in `Day51/`)

---

## What It Does

ContentSpark solves the "blank page" problem for social media marketers managing multiple clients. Save a client's niche, brand tone, and current goal once — then generate a full content package (post ideas, captions, hashtags, and visual direction) in seconds using AI.

- **Client Profiles** — save niche, tone, goal, and past post examples per client
- **AI Content Generation** — one click produces ideas, captions, hashtags, and visual direction
- **Generation History** — every generation is saved and browsable per client
- **Copy to Clipboard** — every generated element copies instantly for reuse
- **Fully Responsive** — works on desktop and mobile

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Data Storage | Browser `localStorage` (single-user, no backend database) |
| AI | [Groq API](https://console.groq.com) (Llama 3.3 70B) via a Vercel serverless function |
| Hosting | Vercel |

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for full system design.

## Running Locally

```bash
git clone https://github.com/sadiaramzan838/60-days-challenge-on-Claude.git
cd 60-days-challenge-on-Claude/Day51
npm install
```

Create a `.env.local` file in `Day51/` (see `.env.example`) with a free Groq API key from [console.groq.com](https://console.groq.com):
 GROQ_API_KEY=your_key_here


**Note:** because this app uses a Vercel serverless function (`api/generate.js`), the plain `npm run dev` command will not run the AI generation feature locally (it only serves the frontend). To test AI generation locally, use the Vercel CLI:

```bash
npm install -g vercel
vercel dev
```

Or simply push to GitHub — Vercel auto-deploys and the API route works correctly in production.

## Project Structure

Day51/
├── api/generate.js # Serverless function — calls Groq API
├── src/
│ ├── pages/ # Dashboard, ClientForm, ClientDetail
│ ├── components/ # Reusable UI pieces
│ └── utils/ # storage.js (localStorage) + api.js (network)
├── docs/ # Full design documentation (PRD, architecture, schema, API, wireframes)
└── vercel.json # SPA routing configuration


See [`docs/PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md) for details.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system design, diagrams, data flow
- [`docs/SCHEMA.md`](docs/SCHEMA.md) — data model
- [`docs/API.md`](docs/API.md) — endpoint specification
- [`docs/UI-WIREFRAMES.md`](docs/UI-WIREFRAMES.md) — user flow and wireframes
- [`docs/PROJECT-STRUCTURE.md`](docs/PROJECT-STRUCTURE.md) — folder structure

## Scope

**v1.0 includes:** client profiles, AI content generation, history, copy-to-clipboard, responsive UI.

**Intentionally out of scope for v1.0:** multi-user accounts, file uploads, content scheduling, payments, AI image generation. See the PRD for full reasoning.

## License

MIT — see [LICENSE](LICENSE).

## Acknowledgments

Built with [Claude](https://claude.ai) as part of the [AB Talks 60-Day Claude AI Challenge](https://www.abtalks.tech/).

