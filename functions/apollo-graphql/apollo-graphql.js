const { ApolloServer } = require('apollo-server-lambda')
const typeDefs = require('./schema');
const resolvers = require('./resolvers/main');
const context = require('./context');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
})
