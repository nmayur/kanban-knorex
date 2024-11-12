import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "@/shared/types";
import { Trash2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  index: number;
  deleteTask: (tak: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, deleteTask }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="bg-white shadow-md rounded p-4 mb-2"
        >
          <div className="flex">
            <p className="font-bold flex-shrink-0 mr-1">{task.id}</p>
            <h3 className="font-semibold mb-1 text-black">{task.title}</h3>
          </div>
          <p className="font-medium text-gray-600">{task.description}</p>

          <div className="flex items-center justify-end mt-4">
            <button
              className="bg-red-500 text-white rounded p-1 cursor-pointer hover:bg-red-700"
              onClick={() => deleteTask(task)}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
