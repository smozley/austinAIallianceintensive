import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { taskAPI } from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await taskAPI.getAllTasks();
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks. Please check if the server is running.');
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = async (taskData) => {
    const response = await taskAPI.createTask(taskData);
    setTasks(prev => [response.data, ...prev]);
    setSuccess('Task added successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleTaskUpdated = async (taskId, updateData) => {
    const response = await taskAPI.updateTask(taskId, updateData);
    setTasks(prev => prev.map(task => 
      task.id === taskId ? response.data : task
    ));
    setSuccess('Task updated successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleTaskDeleted = async (taskId) => {
    await taskAPI.deleteTask(taskId);
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setSuccess('Task deleted successfully!');
    setTimeout(() => setSuccess(''), 3000);
  };

  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>Task Manager</h1>
          <p>Stay organized and get things done!</p>
          {totalCount > 0 && (
            <p>
              {completedCount} of {totalCount} tasks completed
              {completedCount > 0 && ` (${Math.round((completedCount / totalCount) * 100)}%)`}
            </p>
          )}
        </header>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <TaskForm onTaskAdded={handleTaskAdded} />
        
        <TaskList
          tasks={tasks}
          loading={loading}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>
    </div>
  );
}

export default App;