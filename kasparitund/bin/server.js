import express from 'express';
const app = express();
const port = 3000;

let messages = [];

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Oigin', '*');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});

app.get('/', (req, res) => {
  res.json(messages);
});

app.post('/', (req, res) => {
  messages.push(req.body);
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});