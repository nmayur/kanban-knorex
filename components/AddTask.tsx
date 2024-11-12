import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Addtask } from "@/shared/types";

interface AddTaskProps {
  addNewTask: (task: Addtask) => void; // Function passed from parent to handle adding new task
}

const AddTask: React.FC<AddTaskProps> = ({ addNewTask }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [openModal, setOpenModal] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the new task with unique ID and default status
    const newTask: Addtask = {
      title,
      description,
    };

    // Pass the new task to the parent component
    addNewTask(newTask);

    // Reset the form
    setTitle("");
    setDescription("");
    setOpenModal(false)
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <button className="bg-blue-600 text-white font-semibold px-4 py-1 rounded-full flex items-center">
        <Plus size={18} className="mr-1" /> Add Task
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="title" className="block mb-2">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="description" className="mb-2 block">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <DialogFooter>
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium w-full py-2 rounded-full"
            >
              Add Task
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
