import mongoose from 'mongoose';
import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = Number(process.env.PORT ?? 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

async function startServer() {
  await connectDatabase();

  const server = app.listen(port, () => {
    console.log(`OctoFit Tracker API listening at ${baseUrl}`);
  });

  for (const signal of ['SIGINT', 'SIGTERM'] as const) {
    process.once(signal, () => {
      server.close((error) => {
        if (error) {
          console.error('Error closing HTTP server:', error);
          process.exitCode = 1;
        }

        void mongoose.disconnect();
      });
    });
  }
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit Tracker API:', error);
  process.exitCode = 1;
});
