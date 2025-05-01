const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Server starting...');

app.use(express.static('public'));

app.get('/news', async (req, res) => {
    console.log('/news endpoint hit');

    const query = req.query.q || 'Trump tariff';
    const fromDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const apiKey = process.env.NEWSAPI_KEY;
    console.log('API Key loaded:', !!apiKey);

    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=${fromDate}&sortBy=publishedAt&language=en&pageSize=20&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (err) {
      console.error('Fetch failed:', err);
      res.status(500).json({ error: 'Failed to fetch news.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
