const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html lang="ko">
      <head>
        <meta charset="utf-8" />
        <title>Docker Practice</title>
      </head>
      <body>
        <h1>Docker Practice</h1>
        <p>Node.js and Express are running inside a Docker container.</p>
        <p>Try <a href="/health">/health</a> to check the server status.</p>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'docker-node-practice',
    node: process.version,
    time: new Date().toISOString()
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});