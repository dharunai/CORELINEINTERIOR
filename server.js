import { spawn } from "child_process";
import path from "path";

const port = process.env.PORT || 3000;
console.log(`Starting production preview server on port ${port}...`);

// Resolve path to local vite binary to avoid relying on global `npx` in PATH
const vitePath = path.resolve("node_modules/vite/bin/vite.js");

const child = spawn("node", [vitePath, "preview", "--port", port, "--host"], {
  stdio: "inherit",
  shell: true,
});

child.on("close", (code) => {
  process.exit(code);
});
