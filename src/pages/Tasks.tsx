import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchTasks } from '../store/slices/tasksSlice';
import { RootState } from '../store';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

interface TasksProps {
  filter?: 'all' | 'important' | 'planned' | 'today';
}

const Tasks: React.FC<TasksProps> = ({ filter = 'all' }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    if (user) {
      dispatch(fetchTasks(user.id));
    }
  }, [dispatch, user]);

  const getPageTitle = () => {
    switch (filter) {
      case 'today':
        return 'Today';
      case 'important':
        return 'Important';
      case 'planned':
        return 'Planned';
      default:
        return 'All Tasks';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-light-text dark:text-dark-text text-lg font-medium">
          {getPageTitle()}
        </h1>
      </div>
      <TaskInput />
      <TaskList filter={filter} />
    </div>
  );
};

export default Tasks;