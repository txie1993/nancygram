# Nancygram

A static Instagram-style feed of real cat, kitten and puppy photos/videos. No build step, no database.

- `posts.js`: the fixed list of posts (edit this to add/remove posts)
- `app.js` / `style.css` / `index.html`: the UI. Likes are stored in `localStorage`.

Media is hotlinked from Wikimedia Commons via `Special:FilePath`. Each post has a "credit" link to the
file page with author and license (mostly CC BY / CC BY-SA, so keep the credit links).

## Run locally

    python3 -m http.server 8000

then open http://localhost:8000.

## Deploy to GitHub Pages

Push to GitHub, then Settings > Pages > Deploy from branch > `main` / root.

## Adding posts

Append an object to `extra` in `posts.js`. Only `src` is required (any image or video URL):

    { src: "https://i.imgur.com/abc123.jpg", user: "nancy", caption: "hi", likes: 12 },

Optional fields: `type`, `user`, `caption`, `likes`, `avatar`, `poster`, `credit`, `priority`, `file`.
Add `priority: 1` (or 2, 3, ...) to pin a post to the top of the feed; the rest are shuffled on every load. See the comment at the top of `posts.js`.
Imgur direct links are sometimes blocked when hotlinked from other sites; Commons is the default for that reason.
