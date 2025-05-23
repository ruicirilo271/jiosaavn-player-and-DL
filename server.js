const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Permitir CORS
app.use(cors());

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Rota para buscar músicas
app.get('/api/search', async (req, res) => {
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

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
