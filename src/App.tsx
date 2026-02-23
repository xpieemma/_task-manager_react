import { useState } from 'react';
import { TaskFilter } from './components/TaskFilter/TaskFilter';
import { ogTasks } from './data';
import type { Task, TaskStatus } from './types';
import { TaskList } from './components/TaskList/TaskList';
import './App.css'


function App() {
  // 1. The Master Task List
  const [tasks, setTasks] = useState<Task[]>(ogTasks);
  
  // 2. The Filter States
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'low' | 'medium' | 'high' | 'all'>('all');

  // Logic: Change task status
  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  // Logic: Delete a task
  const handleDelete = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Logic: Filter the list before rendering
  const filteredTasks = tasks.filter(task => {
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="app-container">
      <h1>Party On, Wayne!</h1>
      <TaskFilter 
        onFilterChange={(filters) => {
            if (filters.status) setStatusFilter(filters.status || 'all');
            if (filters.priority) setPriorityFilter(filters.priority || 'all');
        }} 
      />
      <TaskList 
        tasks={filteredTasks} 
        onStatusChange={handleStatusChange} 
        onDelete={handleDelete} 
      />
    </div>
  );
}

export default App;