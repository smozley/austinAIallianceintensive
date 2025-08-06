import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import TaskForm from '../TaskForm';

describe('TaskForm', () => {
  const mockOnTaskAdded = jest.fn();

  beforeEach(() => {
    mockOnTaskAdded.mockClear();
  });

  test('renders form elements correctly', () => {
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    
    expect(screen.getByText('Add New Task')).toBeInTheDocument();
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('shows error when title is empty', async () => {
    const user = userEvent.setup();
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    
    const submitButton = screen.getByRole('button', { name: /add task/i });
    await user.click(submitButton);
    
    expect(screen.getByText('Title is required')).toBeInTheDocument();
    expect(mockOnTaskAdded).not.toHaveBeenCalled();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockOnTaskAdded.mockResolvedValue();
    
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    
    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });
    
    await user.type(titleInput, 'Test Task');
    await user.type(descriptionInput, 'Test Description');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnTaskAdded).toHaveBeenCalledWith({
        title: 'Test Task',
        description: 'Test Description'
      });
    });
  });

  test('clears form after successful submission', async () => {
    const user = userEvent.setup();
    mockOnTaskAdded.mockResolvedValue();
    
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    
    const titleInput = screen.getByLabelText(/task title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });
    
    await user.type(titleInput, 'Test Task');
    await user.type(descriptionInput, 'Test Description');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(titleInput).toHaveValue('');
      expect(descriptionInput).toHaveValue('');
    });
  });

  test('shows loading state during submission', async () => {
    const user = userEvent.setup();
    const mockPromise = new Promise(resolve => setTimeout(resolve, 100));
    mockOnTaskAdded.mockReturnValue(mockPromise);
    
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    
    const titleInput = screen.getByLabelText(/task title/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });
    
    await user.type(titleInput, 'Test Task');
    await user.click(submitButton);
    
    expect(screen.getByText('Adding...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    
    await waitFor(() => {
      expect(screen.getByText('Add Task')).toBeInTheDocument();
    });
  });

  test('displays error message on submission failure', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Failed to create task';
    mockOnTaskAdded.mockRejectedValue({
      response: { data: { error: errorMessage } }
    });
    
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />);
    
    const titleInput = screen.getByLabelText(/task title/i);
    const submitButton = screen.getByRole('button', { name: /add task/i });
    
    await user.type(titleInput, 'Test Task');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});