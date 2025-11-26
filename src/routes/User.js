const express = require('express');

const router = express.Router();

// Simple in-memory users store (for demo purposes)
let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

const nextId = () => (users.length ? Math.max(...users.map(u => u.id)) + 1 : 1);

// GET /users - list users
router.get('/', (req, res) => {
  res.json(users);
});

// GET /users/:id - get a user
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /users - create a user
router.post('/', (req, res) => {
  const { name } = req.body || {};
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const user = { id: nextId(), name };
  users.push(user);
  res.status(201).json(user);
});

// PUT /users/:id - update a user
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body || {};
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  if (!name) return res.status(400).json({ error: 'Name is required' });
  users[idx].name = name;
  res.json(users[idx]);
});

// DELETE /users/:id - delete a user
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const removed = users.splice(idx, 1)[0];
  res.json(removed);
});

module.exports = router;