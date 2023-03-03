import { Task } from './task';
import { environment } from '../environments/environment';

const userId = localStorage.getItem('userId');
if (!userId) {
  localStorage.setItem('userId', Math.random().toString(36).substring(2));
}
const apiUrl = `${environment.api}/users/${userId}`;

let tasks: Task[] | undefined;

export enum TaskFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed'
}

export async function getTasks(filter: TaskFilter = TaskFilter.All): Promise<Task[]> {
  if (tasks === undefined) {
    const response = await fetch(`${apiUrl}/tasks/`);
    tasks = await response.json() as Task[];
  }

  switch (filter) {
    case TaskFilter.Active:
      return tasks.filter(task => !task.completed);
    case TaskFilter.Completed:
      return tasks.filter(task => task.completed);
    default:
      return [...tasks];
  }
}

export async function addTask(description: string) {
  const response = await fetch(`${apiUrl}/tasks/`, {
    method: 'POST',
    body: JSON.stringify({ description })
  });
  const task = await response.json() as Task;
  tasks?.push(task);
}

export async function setTaskCompleted(task: Task, completed: boolean) {
  task.completed = completed;
  await fetch(`${apiUrl}/tasks/${task.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed })
  });
}
