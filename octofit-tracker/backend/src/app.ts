import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { errorHandler, notFoundHandler } from './middleware/errors.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const allowedOrigins = [
  'http://localhost:5173',
  ...(process.env.FRONTEND_ORIGIN ? [process.env.FRONTEND_ORIGIN] : []),
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api/', (_request, response) => {
  response.json({ message: 'OctoFit Tracker API' });
});

app.get('/api/health', (_request, response) => {
  const connected = mongoose.connection.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
