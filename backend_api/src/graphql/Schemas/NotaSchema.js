const typeDefs = `

        type Query {
            oneNote(_id: ID):Nota
            allNotes: [Nota]
            
        }
        
        type Mutation {
            createNota(input: NotaInput): Nota
            deleteNota(_id: ID): Nota
            uptadeNota(_id: ID, input: NotaInput): Nota
            
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


`;

module.exports = typeDefs;