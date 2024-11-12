import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from './Column';
import { Task, ColumnType } from '@/shared/types';

interface BoardProps {
  tasks: Task[];
  updateTaskStatus: (task:Task ) => void
}

const Board: React.FC<BoardProps> = ({ tasks, updateTaskStatus }) => {

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
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
  
    // Find the task that was dragged
    const movedTask = tasks.find(task => task.id === Number(draggableId));
  
    if (!movedTask) return;
  
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
  
    // Pass updated task to the parent to update the state
    updateTaskStatus(movedTask);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between lg:space-x-4 flex-wrap md:flex-nowrap">
        <Column title="To Do" columnId="todo" tasks={getTasksByColumn('todo')} />
        <Column title="In Progress" columnId="inProgress" tasks={getTasksByColumn('inProgress')} />
        <Column title="Completed" columnId="completed" tasks={getTasksByColumn('completed')} />
      </div>
    </DragDropContext>
  );
};

export default Board;
