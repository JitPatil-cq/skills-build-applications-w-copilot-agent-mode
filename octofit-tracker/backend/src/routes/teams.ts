import { Router } from 'express';
import Team from '../models/team.js';
import { requireValidId, requireJsonObject } from '../middleware/validation.js';

const router = Router();

router.get('/', async (_request, response) => {
  response.json(await Team.find().populate('members', 'username name'));
});

router.post('/', requireJsonObject, async (request, response) => {
  response.status(201).json(await Team.create(request.body));
});

router.get('/:id', requireValidId, async (request, response) => {
  const team = await Team.findById(request.params.id).populate('members', 'username name');
  if (!team) {
    response.status(404).json({ error: 'Team not found' });
    return;
  }
  response.json(team);
});

router.patch('/:id', requireValidId, requireJsonObject, async (request, response) => {
  const team = await Team.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    runValidators: true,
  }).populate('members', 'username name');
  if (!team) {
    response.status(404).json({ error: 'Team not found' });
    return;
  }
  response.json(team);
});

router.delete('/:id', requireValidId, async (request, response) => {
  const team = await Team.findByIdAndDelete(request.params.id);
  if (!team) {
    response.status(404).json({ error: 'Team not found' });
    return;
  }
  response.status(204).end();
});

export default router;
