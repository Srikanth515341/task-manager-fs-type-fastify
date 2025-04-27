// client/src/services/taskService.ts

import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

// Fetch all tasks
export const fetchTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new task
export const addTask = async (task: { title: string }) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update task status
export const updateTaskStatus = async (id: string, status: "pending" | "done") => {
  const response = await axios.put(`${API_URL}/${id}`, { status });
  return response.data;
};

// Delete a task
export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
