const { buildSchema } = require('graphql');
const eventSchema = require('./event/event.schema');
const userSchema = require('./user/user.schema');
const bookingSchema = require('./booking/booking.schema');

const types = [];
const inputs = [];
const queries = [];
const mutations = [];

//each new schema should be included in the schemas array
const schemas = [eventSchema, userSchema, bookingSchema];

//combine all types, inputs, queries and mutations from each schema object
schemas.forEach(schema => {

    types.push(schema.types);
    inputs.push(schema.inputs);
    queries.push(schema.queries);
    mutations.push(schema.mutations);
});

module.exports = buildSchema(`

    ${types.join('\n')}

    ${inputs.join('\n')}

    type RootQuery {
        ${queries.join('\n')}
    }

    type rootMutation {
        ${mutations.join('\n')}
    }

    schema {
        query:RootQuery
        mutation:rootMutation
    }
`)