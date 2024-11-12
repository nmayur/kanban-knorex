import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';
import { Task, ColumnType } from '@/shared/types';

interface ColumnProps {
    title: string;
    columnId: ColumnType;
    tasks: Task[];
}

const Column: React.FC<ColumnProps> = ({ title, columnId, tasks }) => (
    <div className="bg-gray-200 py-4 px-2 rounded w-full mb-5 lg:mb-0">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <Droppable droppableId={columnId}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="min-h-[300px] p-2 bg-gray-100 rounded"
                >
                    {tasks.map((task, index) => (
                        <TaskCard key={task.id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </div>
);

export default Column;
