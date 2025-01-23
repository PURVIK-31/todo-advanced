import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { fetchUsers } from '../store/slices/usersSlice';
import { User } from '../types';
import { Users } from 'lucide-react';

interface UserSearchProps {
  onSelect: (user: User) => void;
  selectedUserId?: string;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSelect, selectedUserId }) => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state: RootState) => state.users);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedUser = users.find(user => user.id === selectedUserId);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-light-input dark:hover:bg-dark-input rounded-lg flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary"
      >
        <Users size={20} />
        {selectedUser ? (
          <div className="flex items-center gap-2">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-light-text dark:text-dark-text">{selectedUser.name}</span>
          </div>
        ) : (
          <span className="text-sm">Assign to</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-dark-surface rounded-lg shadow-lg z-50">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-light-input dark:bg-dark-input text-light-text dark:text-dark-text rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-green"
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-light-text-secondary dark:text-dark-text-secondary">Loading...</div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <button
                  key={user.id}
                  onClick={() => {
                    onSelect(user);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-2 hover:bg-light-input dark:hover:bg-dark-input text-left ${
                    selectedUserId === user.id ? 'bg-light-input dark:bg-dark-input' : ''
                  }`}
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <div className="text-sm text-light-text dark:text-dark-text">{user.name}</div>
                    <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{user.email}</div>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-light-text-secondary dark:text-dark-text-secondary">No users found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSearch;