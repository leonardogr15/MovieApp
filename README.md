# MovieApp

A small React + TypeScript app to search movies on [TMDB](https://www.themoviedb.org/), keep a list of
favourites and add movies by hand. Everything is stored in the browser (`localStorage`); there is no
backend. *Versión en español: [README.es.md](README.es.md).*

## Features

- Search TMDB by title, or browse popular movies when the search box is empty.
- Sort by title or year, ascending or descending.
- Add movies to favourites, or create them manually; duplicates (same title and year) are rejected.
- Favourites and custom movies persist in `localStorage` (`all-movies` and `fav-ids`).
- Clear messages when the TMDB key is missing or TMDB cannot be reached; saved movies stay available.

## Tech stack

React 19, TypeScript, Axios, Create React App (`react-scripts` 5), Jest and React Testing Library.

## Setup

Requirements: Node.js 18 or newer and your own TMDB API key
([TMDB settings → API](https://www.themoviedb.org/settings/api)).

```bash
git clone https://github.com/leonardogr15/MovieApp.git
cd MovieApp
npm ci
cp .env.example .env        # then set REACT_APP_TMDB_API_KEY in .env
npm start                   # http://localhost:3000
```

`.env` is ignored by git; never commit it. Without a key the app still opens and shows how to
configure one.

## Tests

```bash
CI=true npm test
```

The tests mock Axios, so they never call TMDB: requests are refused without a key, request
parameters and result mapping are checked, and the search bar shows the right message for a missing
key or a failed request.

## API key

**Create React App copies every `REACT_APP_*` variable into the JavaScript bundle at build time.** Any
key configured this way is public: anyone can read it from the deployed site with the browser's
developer tools. TMDB keys cannot be restricted to a domain.

- For local development, use your own key and rotate it if it is ever shared.
- Before deploying, keep the key on a server: a small proxy (for example a serverless function)
  that receives `/search?query=…` and `/popular`, adds the key from a server-side environment
  variable and forwards the request to TMDB. The frontend then calls the proxy and never sees the key.
  This proxy is not implemented yet.

A key was committed to this repository in its first version. It has been removed from the tree, but
it remains in the git history and is treated as compromised: it must be revoked in the TMDB account.

## Known limitations

- Create React App is no longer maintained and `npm audit` reports issues in its build toolchain;
  moving to Vite would remove them.
- No server-side proxy yet (see "API key").
- Data lives only in the browser's `localStorage`.
