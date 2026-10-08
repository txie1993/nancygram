const feed = document.getElementById("feed");
const liked = new Set(JSON.parse(localStorage.getItem("likedSrc") || "[]"));
const colors = ["#e1306c", "#f56040", "#833ab4", "#405de6", "#fcaf45", "#2e8b57"];

const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

const players = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) e.target.play().catch(() => {});
    else e.target.pause();
  }
}, { threshold: 0.4 });

const VIDEO_EXT = /\.(mp4|webm|ogv|ogg|mov|m4v)(\?|#|$)/i;

// Fills in defaults so a post only needs `src`.
const normalize = (p) => ({
  user: "nancy",
  caption: "",
  likes: 0,
  ...p,
  type: p.type || (VIDEO_EXT.test(p.src) ? "video" : "image"),
  credit: p.credit || (p.file ? "https://commons.wikimedia.org/wiki/File:" + encodeURIComponent(p.file.replace(/ /g, "_")) : ""),
});

// Fisher-Yates shuffle so the feed order is different on every page load.
const shuffle = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Posts with a numeric `priority` come first (1 = top, ties keep list order);
// everything else follows in random order.
const all = window.POSTS.map(normalize);
const prioritized = all
  .filter((p) => typeof p.priority === "number")
  .sort((a, b) => a.priority - b.priority);
const posts = [...prioritized, ...shuffle(all.filter((p) => typeof p.priority !== "number"))];

function renderPost(p, i) {
  const post = el("article", "post");

  const head = el("div", "post-head");
  const avatar = el("div", "avatar", p.user[0].toUpperCase());
  avatar.style.background = colors[i % colors.length];
  head.append(avatar, el("span", null, p.user));

  let media;
  if (p.type === "video") {
    media = el("video", "media");
    media.src = p.src;
    media.muted = true;
    media.setAttribute("muted", "");
    media.loop = true;
    media.playsInline = true;
    media.preload = "auto";
    media.controls = true;
    if (p.poster) media.poster = p.poster;
    // Retry once data arrives in case play() fired before the video could start.
    media.addEventListener("canplay", () => {
      const r = media.getBoundingClientRect();
      const visible = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
      if (visible >= r.height * 0.4) media.play().catch(() => {});
    });
    players.observe(media);
  } else {
    media = el("img", "media");
    media.src = p.src;
    media.alt = p.caption;
    media.loading = "lazy";
  }

  const heart = el("button", null, "♥");
  heart.setAttribute("aria-label", "like");
  const count = el("div", "likes");
  const render = () => {
    const on = liked.has(p.src);
    heart.classList.toggle("liked", on);
    count.textContent = (p.likes + (on ? 1 : 0)).toLocaleString() + " likes";
  };
  heart.onclick = () => {
    liked.has(p.src) ? liked.delete(p.src) : liked.add(p.src);
    localStorage.setItem("likedSrc", JSON.stringify([...liked]));
    render();
  };
  render();

  const actions = el("div", "actions");
  actions.append(heart);

  const caption = el("div");
  const strong = el("strong", null, p.user + " ");
  caption.append(strong, p.caption);

  const body = el("div", "body");
  body.append(count, caption);
  if (p.credit) {
    const credit = el("div", "credit");
    const a = el("a", null, "credit");
    a.href = p.credit;
    a.target = "_blank";
    a.rel = "noopener";
    credit.append(a);
    body.append(credit);
  }
  post.append(head, media, actions, body);
  feed.append(post);
}

// Infinite scroll: render BATCH posts at a time as the sentinel nears the viewport.
const BATCH = 5;
let next = 0;
const sentinel = el("div", "sentinel");
feed.after(sentinel);

const loadMore = () => {
  for (const end = Math.min(next + BATCH, posts.length); next < end; next++) {
    renderPost(posts[next], next);
  }
  if (next >= posts.length) {
    more.disconnect();
    sentinel.textContent = "You're all caught up";
  }
};

const more = new IntersectionObserver((entries) => {
  // Loop in case the first batch doesn't fill the screen (observer only fires on change).
  if (entries.some((e) => e.isIntersecting)) {
    loadMore();
    more.unobserve(sentinel);
    if (next < posts.length) requestAnimationFrame(() => more.observe(sentinel));
  }
}, { rootMargin: "800px" });
more.observe(sentinel);
