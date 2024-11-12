import { initialTasks } from '@/data/task';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
    body,
  } = req;

  const taskId = parseInt(id as string);
  const taskIndex = initialTasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (method === 'PUT') {
    const { status } = body;

    if (status === 'completed') {
      initialTasks[taskIndex].completed = true;
      initialTasks[taskIndex].inProgress = false;
    } else if (status === 'inProgress') {
      initialTasks[taskIndex].inProgress = true;
      initialTasks[taskIndex].completed = false;
    } else if (status === 'todo') {
      initialTasks[taskIndex].inProgress = false;
      initialTasks[taskIndex].completed = false;
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }

    return res.status(200).json({ task: initialTasks[taskIndex] });
  } else {
    res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
