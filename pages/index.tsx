import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTasks } from "@/store/taskSlice";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";

const Board = dynamic(() => import("@/components/Board"), {
  ssr: false,
});

const AddTask = dynamic(() => import("@/components/AddTask"), {
  ssr: false,
});

export default function Home() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        dispatch(setTasks(data));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  return (
    <div>
      <div className="lg:container mx-auto p-4">
        <div className="flex justify-between items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-full flex items-center"
          >
            <Plus size={18} className="mr-2" /> Add Task
          </button>
        </div>

        {openAddModal && (
          <AddTask openModal={openAddModal} setOpenModal={setOpenAddModal} />
        )}

        <div className="md:w-1/2 w-full mb-3">
          <input
            type="text"
            className="p-2 border-2 rounded-md w-full"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Board filteredTasks={filteredTasks} />
      </div>
    </div>
  );
}
