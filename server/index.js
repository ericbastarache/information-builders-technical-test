const express = require('express');
const app = express();
const port = 3001;
const data = require('./data.json');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send(data);
});

app.listen(port, () => console.log(`Information Builders backend listening on port ${port}`));