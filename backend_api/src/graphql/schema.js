const graphql_tools = require('graphql-tools').makeExecutableSchema;



// Aca se agregarian - Importarian todos los esquemas
const NotaSchema = require('./Schemas/NotaSchema');
const UsuarioSchema = require('./Schemas/UsuarioSchema');

// Aca se agregarian - Importarian todos los resolver
const NotaResolver = require('./Resolvers/NotaResolver');
const UsuarioResolver = require('./Resolvers/UsuarioResolver');




// Todos los ESQUEMAS - TypeDefs se agregan atravez de una coma en este array
const typeDefs = [NotaSchema, UsuarioSchema];

// Todos los RESOLVER se agregan atravez de una coma en este array
const resolvers = [NotaResolver, UsuarioResolver];



// Convertir 
const schema = graphql_tools({
    typeDefs:typeDefs,
    resolvers:resolvers
})

module.exports = schema;