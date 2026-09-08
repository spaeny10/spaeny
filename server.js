// Minimal static file server — no dependencies.
// Serves ./public on the port Railway provides ($PORT), with a /health route.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const ROOT = path.join(__dirname, "public");

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
    "Cache-Control": status === 200 ? "public, max-age=300" : "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(body);
}

http
  .createServer((req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      return send(res, 405, "Method not allowed");
    }

    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/health") return send(res, 200, "ok");

    // Resolve the path inside ./public only; "/" and directories serve index.html.
    let rel = decodeURIComponent(url.pathname);
    if (rel.endsWith("/")) rel += "index.html";
    const file = path.normalize(path.join(ROOT, rel));
    if (!file.startsWith(ROOT)) return send(res, 403, "Forbidden");

    fs.stat(file, (err, stat) => {
      if (err || !stat.isFile()) {
        // Unknown paths fall back to the single page, so /#graves style links keep working.
        return fs.readFile(path.join(ROOT, "index.html"), (e2, data) =>
          e2 ? send(res, 404, "Not found") : send(res, 200, data, TYPES[".html"])
        );
      }
      fs.readFile(file, (e3, data) => {
        if (e3) return send(res, 500, "Server error");
        const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
        send(res, 200, req.method === "HEAD" ? "" : data, type);
      });
    });
  })
  .listen(PORT, () => console.log(`Spaeny family site listening on :${PORT}`));
