import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/slices/tasksSlice';
import { RootState } from '../store';
import { Bell, Calendar, Star, Plus, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import UserSearch from './UserSearch';
import { User } from '../types';

const TaskInput: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminder, setReminder] = useState<string>('');
  const [repeat, setRepeat] = useState<'daily' | 'weekly' | 'monthly' | ''>('');
  const [steps, setSteps] = useState<string[]>([]);
  const [newStep, setNewStep] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !user) return;

    dispatch(addTask({
      title: title.trim(),
      completed: false,
      priority: 'medium',
      dueDate: dueDate || undefined,
      userId: user.id,
      reminder,
      repeat,
      steps
    }));

    // Reset form
    setTitle('');
    setDueDate('');
    setReminder('');
    setRepeat('');
    setSteps([]);
    setNewStep('');
  };

  const handleAddStep = () => {
    if (newStep.trim()) {
      setSteps([...steps, newStep.trim()]);
      setNewStep('');
    }
  };

  const handleStepKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddStep();
    }
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-white dark:bg-dark-surface rounded-lg shadow-sm overflow-hidden">
        <div className="p-4">
          <h2 className="text-light-text-secondary dark:text-dark-text-secondary mb-4">Add A Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What needs to be done?"
              className="w-full bg-transparent border-none text-light-text dark:text-dark-text placeholder-light-text-secondary dark:placeholder-dark-text-secondary focus:outline-none text-sm"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-light-border dark:border-dark-border">
              {/* Due Date Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                  <Calendar size={18} />
                  <span className="text-sm font-medium">Due Date</span>
                </div>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text rounded-lg p-2 text-sm border border-light-border dark:border-dark-border focus:outline-none focus:ring-1 focus:ring-accent-green"
                />
              </div>

              {/* Reminder Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                  <Bell size={18} />
                  <span className="text-sm font-medium">Reminder</span>
                </div>
                <input
                  type="datetime-local"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="w-full bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text rounded-lg p-2 text-sm border border-light-border dark:border-dark-border focus:outline-none focus:ring-1 focus:ring-accent-green"
                />
              </div>

              {/* Steps Section */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                  <Plus size={18} />
                  <span className="text-sm font-medium">Steps</span>
                </div>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={step}
                        readOnly
                        className="flex-1 bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text rounded-lg px-3 py-1.5 text-sm border border-light-border dark:border-dark-border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveStep(index)}
                        className="p-1.5 hover:bg-light-input dark:hover:bg-dark-input rounded-lg text-light-text-secondary dark:text-dark-text-secondary"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newStep}
                      onChange={(e) => setNewStep(e.target.value)}
                      onKeyPress={handleStepKeyPress}
                      placeholder="Add a step..."
                      className="flex-1 bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text rounded-lg px-3 py-1.5 text-sm border border-light-border dark:border-dark-border focus:outline-none focus:ring-1 focus:ring-accent-green"
                    />
                    <button
                      type="button"
                      onClick={handleAddStep}
                      disabled={!newStep.trim()}
                      className="p-1.5 hover:bg-light-input dark:hover:bg-dark-input rounded-lg text-light-text-secondary dark:text-dark-text-secondary disabled:opacity-50"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Repeat Section */}
              <div className="space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                  <RotateCcw size={18} />
                  <span className="text-sm font-medium">Repeat</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRepeat(repeat === option ? '' : option)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        repeat === option
                          ? 'bg-accent-green text-white'
                          : 'bg-light-input dark:bg-dark-input text-light-text-secondary dark:text-dark-text-secondary hover:bg-accent-green/10'
                      }`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-light-border dark:border-dark-border">
              <button
                type="submit"
                disabled={!title.trim()}
                className="px-4 py-1.5 bg-accent-green text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ADD TASK
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;