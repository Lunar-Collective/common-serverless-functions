const { gql } = require('apollo-server-lambda')

module.exports = gql`
  type Query {
    hello: String
    allAuthors: [Author!]
    author(id: Int!): Author
    authorByName(name: String!): Author
  }
  type Mutation {
    addBook(title: String, author: String): Boolean
  }
  type Author {
    id: ID!
    name: String!
    married: Boolean!
  }
`