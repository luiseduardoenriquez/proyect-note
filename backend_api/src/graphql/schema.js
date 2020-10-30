const graphql_tools = require('graphql-tools').makeExecutableSchema;
const resolvers = require('./resolvers');

const typeDefs = `

        type Query {
            oneNote(_id: ID):Nota
            oneUser(_id: ID):Usuario
            Macht(correo: String, contra: String):Usuario

            SimilaryEmail(correo: String):Usuario

            allNotes: [Nota]
            allUsuarios: [Usuario]
        }
        
        type Mutation {
            createNota(input: NotaInput): Nota
            createUser(input: UsuarioInput): Usuario

            deleteNota(_id: ID): Nota
            uptadeNota(_id: ID, input: NotaInput): Nota
            
        }

        type Usuario{
            _id: ID
            name: String
            email: String
            password: String
        }
 
        type Nota {
            _id: ID
            title: String
            description: String
        }
        

        input NotaInput {
            title: String!
            description: String!
        }

        input UsuarioInput {
            name: String!
            email: String!
            password: String!
        }

`;

const schema = graphql_tools({
    typeDefs:typeDefs,
    resolvers:resolvers
})

module.exports = schema;