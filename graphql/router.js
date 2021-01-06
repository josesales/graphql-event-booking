const { graphqlHTTP } = require('express-graphql');

const rootSchema = require('./rootSchema');
const rootResolver = require('./rootResolver');

module.exports = graphqlRouter = (app) => {

    app.use('/graphql', graphqlHTTP({ //setup schema and resolvers configuration 

        //take the schema definition as a string and convert to javascript objects in order to follow the requested query to its resolver
        schema: rootSchema,

        //object that contains all the resolvers that need to match with the schema
        rootValue: rootResolver,

        //gives a graphql client interface if you enter the graphql endpoint in the browser
        graphiql: true,
    },

    ));

    app.get('/', (req, res, next) => {
        res.send('MERN with GraphQL App');
    });
}
