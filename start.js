#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

console.log("🎮 Starting Secret Game MERN Stack...\n");

// Check if we're in development or production
const isDev = process.env.NODE_ENV !== "production";

if (isDev) {
  console.log("🔧 Development Mode");
  console.log("📦 Starting both backend and frontend...\n");

  // Start backend
  const backend = spawn("npm", ["run", "server"], {
    stdio: "inherit",
    shell: true,
    cwd: __dirname,
  });

  // Start frontend after a short delay
  setTimeout(() => {
    const frontend = spawn("npm", ["run", "client"], {
      stdio: "inherit",
      shell: true,
      cwd: __dirname,
    });

    frontend.on("error", (err) => {
      console.error("❌ Frontend error:", err);
    });
  }, 2000);

  backend.on("error", (err) => {
    console.error("❌ Backend error:", err);
  });

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down gracefully...");
    backend.kill();
    process.exit(0);
  });
} else {
  console.log("🚀 Production Mode");
  console.log("📦 Starting backend server...\n");

  const server = spawn("node", ["backend/server.js"], {
    stdio: "inherit",
    shell: true,
    cwd: __dirname,
  });

  server.on("error", (err) => {
    console.error("❌ Server error:", err);
  });
}
