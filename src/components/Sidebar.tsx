import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';
import { 
  ListTodo, 
  Calendar,
  Star,
  Users,
  Plus,
  LogOut,
  Info
} from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const todayTasks = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.dueDate === today;
  });

  const completedTodayTasks = todayTasks.filter(task => task.completed);
  const progress = todayTasks.length ? (completedTodayTasks.length / todayTasks.length) * 100 : 0;

  // Calculate circle properties
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-dark-sidebar text-light-text dark:text-dark-text transition-colors duration-200">
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8 group">
          <div className="relative">
            <img 
              src={user?.avatar} 
              alt={user?.name}
              className="w-12 h-12 rounded-full ring-2 ring-accent-green/20 group-hover:ring-accent-green/40 transition-all duration-300"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-green rounded-full border-2 border-white dark:border-dark-sidebar"></div>
          </div>
          <div>
            <h2 className="font-medium text-sm group-hover:text-accent-green transition-colors duration-200">
              Hey, {user?.name}
            </h2>
            <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              {user?.email}
            </p>
          </div>
        </div>

        <nav className="space-y-1">
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-light-input dark:bg-dark-input text-accent-green translate-x-2' 
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-input dark:hover:bg-dark-input hover:translate-x-1'
              }`
            }
          >
            <ListTodo size={18} />
            <span>All Tasks</span>
          </NavLink>

          <NavLink
            to="/today"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-light-input dark:bg-dark-input text-accent-green translate-x-2' 
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-input dark:hover:bg-dark-input hover:translate-x-1'
              }`
            }
          >
            <Calendar size={18} />
            <span>Today</span>
          </NavLink>

          <NavLink
            to="/important"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-light-input dark:bg-dark-input text-accent-green translate-x-2' 
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-input dark:hover:bg-dark-input hover:translate-x-1'
              }`
            }
          >
            <Star size={18} />
            <span>Important</span>
          </NavLink>

          <NavLink
            to="/planned"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-light-input dark:bg-dark-input text-accent-green translate-x-2' 
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-input dark:hover:bg-dark-input hover:translate-x-1'
              }`
            }
          >
            <Calendar size={18} />
            <span>Planned</span>
          </NavLink>

          <NavLink
            to="/assigned"
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-light-input dark:bg-dark-input text-accent-green translate-x-2' 
                  : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-input dark:hover:bg-dark-input hover:translate-x-1'
              }`
            }
          >
            <Users size={18} />
            <span>Assigned to me</span>
          </NavLink>
        </nav>

        <button
          className="flex items-center gap-3 px-3 py-2 mt-4 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-input dark:hover:bg-dark-input rounded-lg w-full text-sm transition-all duration-200 hover:translate-x-1"
        >
          <Plus size={18} />
          <span>Add list</span>
        </button>

        <div className="mt-8 p-4 bg-light-input dark:bg-dark-input rounded-lg transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Today's Progress</h3>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-accent-green">
                {completedTodayTasks.length}/{todayTasks.length}
              </span>
              <button className="p-1 hover:bg-white/10 rounded-full transition-colors duration-200">
                <Info size={16} className="text-light-text-secondary dark:text-dark-text-secondary" />
              </button>
            </div>
          </div>

          <div className="relative w-full aspect-square max-w-[200px] mx-auto">
            <svg
              className="w-full h-full -rotate-90 transform"
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                strokeWidth="8"
                className="stroke-light-border dark:stroke-dark-border transition-colors duration-200"
              />
              
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                className="stroke-accent-green transition-all duration-1000"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeDashoffset,
                }}
              />

              {/* Center text */}
              <text
                x="50"
                y="50"
                className="text-2xl font-bold fill-light-text dark:fill-dark-text transition-colors duration-200"
                textAnchor="middle"
                dominantBaseline="middle"
                transform="rotate(90 50 50)"
              >
                {Math.round(progress)}%
              </text>
            </svg>

            {/* Task indicator */}
            {completedTodayTasks.length > 0 && (
              <div 
                className="absolute cursor-pointer transform transition-all duration-500 hover:scale-110"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${progress * 3.6}deg) translate(${radius + 20}px) rotate(-${progress * 3.6}deg)`,
                  marginLeft: '-12px',
                  marginTop: '-12px',
                }}
              >
                <div className="w-6 h-6 bg-white dark:bg-dark-surface rounded-full shadow-lg flex items-center justify-center transition-colors duration-200">
                  <Plus size={14} className="text-accent-green" />
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent-green animate-pulse"></div>
              <span className="text-sm">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-light-border dark:bg-dark-border"></div>
              <span className="text-sm">Done</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => dispatch(logout())}
        className="flex items-center gap-3 px-4 py-3 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-input dark:hover:bg-dark-input w-full text-sm transition-all duration-200 group"
      >
        <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-300" />
        <span className="group-hover:translate-x-1 transition-transform duration-200">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;