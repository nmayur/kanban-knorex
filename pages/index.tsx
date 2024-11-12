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

  return (
    <div>
      <div className="lg:container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
        <Board initialTasks={tasks} />
      </div>
    </div>
  );
}
