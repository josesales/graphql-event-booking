exports.types = `

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

exports.queries = `

    bookings: [Booking!]!
`;

exports.mutations = `

    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
`;