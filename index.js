import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

const NOTION_API_TOKEN = "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";

// Endpoint для проверки подключения к Notion
app.get("/notion-test", async (req, res) => {
  try {
    const response = await fetch("https://api.notion.com/v1/databases", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${NOTION_API_TOKEN}`,
        "Notion-Version": "2022-06-28",
      },
    });

    const data = await response.json();
    res.json({ success: true, data });
  } catch (error) {
    console.error("Ошибка при обращении к Notion API:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Главная страница с виджетом
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html>
  <head>
    <title>Instagram Grid Widget</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <style>
      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        max-width: 900px;
        margin: 0 auto;
        padding: 4px;
      }
      .grid-item {
        aspect-ratio: 9/16;
        background: #f0f0f0;
        position: relative;
      }
      .grid-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      function InstagramGrid() {
        const [posts, setPosts] = React.useState([]);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
          fetch('/notion-test')
            .then(response => response.json())
            .then(data => {
              console.log('Данные:', data);
              setPosts([
                { id: 1, image: "/api/placeholder/270/480" },
                { id: 2, image: "/api/placeholder/270/480" },
                { id: 3, image: "/api/placeholder/270/480" },
                { id: 4, image: "/api/placeholder/270/480" },
                { id: 5, image: "/api/placeholder/270/480" },
                { id: 6, image: "/api/placeholder/270/480" }
              ]);
              setLoading(false);
            })
            .catch(error => {
              console.error('Ошибка:', error);
              setLoading(false);
            });
        }, []);

        if (loading) return <div>Загрузка...</div>;

        return (
          <div className="grid">
            {posts.map(post => (
              <div key={post.id} className="grid-item">
                <img src={post.image} alt={\`Post \${post.id}\`} />
              </div>
            ))}
          </div>
        );
      }

      ReactDOM.render(
        <InstagramGrid />,
        document.getElementById('root')
      );
    </script>
  </body>
</html>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
