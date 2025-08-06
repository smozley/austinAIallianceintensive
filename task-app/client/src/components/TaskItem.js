import React, { useState } from 'react';

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await onTaskUpdated(task.id, { completed: !task.completed });
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      try {
        await onTaskDeleted(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.title}
        </h3>
        <div className="task-actions">
          <button
            onClick={handleToggleComplete}
            className={`btn ${task.completed ? 'btn-secondary' : 'btn-success'}`}
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : task.completed ? 'Undo' : 'Complete'}
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span>Created: {formatDate(task.created_at)}</span>
        {task.updated_at !== task.created_at && (
          <span> • Updated: {formatDate(task.updated_at)}</span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;