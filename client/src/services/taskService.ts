import axios from "axios";
import { Task } from "../store/taskStore";

const API_URL = "http://localhost:5000/tasks";

// Create Task
export const addTask = async (task: { title: string; status: string }) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Fetch All Tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data as Task[];
};

// Update Task Status
export const updateTaskStatus = async (id: string, status: "pending" | "done") => {
  const response = await axios.put(`${API_URL}/${id}`, { status });
  return response.data;
};

// Delete Task
export const deleteTask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
