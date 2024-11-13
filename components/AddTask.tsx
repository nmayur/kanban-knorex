import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Addtask, Task } from "@/shared/types";
import { addTask, editTask } from "@/store/taskSlice";
import { useAppDispatch } from "@/store/hooks";

interface AddTaskProps {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  existingTask?: Task;
}

const AddTask: React.FC<AddTaskProps> = ({ openModal, setOpenModal, existingTask }) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>(existingTask?.title || "");
  const [description, setDescription] = useState<string>(existingTask?.description || "");
  const [status, setStatus] = useState<string>(
    existingTask?.completed ? "completed" : existingTask?.inProgress ? "inProgress" : "todo"
  );

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setStatus(
        existingTask.completed ? "completed" : existingTask.inProgress ? "inProgress" : "todo"
      );
    } else {
      setTitle("");
      setDescription("");
      setStatus("todo");
    }
  }, [existingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData: Addtask | Task = {
      title,
      description,
      completed: status === "completed",
      inProgress: status === "inProgress",
    };

    if (existingTask) {
      dispatch(editTask({ ...taskData, id: existingTask.id, userId: existingTask.userId }));
    } else {
      dispatch(addTask(taskData));
    }

    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{existingTask ? "Edit Task" : "Add Task"}</DialogTitle>
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

          <div className="mb-4">
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

          <div className="mb-6">
            <Label htmlFor="status" className="mb-2 block">
              Status
            </Label>
            <Select onValueChange={(value) => setStatus(value)} defaultValue={status}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium w-full py-2 rounded-full"
            >
              {existingTask ? "Update Task" : "Add Task"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTask;
