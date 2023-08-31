const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;  // El puerto en el que se ejecutará el backend

// Configura CORS para permitir solicitudes desde tu frontend
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173', 'https://portfolio-three-fawn-27.vercel.app', 'https://glowing-nasturtium-c849ed.netlify.app');  // Reemplaza con la URL de tu frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/portafolio', async (req, res) => {
  const DATABASE_ID = '4e330c178f0a4bcb81d578dc58b1fe7e';
  const NOTION_SECRET = 'secret_gqSDfkRejZYLqhx3yJoTngxHvQ1VNoNVz6KLrjolYtP';

  const query = { database_id: DATABASE_ID };

  try {
    const response = await axios.post(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      {
        filter: req.query.filterBy
          ? {
              property: 'destinationPage',
              rich_text: {
                equals: req.query.filterBy,
              },
            }
          : undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${NOTION_SECRET}`,
          'Notion-Version': '2021-08-16',
        },
      }
    );
    const { results } = response.data;

    res.json(results);
  } catch (error) {
    console.log('Error fetching data from Notion:', error);
    res.status(500).json({ error: 'Error al obtener datos de Notion API' });
  }


});

app.listen(PORT, () => {
  console.log(`Servidor backend en funcionamiento en el puerto ${PORT}`);
});
