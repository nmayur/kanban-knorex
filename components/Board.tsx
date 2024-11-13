import React from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./Column";
import { Task, ColumnType } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTask } from "@/store/taskSlice";

interface propsI {
  filteredTasks: Task[];
}

const Board: React.FC<propsI> = ({ filteredTasks }) => {
  const dispatch = useAppDispatch();

  let tasks = useAppSelector((state) => state.tasks.tasks);

  // if search filter is on show filtered tasks else from the store
  tasks = filteredTasks?.length ? filteredTasks : tasks;

  // Function to get tasks based on their column status
  const getTasksByColumn = (columnId: ColumnType) => {
    return tasks.filter((task) =>
      columnId === "todo"
        ? !task.completed && !task.inProgress
        : columnId === "inProgress"
        ? task.inProgress
        : columnId === "completed" && task.completed
    );
  };

  // Handle the drag and drop logic
  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Find the task that was dragged
    const movedTask = tasks.find((task) => task.id === Number(draggableId));
    if (!movedTask) return;

    const updatedTask: Task = {
      ...movedTask,
      completed: destination.droppableId === "completed",
      inProgress: destination.droppableId === "inProgress",
    };

    dispatch(updateTask(updatedTask));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex justify-between lg:space-x-4 flex-wrap md:flex-nowrap">
        <Column
          title="To Do"
          columnId="todo"
          tasks={getTasksByColumn("todo")}
        />
        <Column
          title="In Progress"
          columnId="inProgress"
          tasks={getTasksByColumn("inProgress")}
        />
        <Column
          title="Completed"
          columnId="completed"
          tasks={getTasksByColumn("completed")}
        />
      </div>
    </DragDropContext>
  );
};

export default Board;
