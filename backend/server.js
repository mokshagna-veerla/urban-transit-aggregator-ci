import express from "express";
import cors from "cors";
import transitRouter from "./routes/transit.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "urban-transit-aggregator" });
});

app.use("/api", transitRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({
    error: "Internal server error",
    message: "The route comparison service failed."
  });
});

app.listen(PORT, () => {
  console.log(`Transit API running at http://localhost:${PORT}`);
});
