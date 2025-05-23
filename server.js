const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Servir arquivos estáticos (index.html na raiz)
app.use(express.static(path.join(__dirname)));

// Rota raiz para garantir que retorne algo
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota API para buscar músicas
app.get('/api/search', async (req, res) => {
  const fetch = require('node-fetch');
  const query = req.query.query;
  const searchUrl = `https://jiosaavn-api-privatecvc2.vercel.app/search/songs?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message });
    }

    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    res.status(500).json({ error: 'Erro ao buscar dados' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

