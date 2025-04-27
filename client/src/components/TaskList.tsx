// client/src/components/TaskList.tsx

import { useTaskStore } from "../store/taskStore";
import { deleteTask as deleteTaskApi, updateTaskStatus } from "../services/taskService";

const TaskList = () => {
  const { tasks, setTasks } = useTaskStore();

  const handleDelete = async (id: string) => {
    await deleteTaskApi(id);
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleStatusChange = async (id: string) => {
    const task = tasks.find(task => task.id === id);
    if (!task) return;
    const newStatus = task.status === "pending" ? "done" : "pending";
    await updateTaskStatus(id, newStatus);
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  if (tasks.length === 0) {
    return <p>No tasks available</p>;
  }

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} style={{ marginBottom: "10px" }}>
          {task.title} - {task.status}
          <button onClick={() => handleStatusChange(task.id)} style={{ marginLeft: "10px" }}>
            Mark as {task.status === "pending" ? "Done" : "Pending"}
          </button>
          <button onClick={() => handleDelete(task.id)} style={{ marginLeft: "10px" }}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
