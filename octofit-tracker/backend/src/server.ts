import express from 'express';
import './config/database.js';

const app = express();

app.use(express.json());
app.get('/api/', (_request, response) => {
  response.json({ message: 'OctoFit Tracker API' });
});

const port = Number(process.env.PORT ?? 8000);

app.listen(port, () => {
  console.log(`OctoFit Tracker API listening on port ${port}`);
});
