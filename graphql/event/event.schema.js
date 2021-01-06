exports.types = `

    type Event {
        _id: ID!
        title: String!    
        creator: User!
        description: String!
        price: Float!
        date: String!    
    }
`;

exports.inputs = `

    input EventInput {
        title: String!    
        description: String!
        price: Float!
        date: String!    
}
`;

exports.queries = `

    events: [Event!]!
`;

exports.mutations = `
    createEvent(eventInput: EventInput): Event
`;