# Simple Blog

A minimal blog built with Express, EJS, and a local JSON file.

## Run

```bash
npm install && npm start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- **Home** (`/`) — list of all posts with previews
- **Post** (`/posts/:id`) — full article view
- **New Post** (`/new`) — form to add a post
- **About** (`/about`) — app info and storage details

## Where is data stored?

Every post you submit is saved to **`data.json`** in this project folder. It is a plain text file on your computer — no database required. Posts persist after restarting the server.

## Files

- `server.js` — the entire app (server, routes, and HTML templates)
- `data.json` — blog posts storage
- `package.json` — dependencies and start script
