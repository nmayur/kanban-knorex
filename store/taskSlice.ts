// src/store/taskSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Addtask, Task } from "@/shared/types";

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    addTask(state, action: PayloadAction<Addtask>) {
      const tasks = state.tasks;
      const lastTask = tasks[tasks.length - 1];
      const newTask: Task = {
        ...action.payload,
        id: lastTask.id + 1,
        userId: 1,
      };
      state.tasks.push(newTask);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1)
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
    },
    deleteTask(state, action: PayloadAction<number>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    editTask(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask, editTask } =
  taskSlice.actions;
export default taskSlice.reducer;
