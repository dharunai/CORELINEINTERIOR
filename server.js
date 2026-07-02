import { spawn } from "child_process";

const port = process.env.PORT || 3000;
console.log(`Starting production preview server on port ${port}...`);

const child = spawn("npx", ["vite", "preview", "--port", port, "--host"], {
  stdio: "inherit",
  shell: true,
});

child.on("close", (code) => {
  process.exit(code);
});
