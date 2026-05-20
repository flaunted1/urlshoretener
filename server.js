const express = require('express');
const path = require('path');
const { nanoid } = require('nanoid');

const app = express();

const PORT = process.env.PORT || 10000;

const links = new Map();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/shorten', (req, res) => {
  const { url } = req.body;

  if (!url || !url.startsWith('http')) {
    return res.status(400).json({
      error: 'Please enter a valid URL'
    });
  }

  const id = nanoid(6);

  links.set(id, url);

  res.json({
    shortUrl: `${req.protocol}://${req.get('host')}/${id}`
  });
});

app.get('/:id', (req, res) => {
  const destination = links.get(req.params.id);

  if (!destination) {
    return res.status(404).send('Link not found');
  }

  res.redirect(destination);
});

app.listen(PORT, () => {
  console.log(`Hazy running on port ${PORT}`);
});
