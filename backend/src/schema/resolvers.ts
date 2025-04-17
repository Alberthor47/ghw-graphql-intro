import Task from '../models/Task.js';

export const resolvers = {
  Query: {
    getTasks: async () => await Task.find(),
    getTask: async (_: unknown, { id }: { id: string }) => await Task.findById(id),
    getMockTask: async () => {
      return {
        id: '1',
        title: 'Mock Task',
        description: 'This is a mock task.',
        completed: false,
      };
    }
  },
  Mutation: {
    createTask: async (_: unknown, { title, description, completed }: { title: string; description: string; completed?: boolean }) => {
      const task = new Task({ title, description, completed });
      return await task.save();
    },
    updateTask: async (_: unknown, { id, title, description, completed }: { id: string; title?: string; description?: string; completed?: boolean }) => {
      return await Task.findByIdAndUpdate(id, { title, description, completed }, { new: true });
    },
    deleteTask: async (_: unknown, { id }: { id: string }) => {
      const result = await Task.findByIdAndDelete(id);
      return !!result;
    },
  },
};

export default resolvers;