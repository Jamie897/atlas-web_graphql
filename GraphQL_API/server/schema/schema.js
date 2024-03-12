// Import necessary modules from the graphql package
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// Define a new GraphQLObjectType for Task
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  })
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery
});

// Define RootQueryType
const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      task: {
        type: TaskType,
        args: {
          id: { type: GraphQLString } 
        },
        resolve(parent, args) {
          // Resolve function to fetch data from the database
          // Here, you would typically write code to query the database for the task with the provided ID
          // For now, let's return a hardcoded task
          return { id: args.id, title: "Sample Task", weight: 1, description: "This is a sample task" };
        }
      }
    }
  });
  
  // Export the schema with RootQuery
  module.exports = new GraphQLSchema({
    query: RootQueryType
  });