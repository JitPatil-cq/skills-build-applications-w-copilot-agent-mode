import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard.js';
import { requireJsonObject } from '../middleware/validation.js';

const router = Router();

router.get('/', async (request, response) => {
  const period = typeof request.query.period === 'string' ? request.query.period : 'all-time';
  const entries = await LeaderboardEntry.find({ period })
    .sort({ points: -1, updatedAt: 1 })
    .populate('user', 'username name')
    .populate('team', 'name');
  response.json(entries);
});

router.post('/', requireJsonObject, async (request, response) => {
  response.status(201).json(await LeaderboardEntry.create(request.body));
});

export default router;
