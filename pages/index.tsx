import { useState, useEffect } from "react";
import { Task } from "@/shared/types";
import dynamic from "next/dynamic";

const Board = dynamic(() => import("@/components/Board"), {
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

  const updateTaskStatus = (task: Task) => {
    const updatedTasks = tasks.map(t => 
      t.id === task.id ? { ...t, ...task } : t
    );
    setTasks(updatedTasks);
    console.log("Task updated:", updatedTasks);
  };

  return (
    <div>
      <div className="lg:container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
        <Board tasks={tasks} updateTaskStatus={updateTaskStatus} />
      </div>
    </div>
  );
}
