// client/src/services/taskService.ts

import axios from 'axios';
import { Task } from '../types/Task';

const API_URL = 'http://localhost:5000';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const addTask = async (task: Omit<Task, 'id' | 'status'>): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};

export const updateTaskStatus = async (id: string, status: 'pending' | 'done'): Promise<void> => {
  await axios.patch(`${API_URL}/tasks/${id}`, { status });
};
