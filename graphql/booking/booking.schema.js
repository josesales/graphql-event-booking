exports.types = `#graphql

    type Booking {
        _id: ID!
       event: Event!
       user: User!
       createdAt: String!
       updatedAt: String!
    }
`;

exports.inputs = `

`;

exports.queries = `#graphql

    bookings: [Booking!]!
`;

exports.mutations = `#graphql

    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
`;