import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "@/shared/types";
import { Pencil, Trash2 } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { deleteTask } from "@/store/taskSlice";
import AddTask from "./AddTask";

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
  const dispatch = useAppDispatch();
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
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
                className="bg-blue-500 text-white rounded p-1 cursor-pointer hover:bg-blue-700 mr-2"
                onClick={() => setOpenModal(true)}
              >
                <Pencil size={18} />
              </button>
              <button
                className="bg-red-500 text-white rounded p-1 cursor-pointer hover:bg-red-700"
                onClick={() => dispatch(deleteTask(task.id))}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}
      </Draggable>

      {/* Render AddTask as an edit modal */}
      <AddTask openModal={openModal} setOpenModal={setOpenModal} existingTask={task} />
    </>
  );
};

export default TaskCard;
