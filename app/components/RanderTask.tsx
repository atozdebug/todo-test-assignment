"use client";

import { Task } from "@/app/page"; // Adjust the path if needed
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDays, Trash2 } from "lucide-react";
import { useState } from "react";

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  updateTaskTitle: (id: number, newTitle: string) => void;
}

const RanderTask: React.FC<TaskItemProps> = ({
  task,
  toggleTask,
  deleteTask,
  updateTaskTitle,
}) => {
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [temporaryTitle, setTemporaryTitle] = useState(task.title);

  return (
    <motion.div
      key={task.id}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center mb-2   bg-[#f0f0f2]/35 p-2  rounded-md px-4"
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => toggleTask(task.id)}
        className="mr-2 w-4 h-4  border-gray-500"
      />
      {editingTask === task.id ? (
        <Input
          value={temporaryTitle}
          onChange={(e) => setTemporaryTitle(e.target.value)}
          onBlur={() => {
            if (temporaryTitle.trim() !== "") {
              updateTaskTitle(task.id, temporaryTitle);
            } else {
              setTemporaryTitle(task.title);
            }
            setEditingTask(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (temporaryTitle.trim() !== "") {
                updateTaskTitle(task.id, temporaryTitle);
              } else {
                setTemporaryTitle(task.title);
              }
              setEditingTask(null);
            }
          }}
          className="grow border-none text-black/70 text-base !shadow-none focus:!ring-transparent"
          autoFocus
        />
      ) : (
        <span
          className={`grow cursor-pointer ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
          onClick={() => setEditingTask(task.id)}
        >
          {task.title}
        </span>
      )}
      {task.date && (
        <span className="text-xs font-serif text-nowrap text-gray-500 mr-2 flex items-center">
          <CalendarDays className="h-3 w-3 mr-1" />
          {task.date}
        </span>
      )}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => deleteTask(task.id)}
        className="text-gray-500 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </motion.div>
  );
};

export default RanderTask;
