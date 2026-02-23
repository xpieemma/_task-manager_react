// src/components/TaskList/TaskList.tsx
import type { TaskListProps } from '../../types';
import TaskItem from '../TaskItem/TaskItem';

export function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        // We use the 'key' here so React can keep track of which <li> is which
        <li key={task.id}>
          {/* We pass the props down one more level to the Item */}
          <TaskItem 
            task={task} 
            onStatusChange={onStatusChange} 
            onDelete={onDelete} 
          />
        </li>
      ))}
    </ul>
  );
}