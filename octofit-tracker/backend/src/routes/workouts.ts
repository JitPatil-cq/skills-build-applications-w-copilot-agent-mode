import { Router } from 'express';
import User from '../models/user.js';
import Workout from '../models/workout.js';
import {
  requireValidId,
  requireValidObjectId,
  requireJsonObject,
} from '../middleware/validation.js';

const router = Router();

router.get('/recommendations/:userId', requireValidObjectId('userId'), async (request, response) => {
  const user = await User.findById(request.params.userId);
  if (!user) {
    response.status(404).json({ error: 'User not found' });
    return;
  }

  const goal = user.fitnessGoal.trim().toLowerCase();
  const recommendations = goal
    ? await Workout.find({ $or: [{ fitnessGoals: goal }, { fitnessGoals: { $size: 0 } }] })
    : await Workout.find();
  response.json(recommendations);
});

router.get('/', async (_request, response) => {
  response.json(await Workout.find().sort({ title: 1 }));
});

router.post('/', requireJsonObject, async (request, response) => {
  response.status(201).json(await Workout.create(request.body));
});

router.get('/:id', requireValidId, async (request, response) => {
  const workout = await Workout.findById(request.params.id);
  if (!workout) {
    response.status(404).json({ error: 'Workout not found' });
    return;
  }
  response.json(workout);
});

router.patch('/:id', requireValidId, requireJsonObject, async (request, response) => {
  const workout = await Workout.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!workout) {
    response.status(404).json({ error: 'Workout not found' });
    return;
  }
  response.json(workout);
});

router.delete('/:id', requireValidId, async (request, response) => {
  const workout = await Workout.findByIdAndDelete(request.params.id);
  if (!workout) {
    response.status(404).json({ error: 'Workout not found' });
    return;
  }
  response.status(204).end();
});

export default router;
