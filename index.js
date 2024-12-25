const NOTION_API_TOKEN = "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"; // Убедитесь, что здесь реальный токен

app.get("/notion-test", async (req, res) => {
  try {
    const response = await fetch("https://api.notion.com/v1/databases", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${NOTION_API_TOKEN}`, // ВАЖНО: Без лишних кавычек или символов
        "Notion-Version": "2022-06-28", // Проверьте, что версия API указана правильно
      },
    });

    const data = await response.json();
    res.json({ success: true, data });
  } catch (error) {
    console.error("Ошибка при обращении к Notion API:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
