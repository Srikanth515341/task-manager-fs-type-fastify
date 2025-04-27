// client/src/components/TaskList.tsx

import { useTaskStore } from '../store/taskStore';
import { useEffect } from 'react';
import { fetchTasks, deleteTask, updateTaskStatus } from '../services/taskService';

const TaskList = () => {
  const { tasks, setTasks } = useTaskStore();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Failed to fetch tasks', error);
      }
    };

    loadTasks();
  }, [setTasks]);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: 'pending' | 'done') => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
    try {
      await updateTaskStatus(id, newStatus);
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <span>{task.title}</span>
              <button onClick={() => handleStatusToggle(task.id, task.status)}>
                {task.status === 'pending' ? 'Mark as Done' : 'Mark as Pending'}
              </button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
