const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema'); // Import the schema from schema.js

const app = express();

app.use('/graphql', graphqlHTTP({
  schema, // Pass the imported schema here
  graphiql: true // Enable GraphiQL
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
