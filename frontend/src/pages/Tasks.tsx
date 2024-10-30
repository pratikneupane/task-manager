/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, searchTasks, deleteTask } from '../utils/api';
import { Task } from '../types';
import { TaskSidebar } from '../components/TaskSidebar';
import { TaskTable } from '../components/TaskTable';
import { Pagination } from '../components/Pagination';
import debounce from 'lodash/debounce';

export const Tasks = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['tasks', page, searchTerm],
    queryFn: () => (searchTerm ? searchTasks(searchTerm) : getTasks(page)),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const debouncedSearch = useCallback(
    debounce((term: string) => setSearchTerm(term), 500),
    []
  );


  const handleEdit = (task: Task) => {
    console.log("handleEdit", task);
    setSelectedTask(task);
    setIsOpen(true);
  };

  return (
    <div className="relative">
      <div className="mb-4 grid grid-cols-6 gap-4">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => debouncedSearch(e.target.value)}
          className="px-4 py-2 border border-blue-200 rounded-lg col-span-5 dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={() => {
            setSelectedTask(null);
            setIsOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Task
        </button>
      </div>

      <TaskTable data={data?.response} onEdit={handleEdit} onDelete={deleteMutation.mutate} />

      {data && data.count > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          totalItems={data.count}
          itemsPerPage={10}
        />
      )}

      <TaskSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        task={selectedTask}
      />
    </div>
  );
};
