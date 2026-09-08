// Minimal static file server — no dependencies.
// Serves ./public on the port Railway provides ($PORT), with a /health route.
//
// Routing, in order:
//   /                 -> public/index.html          (the hub)
//   /spaeny           -> public/lines/spaeny.html   (a line page, clean URL)
//   /assets/site.css  -> public/assets/site.css     (served as-is)
//   anything missing  -> a real 404
//
// Adding a line means dropping public/lines/<name>.html in place; /<name>
// starts working immediately, no change here.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "public");
const LINES = path.join(ROOT, "lines");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
};

function send(res, status, body, type) {
  res.writeHead(status, {
    "Content-Type": type || "text/plain; charset=utf-8",
    // HTML is revalidated often so an edit shows up; fingerprint-free assets
    // get the same short window rather than a long one we can't bust.
    "Cache-Control": status === 200 ? "public, max-age=300" : "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(body);
}

// Contain a resolved path inside a directory. The trailing separator matters:
// without it, "/public-other" would pass a bare startsWith("/public") check.
function inside(dir, file) {
  return file === dir || file.startsWith(dir + path.sep);
}

function isFile(p) {
  try {
    return fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

// Map a URL path to a file on disk, or null. Tries, in order: a directory
// index, the path as a file, then the clean-URL forms — so /spaeny, /spaeny/
// and /lines/spaeny.html all reach the same page.
function resolve(pathname) {
  let rel;
  try {
    rel = decodeURIComponent(pathname);
  } catch {
    return null; // malformed percent-encoding
  }

  const tries = [];
  if (rel.endsWith("/")) {
    tries.push([ROOT, rel + "index.html"]);
    if (rel !== "/") rel = rel.slice(0, -1); // /spaeny/ behaves like /spaeny
  }
  tries.push([ROOT, rel]);
  if (rel && rel !== "/" && !path.extname(rel)) {
    tries.push([ROOT, rel + ".html"]);
    tries.push([LINES, rel + ".html"]);
  }

  for (const [base, r] of tries) {
    const p = path.normalize(path.join(base, r));
    if (inside(base, p) && isFile(p)) return p;
  }
  return null;
}

const NOT_FOUND = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Not found</title>
<style>body{margin:0;background:#F4F6F3;color:#161E1A;font:16px/1.6 system-ui,sans-serif;
display:grid;place-content:center;min-height:100vh;text-align:center;padding:2rem}
a{color:#39687A}@media(prefers-color-scheme:dark){body{background:#121714;color:#E7EBE6}a{color:#7DAFC0}}</style>
</head><body><div><p style="font-size:2rem;margin:0 0 .5rem">Nothing here</p>
<p>That page isn't part of the family record.</p>
<p><a href="/">Back to the record</a></p></div></body></html>`;

http
  .createServer((req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return send(res, 405, "Method not allowed");
    }

    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/health") return send(res, 200, "ok");

    const file = resolve(url.pathname);

    if (!file) {
      // Only HTML-ish requests get the friendly page; a missing image or
      // stylesheet must fail visibly rather than return a page of markup.
      const wantsPage =
        !path.extname(url.pathname) ||
        path.extname(url.pathname).toLowerCase() === ".html";
      return wantsPage
        ? send(res, 404, NOT_FOUND, TYPES[".html"])
        : send(res, 404, "Not found");
    }

    fs.readFile(file, (err, data) => {
      if (err) return send(res, 500, "Server error");
      const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
      send(res, 200, req.method === "HEAD" ? "" : data, type);
    });
  })
  .listen(PORT, () => console.log(`Spaeny family site listening on :${PORT}`));
