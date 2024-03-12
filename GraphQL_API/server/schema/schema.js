const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const Project = require('../models/project');
const Task = require('../models/task');


const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({ // Using a function to avoid circular dependencies
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        // Define the project field with relation to the ProjectType
        project: {
            type: ProjectType,
            resolve: (parent, args) => {
                // Use the Project model to find the project with the id
                return Project.findById(parent.projectId);
            }
        }
    })
});

// Define the project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({ // Using a function to avoid circular dependencies
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        // Define the tasks field with relation to the TaskType
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: (parent, args) => {
                // Use the Task model to find all tasks associated with this project
                return Task.find({ projectId: parent.id });
            }
        }
    })
});

// Define the root query with the task and project fields
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                // Use the Task model to find a single task by ID
                return Task.findById(args.id);
            }
        },
        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                // Use the Project model to find a single project by ID
                return Project.findById(args.id);
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: (parent, args) => {
                // Use the Task model to find all tasks
                return Task.find({});
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: (parent, args) => {
                // Use the Project model to find all projects
                return Project.find({});
            }
        }
    }
});

// Define the mutation to add a task and project
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                projectId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                // Create a new task with the args
                let task = new Task({
                    title: args.title,
                    weight: args.weight,
                    description: args.description,
                    projectId: args.projectId
                });
                // Save the task in the database
                return task.save();
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args) => {
                // Create a new project with the args
                let project = new Project({
                    title: args.title,
                    weight: args.weight,
                    description: args.description
                });
                // Save the project in the database
                return project.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});