import { spawn } from "child_process";
import path from "path";

const port = process.env.PORT || 3000;
console.log(`Starting production preview server on port ${port}...`);

const vitePath = path.resolve("node_modules/vite/bin/vite.js");
console.log(`Resolved Vite path: ${vitePath}`);

const child = spawn("node", [vitePath, "preview", "--port", port, "--host"], {
  stdio: "inherit",
  shell: true,
});

child.on("error", (err) => {
  console.error("CHILD PROCESS ERROR:", err);
});

child.on("close", (code) => {
  console.log(`Child process closed with exit code: ${code}`);
  process.exit(code || 0);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("UNHANDLED REJECTION AT:", promise, "REASON:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});
