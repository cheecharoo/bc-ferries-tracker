import express from "express";
import path, { dirname } from "path";
import fetch from "node-fetch";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix for ES modules (__dirname not defined)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Main route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Example proxy route to BC Ferries API
app.get("/api/ferries", async (req, res) => {
  try {
    const response = await fetch("https://www.bcferriesapi.ca/v2/");
    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error("Error fetching ferry data:", error);
    res.status(500).json({ error: "Failed to fetch ferry data" });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
