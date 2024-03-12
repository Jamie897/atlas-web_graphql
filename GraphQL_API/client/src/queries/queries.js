// Import gql from apollo-boost
import { gql } from 'apollo-boost';

// Define the queries
const getTasksQuery = gql`
  {
    tasks {
      id
      title
    }
  }
`;

// Export the queries
export { getTasksQuery };
