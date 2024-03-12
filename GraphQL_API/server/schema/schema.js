// Import necessary modules from the graphql package
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
const Project = require('./models/project'); // Import Project model
const Task = require('./models/task'); // Import Task model

// Define TaskType
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    project: { 
      type: ProjectType,
      resolve(parent, args) {
        // Resolve logic to fetch project data
      }
    }
  })
});

// Define ProjectType
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Resolve logic to fetch tasks data
      }
    }
  })
});

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addProject: {
      type: ProjectType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const { title, weight, description } = args;
        const project = new Project({
          title,
          weight,
          description
        });
        return project.save(); // Save the project instance to the database
      }
    },
    // Add other mutations as needed
  }
});

// Define RootQueryType
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // Resolve logic to fetch task data
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // Resolve logic to fetch project data
      }
    },
    tasks: {
      type: new GraphQLList(TaskType),
      resolve(parent, args) {
        // Resolve logic to fetch all tasks data
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // Resolve logic to fetch all projects data
      }
    }
  }
});

// Export the schema with RootQuery and Mutation
module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: MutationType // Include MutationType in the schema
});
