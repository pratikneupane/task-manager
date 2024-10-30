import { Task } from '../types';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface TaskTableProps {
  data: Task[] | undefined;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export const TaskTable = ({ data, onEdit, onDelete }: TaskTableProps) => (
  <div className="overflow-x-auto rounded-lg shadow-lg mt-5">
    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg dark:text-white">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          <th className="px-6 py-4 border-b text-left font-semibold text-gray-700 dark:text-gray-300">
            Title
          </th>
          <th className="px-6 py-4 border-b text-left font-semibold text-gray-700 dark:text-gray-300">
            Description
          </th>
          <th className="px-6 py-4 border-b text-left font-semibold text-gray-700 dark:text-gray-300">
            Status
          </th>
          <th className="px-6 py-4 border-b text-left font-semibold text-gray-700 dark:text-gray-300">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((task) => (
          <tr
            key={task._id}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
          >
            <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              {task.title}
            </td>
            <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              {task.description}
            </td>
            <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  task.status === 'DONE'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {task.status}
              </span>
            </td>
            <td className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => onEdit(task)}
                className="text-blue-600 hover:text-blue-800 text-lg font-medium mr-3 transition duration-200"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(task._id!)}
                className="text-red-600 hover:text-red-800 text-lg font-medium transition duration-200"
              >
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
