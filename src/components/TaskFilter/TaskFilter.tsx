import { useState } from "react";
import type { TaskFilterProps, TaskStatus } from "../../types";

// Define a local type for priority to keep the code clean
type Priority = 'low' | 'medium' | 'high';

export function TaskFilter({ onFilterChange }: TaskFilterProps) {
  const [filters, setFilters] = useState<{
    status: TaskStatus | undefined;
    priority: Priority | undefined;
  }>({
    status: undefined,
    priority: undefined
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Cast the string value to our TaskStatus union or undefined
    const val = e.target.value === "all" ? undefined : (e.target.value as TaskStatus);
    
    const newFilters = { ...filters, status: val };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Cast the string value to our Priority union or undefined
    const val = e.target.value === "all" ? undefined : (e.target.value as Priority);
    
    const newFilters = { ...filters, priority: val };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-container">
      <select value={filters.status ?? "all"} onChange={handleStatusChange}>
        <option value="all">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select value={filters.priority ?? "all"} onChange={handlePriorityChange}>
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}