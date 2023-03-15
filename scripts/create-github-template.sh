#!/usr/bin/env bash
##############################################################################
# Usage: ./create-github-template.sh [--local]
# Creates the project template and push it to GitHub.
##############################################################################

set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")"
cd ..

TEMPLATE_HOME=/tmp/copilot-nodejs-todo
GH_USER=$(git config user.name)
TEMPLATE_REPO=https://$GH_USER:$GH_TOKEN@github.com/Azure-Samples/copilot-nodejs-todo-template.git

echo "Preparing GitHub project template..."
rm -rf "$TEMPLATE_HOME"
mkdir -p "$TEMPLATE_HOME"
find . -type d -not -path '*node_modules*' -not -path '*.git/*' -exec mkdir -p '{}' "$TEMPLATE_HOME/{}" ';'
find . -type f -not -path '*node_modules*' -not -path '*.git/*' -exec cp -r '{}' "$TEMPLATE_HOME/{}" ';'
cd "$TEMPLATE_HOME"
rm -rf .git
git init -b main

# Prepare project template
rm -rf .github
rm -rf packages/server/src/services/db.*ts

echo "import express from 'express';
import { Task } from '../models/task';
import { DbService } from '../services/db';

const router = express.Router();

router.get('/', async function(req, res) {
  res.json({ message: 'server up' });
});

router.get('/users/:userId/tasks', async function(req, res) {
  try {
    const { userId } = req.params;

    // TODO: get tasks from database
    const tasks: Task[] = [];

    res.json({ tasks });
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

router.post('/users/:userId/tasks', async function(req, res) {
  try {
    const { userId } = req.params;
    const task = {
      ...req.body,
      userId,
      completed: false
    };

    // TODO: create task in database

    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

router.get('/tasks/:taskId', async function(req, res) {
  try {
    const { taskId } = req.params;
    
    // TODO: get task from database
    const task = {};

    res.json(task);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

router.put('/tasks/:taskId', async function(req, res) {
  try {
    const { taskId } = req.params;
    
    // TODO: get existing task in database
    const task = {};
    task.completed = Boolean(req.body?.completed);

    // TODO: update task in database
    const updatedTask = {};

    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

router.delete('/tasks/:taskId', async function(req, res) {
  try {
    const { taskId } = req.params;
    
    // TODO: delete task in database

    res.sendStatus(204);
  } catch (error: any) {
    res.status(500).json({ error: error?.message || 'Internal server error' });
  }
});

export default router;
" > packages/server/src/routes/index.ts

# Remove unnecessary files
rm -rf node_modules
rm -rf TODO
rm -rf package-lock.json
rm -rf scripts
rm -rf docs

if [[ ${1-} == "--local" ]]; then
  echo "Local mode: skipping GitHub push."
  open "$TEMPLATE_HOME"
else
  # Update git repo
  git remote add origin $TEMPLATE_REPO
  git add .
  git commit -m "chore: initial commit"
  git push -u origin main --force

  rm -rf "$TEMPLATE_HOME"
fi

echo "Successfully updated project template."
