import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // Все импорты сверху

const NOTION_API_TOKEN = "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";
 || "твой_токен_здесь";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/update", (req, res) => {
    const data = req.body;
    console.log("Received data:", data);
    res.json({ success: true });
});

app.get("/", (req, res) => {
    res.send("Привет! Ваш сервер работает!");
});

app.get("/notion-test", async (req, res) => {
    try {
        const response = await fetch("https://api.notion.com/v1/databases", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${NOTION_API_TOKEN}`, // Твой токен API
                "Notion-Version": "2022-06-28", // Версия API
            },
        });

        const data = await response.json();
        res.json({ success: true, data });
    } catch (error) {
        console.error("Ошибка при обращении к Notion API:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
