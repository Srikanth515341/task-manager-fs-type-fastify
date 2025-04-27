// client/src/pages/Home.tsx

import { useState } from 'react';
import { addTask } from '../services/taskService';
import { useTaskStore } from '../store/taskStore';
import TaskList from '../components/TaskList';
import '../styles/Home.css';

const Home = () => {
  const [title, setTitle] = useState('');
  const { setTasks, tasks } = useTaskStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const newTask = await addTask({ title });
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (error) {
      console.error('Failed to add task', error);
    }
  };

  return (
    <div className="home-container">
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Enter your task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <TaskList />
    </div>
  );
};

export default Home;
