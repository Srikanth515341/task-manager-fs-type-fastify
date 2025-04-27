// client/src/components/TaskList.tsx

import React from "react";
import { useTaskStore } from "../store/taskStore";

export const TaskList = () => {
  const { tasks, updateTaskStatus, deleteTask } = useTaskStore();

  const handleMarkAsDone = (id: string) => {
    updateTaskStatus(id, "done");
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks available</p>
      ) : (
        tasks.map((task) => (
          <li key={task.id} className="task-item">
            <span className="task-text">
              {task.title} - {task.status}
            </span>
            <div className="task-buttons">
              {task.status !== "done" && (
                <button className="done" onClick={() => handleMarkAsDone(task.id)}>
                  Mark as Done
                </button>
              )}
              <button className="delete" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))
      )}
    </ul>
  );
};
