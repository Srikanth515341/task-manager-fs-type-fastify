// client/src/pages/Home.tsx

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTask, deleteTask, getTasks, updateTaskStatus } from "../services/taskService";
import "../styles/Home.css";

interface Task {
  id: string;
  title: string;
  status: "pending" | "done";
}

export default function Home() {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const addTaskMutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "pending" | "done" }) =>
      updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await addTaskMutation.mutateAsync({ title, status: "pending" });
    setTitle("");
  };

  const handleDelete = async (id: string) => {
    await deleteTaskMutation.mutateAsync(id);
  };

  const handleStatusChange = async (id: string, currentStatus: "pending" | "done") => {
    const newStatus = currentStatus === "pending" ? "done" : "pending";
    await updateTaskStatusMutation.mutateAsync({ id, status: newStatus });
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Task Manager</h1>
        <form className="input-group" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        {isLoading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="no-tasks">No tasks available</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <span className="task-text">
                  {task.title} - {task.status}
                </span>
                <div className="task-buttons">
                  {task.status === "pending" && (
                    <button
                      className="done"
                      onClick={() => handleStatusChange(task.id, task.status)}
                    >
                      Mark as Done
                    </button>
                  )}
                  <button
                    className="delete"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
