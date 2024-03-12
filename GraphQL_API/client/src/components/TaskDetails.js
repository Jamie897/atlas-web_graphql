// Import gql from apollo-boost
import { gql } from 'apollo-boost';

// Define the query to fetch task details
const getTaskDetailQuery = gql`
  query GetTaskDetail($id: ID!) {
    task(id: $id) {
      id
      title
      weight
      description
      project {
        id
        title
        weight
        description
        tasks {
          id
          title
          weight
        }
      }
    }
  }
`;

// Export the query
export { getTaskDetailQuery };
