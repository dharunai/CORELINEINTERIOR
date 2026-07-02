import { spawn } from "child_process";
import path from "path";

const port = process.env.PORT || 3000;
console.log(`Starting Vinxi production server on port ${port}...`);

// Resolve path to local vinxi binary
const vinxiPath = path.resolve("node_modules/vinxi/bin/cli.mjs");
console.log(`Resolved Vinxi path: ${vinxiPath}`);

const child = spawn("node", [vinxiPath, "start"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    PORT: port,
  },
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
