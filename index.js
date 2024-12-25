import express from "express";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/update", (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
