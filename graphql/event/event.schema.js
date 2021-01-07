exports.types = `#graphql

    type Event {
        _id: ID!
        title: String!    
        creator: User!
        description: String!
        price: Float!
        date: String!    
    }
`;

exports.inputs = `#graphql

    input EventInput {
        title: String!    
        description: String!
        price: Float!
        date: String!    
}
`;

exports.queries = `#graphql

    events: [Event!]!
`;

exports.mutations = `#graphql

    createEvent(eventInput: EventInput): Event
`;