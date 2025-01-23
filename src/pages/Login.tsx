import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import { RootState } from '../store';
import { ListTodo } from 'lucide-react';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('demo123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
      <div className="bg-white dark:bg-dark-surface p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-8">
          <ListTodo size={40} className="text-accent-green" />
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-6 text-light-text dark:text-dark-text">
          Welcome to Todo App
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-dark-text">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-light-border dark:border-dark-border bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text shadow-sm focus:border-accent-green focus:ring focus:ring-accent-green/20"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-light-text dark:text-dark-text">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-light-border dark:border-dark-border bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text shadow-sm focus:border-accent-green focus:ring focus:ring-accent-green/20"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent-green text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-sm text-center text-light-text-secondary dark:text-dark-text-secondary">
            Use demo@example.com / demo123 to sign in
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;