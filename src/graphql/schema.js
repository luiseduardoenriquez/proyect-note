const graphql_tools = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');

const typeDefs = `

        type Query {
            oneNote(_id: ID):Nota
            allNotes: [Nota]
        }
 
        type Nota {
            _id: ID
            title: String
            description: String
        }

        type Mutation {
            createNota(input: NotaInput): Nota
            deleteNota(_id: ID): Nota
            uptadeNota(_id: ID, input: NotaInput): Nota
            
        }

        input NotaInput {
            title: String
            description: String
        }

`;


const schema = graphql_tools({
    typeDefs:typeDefs,
    resolvers:resolvers
})

module.exports = schema;