import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@/shared/types';

interface TaskCardProps {
    task: Task;
    index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => (
    <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
            <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                className="bg-white shadow-md rounded p-4 mb-2"
            >
                <div className='flex'>
                    <p className='font-bold flex-shrink-0 mr-1'>{task.id}</p>
                <h3 className='font-semibold mb-1 text-black'>{task.title}</h3>
                </div>
                <p className='font-medium text-gray-600'>{task.description}</p>
            </div>
        )}
    </Draggable>
);

export default TaskCard;
