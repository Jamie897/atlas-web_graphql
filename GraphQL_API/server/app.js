const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://benharper:oJ3MbPOxvun1ORbw@cluster0.p3ph1z6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

mongoose.connection.once('open', () => {
  console.log('connected to Mongo DB database');
});

app.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(3000,()=>{
  console.log('now listening for request on port 3000');
});