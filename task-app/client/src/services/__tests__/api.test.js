import axios from 'axios';
import { taskAPI } from '../api';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

describe('taskAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    test('throws error when task data is missing', () => {
      expect(() => taskAPI.createTask()).toThrow('Task title is required');
      expect(() => taskAPI.createTask({})).toThrow('Task title is required');
      expect(() => taskAPI.createTask({ title: '' })).toThrow('Task title is required');
      expect(() => taskAPI.createTask({ title: '   ' })).toThrow('Task title is required');
    });

    test('trims title and description', () => {
      const mockPost = jest.fn().mockResolvedValue({ data: {} });
      mockedAxios.create.mockReturnValue({ post: mockPost });

      const taskData = {
        title: '  Test Task  ',
        description: '  Test Description  '
      };

      taskAPI.createTask(taskData);

      expect(mockPost).toHaveBeenCalledWith('/tasks', {
        title: 'Test Task',
        description: 'Test Description'
      });
    });

    test('handles null description', () => {
      const mockPost = jest.fn().mockResolvedValue({ data: {} });
      mockedAxios.create.mockReturnValue({ post: mockPost });

      taskAPI.createTask({ title: 'Test Task' });

      expect(mockPost).toHaveBeenCalledWith('/tasks', {
        title: 'Test Task',
        description: null
      });
    });
  });

  describe('updateTask', () => {
    test('throws error when id is missing', () => {
      expect(() => taskAPI.updateTask()).toThrow('Task ID is required');
      expect(() => taskAPI.updateTask(null, {})).toThrow('Task ID is required');
    });

    test('throws error when task data is missing', () => {
      expect(() => taskAPI.updateTask(1)).toThrow('Task data is required');
    });

    test('cleans and validates data', () => {
      const mockPut = jest.fn().mockResolvedValue({ data: {} });
      mockedAxios.create.mockReturnValue({ put: mockPut });

      const updateData = {
        title: '  Updated Task  ',
        description: '  Updated Description  ',
        completed: 'true'  // Should be converted to boolean
      };

      taskAPI.updateTask(1, updateData);

      expect(mockPut).toHaveBeenCalledWith('/tasks/1', {
        title: 'Updated Task',
        description: 'Updated Description',
        completed: true
      });
    });
  });

  describe('deleteTask', () => {
    test('throws error when id is missing', () => {
      expect(() => taskAPI.deleteTask()).toThrow('Task ID is required');
      expect(() => taskAPI.deleteTask(null)).toThrow('Task ID is required');
    });
  });

  describe('getTask', () => {
    test('throws error when id is missing', () => {
      expect(() => taskAPI.getTask()).toThrow('Task ID is required');
      expect(() => taskAPI.getTask(null)).toThrow('Task ID is required');
    });
  });
});