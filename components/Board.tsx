import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from './Column';
import { Task, ColumnType } from '@/shared/types';

interface BoardProps {
  initialTasks: Task[];
}

const Board: React.FC<BoardProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  // Function to get tasks based on their column status
  const getTasksByColumn = (columnId: ColumnType) => {
    return tasks.filter((task) =>
      columnId === 'todo'
        ? !task.completed && !task.inProgress 
        : columnId === 'inProgress'
        ? task.inProgress 
        : columnId === 'completed' && task.completed
    );
  };

  // Handle the drag and drop logic
  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; 

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(source.index, 1);

    let newStatus: 'completed' | 'inProgress' | 'todo' = 'todo';
    if (destination.droppableId === 'completed') {
      newStatus = 'completed';
      movedTask.completed = true;
      movedTask.inProgress = false;
    } else if (destination.droppableId === 'inProgress') {
      newStatus = 'inProgress';
      movedTask.inProgress = true;
      movedTask.completed = false;
    } else {
      newStatus = 'todo';
      movedTask.inProgress = false;
      movedTask.completed = false;
    }

    // Update status via API
    try {
      const response = await fetch(`/api/tasks/${movedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        updatedTasks.splice(destination.index, 0, updatedTask.task);
        setTasks(updatedTasks); 
      } else {
        console.error('Error updating task status');
      }
    } catch (error) {
      console.error('Error in API request:', error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between space-x-4">
        <Column title="To Do" columnId="todo" tasks={getTasksByColumn('todo')} />
        <Column title="In Progress" columnId="inProgress" tasks={getTasksByColumn('inProgress')} />
        <Column title="Completed" columnId="completed" tasks={getTasksByColumn('completed')} />
      </div>
    </DragDropContext>
  );
};

export default Board;
