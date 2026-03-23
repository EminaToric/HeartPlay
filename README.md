# 💖 HeartPlay

An AI-powered app that generates creative, developmentally appropriate bonding activities for parents and children based on the child's age, interests, setting, and available time.

**Live Demo:** [Try HeartPlay](https://heart-play-frontend.vercel.app/)

---

## Why I Built This

I have two master's degrees, one in Computer Science and one in Child and Human Development. For a long time those two things lived in separate parts of my life. HeartPlay is what happened when they finally met.

Most parenting apps give you generic activity lists. This one actually thinks about where a child is developmentally and what kind of interaction is going to be meaningful for them at that age. A 2-year-old and a 9-year-old are not just different sizes. They are in completely different developmental stages and they need completely different things from the adults in their lives.

---

## How It Works

You go through three steps:

**Step 1 — Child's age.** A slider from 1 to 18 that shows the developmental stage label as you move it. Infant, toddler, preschool, early childhood, middle childhood, teen.

**Step 2 — Interests.** Tap from a list of common interests or add your own. The more specific you are the better the activity.

**Step 3 — Setting and time.** Indoors, outdoors, either, or on the go. Then how much time you have together.

Hit the button and the app generates a warm, specific, developmentally grounded activity in seconds.

---

## Tech Stack

- **Frontend:** React, Vite
- **AI:** Anthropic Claude API (claude-haiku)
- **Deployment:** Vercel

---

## Running Locally

```bash
git clone https://github.com/EminaToric/HeartPlay.git
cd HeartPlay/frontend
npm install
```

Create a `.env` file in the frontend folder:

```
VITE_ANTHROPIC_KEY=your_anthropic_api_key_here
```

Then run:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Note on the API Key

This app calls the Claude API directly from the browser. For a portfolio and demo context this works fine. For a production application, API calls should be proxied through a backend to keep the key secure.

---

## About

Built by **Emina Toric** — data professional with a background in computer science, human development, and healthcare analytics.

[Portfolio](https://eminatoric.github.io) · [LinkedIn](https://linkedin.com/in/emina-toric-msc) · [GitHub](https://github.com/EminaToric)
