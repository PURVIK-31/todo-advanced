import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updateTask, deleteTask } from '../store/slices/tasksSlice';
import { Task } from '../types';
import { Star, Trash2, Calendar, Users, Bell } from 'lucide-react';
import { format, isToday, isTomorrow, isYesterday } from 'date-fns';
import UserSearch from './UserSearch';

interface TaskListProps {
  filter?: 'all' | 'important' | 'planned' | 'today';
}

const TaskList: React.FC<TaskListProps> = ({ filter = 'all' }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { user: currentUser } = useSelector((state: RootState) => state.auth);

  const filteredTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filter) {
      case 'important':
        return task.starred;
      case 'planned':
        return task.dueDate;
      case 'today':
        return task.dueDate === today;
      case 'assigned':
        return task.assignedTo === currentUser?.id;
      default:
        return true;
    }
  });

  const handleToggleComplete = (task: Task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleToggleStarred = (task: Task) => {
    dispatch(updateTask({ ...task, starred: !task.starred }));
  };

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleAssignUser = (task: Task, assignedToUser: any) => {
    dispatch(updateTask({
      ...task,
      assignedTo: assignedToUser.id,
      assignedToUser
    }));
  };

  const formatDueDate = (date: string) => {
    const dueDate = new Date(date);
    if (isToday(dueDate)) return 'Today';
    if (isTomorrow(dueDate)) return 'Tomorrow';
    if (isYesterday(dueDate)) return 'Yesterday';
    return format(dueDate, 'MMM d');
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTasks.filter(t => !t.completed).map((task) => (
          <div
            key={task.id}
            className="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-4 group hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
                className="mt-1 w-5 h-5 rounded-sm border-2 border-light-border dark:border-dark-border bg-transparent checked:bg-accent-green checked:border-accent-green cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-light-text dark:text-dark-text text-sm font-medium">
                    {task.title}
                  </span>
                  <button
                    onClick={() => handleToggleStarred(task)}
                    className={`p-1 rounded hover:bg-light-input dark:hover:bg-dark-input ${
                      task.starred ? 'text-yellow-500' : 'text-light-text-secondary dark:text-dark-text-secondary'
                    }`}
                  >
                    <Star size={16} />
                  </button>
                </div>
                
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-light-text-secondary dark:text-dark-text-secondary">
                      <Calendar size={14} />
                      <span className="text-xs">{formatDueDate(task.dueDate)}</span>
                    </div>
                  )}
                  {task.assignedToUser && (
                    <div className="flex items-center gap-1">
                      <img
                        src={task.assignedToUser.avatar}
                        alt={task.assignedToUser.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {task.assignedToUser.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-light-border dark:border-dark-border flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <UserSearch
                onSelect={(user) => handleAssignUser(task, user)}
                selectedUserId={task.assignedTo}
              />
              <button
                onClick={() => handleDelete(task.id)}
                className="p-1 rounded hover:bg-light-input dark:hover:bg-dark-input text-light-text-secondary dark:text-dark-text-secondary hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredTasks.filter(t => t.completed).length > 0 && (
        <div className="mt-8">
          <div className="text-light-text-secondary dark:text-dark-text-secondary text-sm mb-4">
            Completed
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTasks.filter(t => t.completed).map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-dark-surface rounded-lg shadow-sm p-4 group hover:shadow-md transition-shadow opacity-60"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task)}
                    className="mt-1 w-5 h-5 rounded-sm border-2 border-light-border dark:border-dark-border bg-transparent checked:bg-accent-green checked:border-accent-green cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm line-through">
                        {task.title}
                      </span>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {task.dueDate && (
                        <div className="flex items-center gap-1 text-light-text-secondary dark:text-dark-text-secondary">
                          <Calendar size={14} />
                          <span className="text-xs line-through">{formatDueDate(task.dueDate)}</span>
                        </div>
                      )}
                      {task.assignedToUser && (
                        <div className="flex items-center gap-1">
                          <img
                            src={task.assignedToUser.avatar}
                            alt={task.assignedToUser.name}
                            className="w-5 h-5 rounded-full opacity-50"
                          />
                          <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary line-through">
                            {task.assignedToUser.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredTasks.length === 0 && (
        <div className="text-center text-light-text-secondary dark:text-dark-text-secondary py-8">
          No tasks found
        </div>
      )}
    </div>
  );
};

export default TaskList;