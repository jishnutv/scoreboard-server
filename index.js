const express = require('express');
const { join } = require('node:path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(3000, "0.0.0.0", () => {
  console.log('Server running on port 3000');
});