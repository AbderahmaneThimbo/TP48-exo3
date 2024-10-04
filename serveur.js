import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();
const PORT = 3020;

const API_KEY = "my_api_key";

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 100,
  max: 100
});

app.use(limiter);

const apiKeyAuth = (req, res, next) => {
  const apikey = req.headers["x-api-key"];
  if (!apikey || apikey !== API_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }
  next();
};

app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello world" });
});

app.get("/api/private-data", apiKeyAuth, (_req, res, _next) => {
  res.json({ message: "This is private data" });
});

app.listen(PORT, () => {
  console.log(`Serveur is runing on port ${PORT} `);
});
