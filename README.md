# Advanced Todo Application

A modern, feature-rich todo application built with React, Redux, and TypeScript. The application offers a beautiful, responsive interface with dark mode support and advanced task management features.

![Todo App Light Mode](https://i.ibb.co/Sw85Qj1/Arc-j-TKOZPUElb.png)

## Features

### 1. Authentication

- Secure email/password authentication
- Persistent login state
- User profile with avatar support

### 2. Task Management

- Create, read, update, and delete tasks
- Task prioritization (low, medium, high)
- Due date assignment
- Task steps/subtasks
- Task reminders
- Recurring tasks (daily, weekly, monthly)
- Star important tasks
- Task assignment to team members
- Task completion tracking

### 3. Organization

- Filter tasks by:
  - All tasks
  - Today's tasks
  - Important tasks
  - Planned tasks
  - Assigned tasks
- Progress tracking with visual indicators
- Task grouping and categorization

### 4. User Interface

- Clean, modern design
- Responsive layout for all devices
- Dark mode support
- Smooth animations and transitions
- Interactive progress charts
- Intuitive task input interface

## Screenshots

### Dark Mode

![Dark Mode](https://i.ibb.co/cYvJ1YV/Arc-Xd7eg-Oohd-R.png)

## Technical Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Routing**: React Router DOM

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout component
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── TaskInput.tsx   # Task creation form
│   ├── TaskList.tsx    # Task display and management
│   └── UserSearch.tsx  # User assignment component
├── pages/              # Route pages
│   ├── Login.tsx       # Authentication page
│   └── Tasks.tsx       # Main tasks page
├── store/              # Redux store setup
│   ├── index.ts        # Store configuration
│   └── slices/         # Redux slices
│       ├── authSlice.ts    # Authentication state
│       ├── tasksSlice.ts   # Tasks management
│       └── usersSlice.ts   # Users management
└── types/              # TypeScript type definitions
    └── index.ts        # Shared types
```

## Features in Detail

### Task Creation

- Title input with immediate feedback
- Due date selection with calendar
- Reminder setting with date and time
- Steps/subtasks with add/remove functionality
- Recurring task options
- Task assignment to team members

### Task Organization

- Grid layout for optimal visibility
- Separate sections for active and completed tasks
- Visual indicators for task priority and status
- Quick actions for task management
- Responsive design for all screen sizes

### Progress Tracking

- Circular progress indicator
- Daily task completion statistics
- Visual feedback for completed tasks
- Interactive progress animations

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Building for Production

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
