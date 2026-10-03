import { Router } from 'express';
import User from '../models/user.js';
import { requireValidId, requireJsonObject } from '../middleware/validation.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await User.find().sort({ name: 1 }));
});

router.post('/', requireJsonObject, async (request, response) => {
  response.status(201).json(await User.create(request.body));
});

router.get('/:id', requireValidId, async (request, response) => {
  const user = await User.findById(request.params.id);
  if (!user) {
    response.status(404).json({ error: 'User not found' });
    return;
  }
  response.json(user);
});

router.patch('/:id', requireValidId, requireJsonObject, async (request, response) => {
  const user = await User.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    response.status(404).json({ error: 'User not found' });
    return;
  }
  response.json(user);
});

router.delete('/:id', requireValidId, async (request, response) => {
  const user = await User.findByIdAndDelete(request.params.id);
  if (!user) {
    response.status(404).json({ error: 'User not found' });
    return;
  }
  response.status(204).end();
});

export default router;
