const express = require('express')

app = express(),
port = process.env.PORT || 8000;

app.listen(port);

app.get('/test', function (req, res) {
  res.send('test endpoint is live')
});

console.log(`API server started on: ${port}`);
