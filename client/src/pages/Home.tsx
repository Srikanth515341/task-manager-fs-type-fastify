// client/src/pages/Home.tsx

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, addTask, deleteTask, updateTaskStatus } from "../services/taskService";
import "../styles/Home.css";

export default function Home() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const { data: tasks, isLoading } = useQuery({
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

  const updateStatusMutation = useMutation({
    mutationFn: updateTaskStatus,
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

  const handleUpdateStatus = async (id: string) => {
    await updateStatusMutation.mutateAsync(id);
  };

  const sortedTasks = tasks
    ? [...tasks].sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status === "pending" ? -1 : 1;
      })
    : [];

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Task Manager</h1>
        <form onSubmit={handleSubmit} className="input-group">
          <input
            type="text"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Add Task</button>
        </form>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {sortedTasks.length === 0 ? (
              <p className="no-tasks">No tasks available</p>
            ) : (
              <ul className="task-list">
                {sortedTasks.map((task) => (
                  <li key={task.id} className="task-item">
                    <span className="task-text">
                      {task.title} - {task.status}
                    </span>
                    <div className="task-buttons">
                      {task.status === "pending" && (
                        <button
                          className="done"
                          onClick={() => handleUpdateStatus(task.id)}
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
          </>
        )}
      </div>
    </div>
  );
}
