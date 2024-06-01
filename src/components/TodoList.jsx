import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const Todo = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: uuidv4(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'name') {
      return a.text.localeCompare(b.text);
    } else if (sort === 'status') {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    }
    return 0;
  });

  return (
    <div className="container max-w-lg p-4 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">To-Do List</h1>
      <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-2 mr-2 border rounded-md"
            placeholder="Enter a new task"
          />
          <button
            onClick={addTask}
            className="flex items-center p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            <FaPlus className="mr-1" />
            Add
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md  ${filter === 'all' ?  'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded-md ${filter === 'active' ?  'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Completed
            </button>
          </div>
          <div className="flex space-x-4">
            <select
              onChange={(e) => setSort(e.target.value)}
              className="p-2 border rounded-md "
              value={sort}
            >
              <option value="">Sort By</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>
        <ul className="space-y-2">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-2 border rounded-md ${task.completed ? 'bg-slate-100' : 'bg-green-100'} shadow-sm`}
            >
              <span
                className={`flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                {task.text}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleCompletion(task.id)}
                  className="flex items-center p-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  <FaCheck className="mr-1" />
                  Complete
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;