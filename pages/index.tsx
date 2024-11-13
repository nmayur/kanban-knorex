import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
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
  const [openAddModal, setOpenAddModal] = useState(false);

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

        
        <Board />
      </div>
    </div>
  );
}
