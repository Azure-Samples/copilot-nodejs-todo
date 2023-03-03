import express from 'express';
const router = express.Router();

router.get('/', async function(req, res) {
  res.json({ message: 'server up' });
});

router.get('/users/:userId/tasks', async function(req, res) {
  try {
    const { userId } = req.params;
    const tasks = []

    // TODO: get tasks from database

    res.json({ tasks });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

router.post('/users/:userId/tasks', async function(req, res) {
  try {
    const { userId } = req.params;
    const task = req.body;

    // TODO: add task to database

    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

router.get('/users/:userId/tasks/:taskId', async function(req, res) {
  try {
    const { userId, taskId } = req.params;
    
    // TODO: get task from database
    const task = {};

    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

router.put('/users/:userId/tasks/:taskId', async function(req, res) {
  try {
    const { userId, taskId } = req.params;
    const task = req.body;
    
    // TODO: update task in database
    const updatedTask = {};

    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

router.delete('/users/:userId/tasks/:taskId', async function(req, res) {
  try {
    const { userId, taskId } = req.params;
    
    // TODO: delete task in database

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

export default router;
