exports.types = `#graphql

    type User {
        _id: ID!
        email: String!    
        password: String
        events: [Event]
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }
`;

exports.inputs = `#graphql

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

exports.queries = `#graphql

    users: [User!]!
    user(userInput: UserInput): User!
    login(loginInput: LoginInput): AuthData!
`;

exports.mutations = `#graphql

    createUser(userInput: UserInput): User
`;