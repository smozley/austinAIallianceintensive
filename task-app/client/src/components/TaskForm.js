import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await onTaskAdded(formData);
      setFormData({ title: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onTaskAdded]);

  return (
    <div className="task-form">
      <h2>Add New Task</h2>
      {error && <div className="error" role="alert">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            disabled={isSubmitting}
            required
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description (optional)..."
            disabled={isSubmitting}
            maxLength={1000}
            rows={3}
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting || !formData.title.trim()}
        >
          {isSubmitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  onTaskAdded: PropTypes.func.isRequired,
};

export default React.memo(TaskForm);