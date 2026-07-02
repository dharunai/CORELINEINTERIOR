import http from "node:http";
import path from "node:path";
import fs from "node:fs";

const port = process.env.PORT || 3000;

// Write startup log immediately
const logFile = path.resolve("startup.log");
function log(msg) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  console.log(msg);
  try {
    fs.appendFileSync(logFile, line);
  } catch (e) {
    console.error("Could not write to startup.log", e);
  }
}

log(`--- NEW STARTUP --- PORT=${port}`);
log(`Node version: ${process.version}`);
log(`CWD: ${process.cwd()}`);

const distServerPath = path.resolve("dist/server/server.js");
const distClientPath = path.resolve("dist/client");

async function startServer() {
  try {
    log(`Checking dist/server/server.js: ${fs.existsSync(distServerPath)}`);
    log(`Checking dist/client: ${fs.existsSync(distClientPath)}`);
    
    let app;
    try {
      const serverModule = await import(distServerPath);
      app = serverModule.default;
      log(`Server module loaded successfully.`);
    } catch (importErr) {
      log(`FATAL: Failed to import dist/server/server.js: ${importErr.message}`);
      throw importErr;
    }

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
        const urlPath = new URL(req.url, `http://localhost:${port}`).pathname;

        // Serve any static file from dist/client (like /assets/, /logo.png, /robots.txt)
        const staticFilePath = path.join(distClientPath, urlPath);
        if (fs.existsSync(staticFilePath) && fs.statSync(staticFilePath).isFile()) {
          const ext = path.extname(staticFilePath);
          const content = fs.readFileSync(staticFilePath);
          
          // Use aggressive caching for /assets/, and standard caching for root files like /logo.png
          const cacheControl = urlPath.startsWith("/assets/")
            ? "public, max-age=31536000, immutable"
            : "public, max-age=3600";
            
          res.writeHead(200, {
            "Content-Type": getMimeType(ext),
            "Cache-Control": cacheControl,
          });
          res.end(content);
          return;
        }

        // SSR request
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
        log(`Request error: ${err.message}`);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    });

    server.listen(port, "0.0.0.0", () => {
      log(`Server successfully listening on port ${port}`);
    });
    
  } catch (err) {
    log(`Startup error: ${err.message}\n${err.stack}`);
    // Start fallback server
    http.createServer((req, res) => {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end(`<h1>Server Error</h1><pre>${err.message}\n${err.stack}</pre>`);
    }).listen(port, "0.0.0.0", () => {
      log(`Fallback server listening on port ${port}`);
    });
  }
}

startServer().catch(err => {
  log(`Unhandled error: ${err.message}`);
});
