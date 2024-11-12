import { useState, useEffect } from "react";
import { Task, Addtask } from "@/shared/types";
import dynamic from "next/dynamic";

const Board = dynamic(() => import("@/components/Board"), {
  ssr: false,
});

const AddTask = dynamic(() => import("@/components/AddTask"), {
  ssr: false,
});

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addtask = (task: Addtask) => {
    const lastTask = tasks[tasks.length - 1]
    const payload: Task = {
      ...task, 
      id: lastTask.id + 1,
      completed: false,
      inProgress: false,
      userId: 1
    }
    setTasks([...tasks, payload]);
  }

  const deleteTask = (task: Task) => {
    const updatedTasks = tasks.filter((each:Task) => each.id !== task.id);
    setTasks(updatedTasks)
  }

  return (
    <div>
      <div className="lg:container mx-auto p-4">
        <div className="flex justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <AddTask addNewTask={addtask} />
        </div>
        <Board tasks={tasks} setTasks={setTasks} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
