// client/src/pages/Home.tsx

import { useState, useEffect } from "react";
import { addTask, deleteTask, getTasks, updateTaskStatus } from "../services/taskService";
import { useTaskStore } from "../store/taskStore";
import "../styles/Home.css";

export default function Home() {
  const { tasks, setTasks } = useTaskStore();
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = await addTask({ title, status: "pending" });
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const handleMarkAsDone = async (id: string) => {
    await updateTaskStatus(id, "done");
    loadTasks();
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    loadTasks();
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

        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks available</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <span className="task-text">{task.title} - {task.status}</span>
                <div className="task-buttons">
                  {task.status === "pending" && (
                    <button className="done" onClick={() => handleMarkAsDone(task.id)}>
                      Mark as Done
                    </button>
                  )}
                  <button className="delete" onClick={() => handleDelete(task.id)}>
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
