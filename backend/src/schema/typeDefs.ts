export const typeDefs = `
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
  }

  type Query {
    getTasks: [Task]
    getTask(id: ID!): Task
    getMockTask: Task
  }

  type Mutation {
    createTask(title: String!, description: String!, completed: Boolean): Task
    updateTask(id: ID!, title: String, description: String, completed: Boolean): Task
    deleteTask(id: ID!): Boolean
  }
`;

export default typeDefs;