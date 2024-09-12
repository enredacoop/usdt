import express from "express";
import path, { join, resolve } from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.static(join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(resolve(__dirname, "dist", "index.html"));
});

app.listen(3001, () => {
  console.log("Server is running on port 3000");
});
