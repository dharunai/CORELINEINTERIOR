import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const port = process.env.PORT || 3000;

// Import the built server handler
const serverModule = await import("./dist/server/server.js");
const app = serverModule.default;

// Serve static client assets
const clientDir = path.resolve("dist/client");

function getMimeType(ext) {
  const types = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".webp": "image/webp",
    ".webm": "video/webm",
    ".mp4": "video/mp4",
  };
  return types[ext] || "application/octet-stream";
}

const server = http.createServer(async (req, res) => {
  try {
    // Try to serve static files from dist/client first
    const urlPath = new URL(req.url, `http://localhost:${port}`).pathname;
    const staticFilePath = path.join(clientDir, urlPath);

    // Only serve actual files (not directories), and only from /assets/ path
    if (urlPath.startsWith("/assets/") && fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).isFile()) {
      const ext = path.extname(staticFilePath);
      const mimeType = getMimeType(ext);
      const content = fs.readFileSync(staticFilePath);
      res.writeHead(200, {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      });
      res.end(content);
      return;
    }

    // Also serve files from /uploads/ directory (for admin-uploaded project images)
    const publicDir = path.resolve("public");
    if (urlPath.startsWith("/uploads/")) {
      const uploadFilePath = path.join(publicDir, urlPath);
      if (fs.existsSync(uploadFilePath) && fs.statSync(uploadFilePath).isFile()) {
        const ext = path.extname(uploadFilePath);
        const mimeType = getMimeType(ext);
        const content = fs.readFileSync(uploadFilePath);
        res.writeHead(200, { "Content-Type": mimeType });
        res.end(content);
        return;
      }
    }

    // For everything else, use the TanStack Start SSR handler
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers["x-forwarded-host"] || req.headers.host || `localhost:${port}`;
    const url = new URL(req.url, `${protocol}://${host}`);

    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      body = Buffer.concat(chunks);
    }

    const request = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      duplex: "half",
    });

    const response = await app.fetch(request);

    // Write response status and headers
    const responseHeaders = {};
    response.headers.forEach((value, key) => {
      if (responseHeaders[key]) {
        if (Array.isArray(responseHeaders[key])) {
          responseHeaders[key].push(value);
        } else {
          responseHeaders[key] = [responseHeaders[key], value];
        }
      } else {
        responseHeaders[key] = value;
      }
    });

    res.writeHead(response.status, response.statusText, responseHeaders);

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("Request error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`CoreLine Interior server running on http://0.0.0.0:${port}`);
});
