import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Task, TasksState } from '../../types';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

// Simulated API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId: string) => {
    await delay(1000);
    const storedTasks = localStorage.getItem(`tasks_${userId}`);
    return storedTasks ? JSON.parse(storedTasks) : [];
  }
);

export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (task: Omit<Task, 'id' | 'createdAt'>) => {
    await delay(500);
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    return newTask;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task: Task) => {
    await delay(500);
    return task;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    await delay(500);
    return taskId;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      // Add Task
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
        localStorage.setItem(`tasks_${action.payload.userId}`, JSON.stringify(state.tasks));
      })
      // Update Task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
          localStorage.setItem(`tasks_${action.payload.userId}`, JSON.stringify(state.tasks));
        }
      })
      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        if (state.tasks.length > 0) {
          localStorage.setItem(`tasks_${state.tasks[0].userId}`, JSON.stringify(state.tasks));
        }
      });
  },
});

export default tasksSlice.reducer;