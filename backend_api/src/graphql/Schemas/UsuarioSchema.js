const typeDefs = `

        extend type Query {
            
            oneUser(_id: ID):Usuario
            Macht(correo: String, contra: String):Usuario
            SimilaryEmail(correo: String):Usuario
            allUsuarios: [Usuario]
        }
        
        extend type Mutation {
            
            createUser(input: UsuarioInput): Usuario
            deleteUser(_id: ID): Usuario
            uptadeUser(_id: ID, input: UsuarioInput): Usuario
            
        }

        type Usuario{
            _id: ID
            name: String
            email: String
            password: String
            rol: String
        }
        
        input UsuarioInput {
            name: String!
            email: String!
            password: String
            rol: String
        }


`;

module.exports = typeDefs;