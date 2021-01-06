exports.types = `

    type User {
        _id: ID!
        email: String!    
        password: String
        events: [Event]
    }
`;

exports.inputs = `

    input UserInput {
        _id: ID
        email: String    
        password: String
    }

    input LoginInput {
        email: String!    
        password: String!
    }  
`;

exports.queries = `

    users: [User!]!
    user(userInput: UserInput): User!
`;

exports.mutations = `
    createUser(userInput: UserInput): User
`;





// module.exports = buildSchema(`

// type User {
//     _id: ID!
//     email: String!    
//     password: String
//     events: [Event]
// }

// type Event {
//     _id: ID!
//     title: String!    
//     creator: User!
//     description: String!
//     price: Float!
//     date: String!    
// }

// input UserInput {
//     _id: ID
//     email: String    
//     password: String
// }

// input LoginInput {
//     email: String!    
//     password: String!
// }

// input EventInput {
//     title: String!    
//     description: String!
//     price: Float!
//     date: String!    
// }

// type RootQuery {
//     events: [Event!]!
//     users: [User!]!
//     user(userInput: UserInput): User!
// }

// type rootMutation {
//     createUser(userInput: UserInput): User
//     createEvent(eventInput: EventInput): Event
// }

// schema {
//     query:RootQuery
//     mutation:rootMutation
// }
// `)