// DarkTodoApp.tsx

"use client";

import React, { useEffect, useState } from "react";
import RanderTask from "@/app/components/RanderTask"; // Import RanderTask component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronRight,
  ChevronDown,
  CalendarDays,
  PlusCircle,
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  date: string;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newTaskDate, setNewTaskDate] = useState<string>("");
  const [showCompleted, setShowCompleted] = useState<boolean>(false);
  // useEffect(() => {
  //   const storedTasks = sessionStorage.getItem("tasks");
  //   if (storedTasks) {
  //     setTasks(JSON.parse(storedTasks));
  //   }
  // }, []);
  const addTask = () => {
    if (newTask.trim() !== "") {
      const updatedTasks = [
        ...tasks,
        {
          id: Date.now(),
          title: newTask,
          completed: false,
          date: newTaskDate,
        },
      ];
      setTasks(updatedTasks);
      // sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setNewTask("");
      setNewTaskDate("");
    }
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);

    // sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    // sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const updateTaskTitle = (id: number, newTitle: string) => {
    if (newTitle.trim() !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle.trim() } : task
      );
      setTasks(updatedTasks);
      // sessionStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  return (
    <div className="min-h-screen  flex justify-center max-h-screen bg-slate-50 p-4">
      <Card className="max-w-[90dvw] min-w-[90dvw]  max-h-full   border-0   text-black/80 flex  p-4">
        <CardContent className="w-full  flex justify-between flex-col !p-0 md:p-6">
          <div className=" mb-6">
            <h1 className="text-2xl font-bold text-blue-400 mb-2">Todo List</h1>
            <Separator />
          </div>
          <div
            className="flex flex-col flex-1  overflow-y-auto scroll-smooth "
            style={{ scrollbarWidth: "thin" }}
          >
            <AnimatePresence>
              {tasks
                .filter((task) => !task.completed)
                .reverse()
                .map((task) => (
                  <React.Fragment key={task.id}>
                    <RanderTask
                      task={task}
                      toggleTask={toggleTask}
                      deleteTask={deleteTask}
                      updateTaskTitle={updateTaskTitle}
                    />
                    {/* {index !== tasks.length - 1 && <Separator />} */}
                  </React.Fragment>
                ))}
            </AnimatePresence>

            {tasks.filter((t) => t.completed).length > 0 && (
              <div className="mt-4 mb-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowCompleted(!showCompleted)}
                  className="text-gray-400 px-4"
                >
                  {showCompleted ? (
                    <ChevronDown className="h-4 w-4 mr-2" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2" />
                  )}
                  Completed {tasks.filter((t) => t.completed).length}
                </Button>
              </div>
            )}

            {showCompleted && (
              <AnimatePresence>
                {tasks
                  .filter((task) => task.completed)
                  .map((task) => (
                    <React.Fragment key={task.id}>
                      <RanderTask
                        task={task}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                        updateTaskTitle={updateTaskTitle}
                      />
                      {/* {index !== tasks.length - 1 && <Separator />} */}
                    </React.Fragment>
                  ))}
              </AnimatePresence>
            )}
          </div>

          <div className="flex  gap-1 items-center justify-center w-full">
            <div className="grow  flex items-center gap-2 border rounded-md border-gray-300 px-1">
              <div className="flex-grow items-center flex gap-2 ">
                <Input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add your task..."
                  className="flex-grow  border-none text-sm h-10  focus:ring-0 focus:!ring-transparent "
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTask.trim() !== "") {
                      addTask();
                    }
                  }}
                />

                <div className="relative flex gap-1 items-center ">
                  <span className=" text-xs md:text-sm w-10 md:w-20">
                    {newTaskDate !== "" && newTaskDate}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className=" text-gray-800   focus:ring-0"
                    onClick={() => {
                      const picker = document.getElementById(
                        "date-picker"
                      ) as HTMLInputElement;
                      picker?.showPicker();
                    }}
                  >
                    <CalendarDays className="h-4 w-4 self" />
                  </Button>
                  <Input
                    id="date-picker"
                    type="date"
                    value={newTaskDate}
                    onChange={(e) => setNewTaskDate(e.target.value)}
                    className="sr-only"
                  />
                </div>
              </div>
            </div>
            <Button
              className="flex items-center !h-10 bg-[#60a5fa] gap-1"
              size={"sm"}
              onClick={addTask}
            >
              <PlusCircle />
              <span>Add</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
