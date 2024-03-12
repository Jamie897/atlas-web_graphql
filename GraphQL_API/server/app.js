const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema'); // Import the schema from schema.js
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// connect MongoDB Atlas database
const mongoDBAtlasUri = 'mongodb+srv://JamieToman:Password@atlascluster.tqd66ql.mongodb.net/?retryWrites=true&w=majority';

app.use('/graphql', graphqlHTTP({
  schema, // Pass the imported schema here
  graphiql: true // Enable GraphiQL
}));

app.listen(4000, () => {
  console.log('now listening for request on port 4000');
});
