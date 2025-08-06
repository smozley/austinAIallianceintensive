import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, onTaskUpdated, onTaskDeleted }) => {
  if (loading) {
    return (
      <div className="task-list">
        <h2>Your Tasks</h2>
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <h2>Your Tasks</h2>
        <div className="empty-state">
          <h3>No tasks yet!</h3>
          <p>Add your first task above to get started.</p>
        </div>
      </div>
    );
  }

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      
      {pendingTasks.length > 0 && (
        <div className="task-section">
          {pendingTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          {completedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;