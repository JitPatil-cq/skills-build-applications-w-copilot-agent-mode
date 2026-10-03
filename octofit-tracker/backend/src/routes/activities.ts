import { Router } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import { ApiError } from '../middleware/errors.js';
import { requireValidId, requireJsonObject } from '../middleware/validation.js';

const router = Router();

router.get('/', async (request, response) => {
  const filter: { user?: string; team?: string } = {};
  for (const key of ['userId', 'teamId'] as const) {
    const value = request.query[key];
    if (value === undefined) continue;
    if (typeof value !== 'string' || !mongoose.isValidObjectId(value)) {
      throw new ApiError(400, `Invalid ${key}`);
    }
    filter[key === 'userId' ? 'user' : 'team'] = value;
  }

  response.json(await Activity.find(filter).sort({ date: -1 }).populate('user', 'username name'));
});

router.post('/', requireJsonObject, async (request, response) => {
  response.status(201).json(await Activity.create(request.body));
});

router.get('/:id', requireValidId, async (request, response) => {
  const activity = await Activity.findById(request.params.id).populate('user', 'username name');
  if (!activity) {
    response.status(404).json({ error: 'Activity not found' });
    return;
  }
  response.json(activity);
});

router.patch('/:id', requireValidId, requireJsonObject, async (request, response) => {
  const activity = await Activity.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  }).populate('user', 'username name');
  if (!activity) {
    response.status(404).json({ error: 'Activity not found' });
    return;
  }
  response.json(activity);
});

router.delete('/:id', requireValidId, async (request, response) => {
  const activity = await Activity.findByIdAndDelete(request.params.id);
  if (!activity) {
    response.status(404).json({ error: 'Activity not found' });
    return;
  }
  response.status(204).end();
});

export default router;
