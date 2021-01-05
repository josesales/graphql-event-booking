const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

if (process.env.NODE_ENV != 'production') require('dotenv').config();
const dbUri = process.env.DB_URI;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({ //setup schema and resolvers configuration 

    //take the schema definition as a string and convert to javascript objects in order to follow the requested query to its resolver
    schema: buildSchema(`

            type Event {
                _id: ID!
                title: String!    
                description: String!
                price: Float!
                date: String!    
            }

            input EventInput {
                title: String!    
                description: String!
                price: Float!
                date: String!    
            }

            type RootQuery {
                events: [Event!]!
            }
            type rootMutation {
                createEvent(eventInput: EventInput): Event
            }

            schema {
                query:RootQuery
                mutation:rootMutation
            }
    `),

    //object that contains all the resolvers that need to match with the schema
    rootValue: {
        //express-graphql calls a specific function on background whenever a request looks for it in the schema 
        events: async () => {
            try {

                const events = await Event.find();

                return events.map(event => event._doc);
            } catch (error) {
                console.log('Error while trying to fetch events: ' + error);
            }
        },
        createEvent: async props => {
            try {
                props.eventInput.price = +props.eventInput.price; //convert price to a number
                props.eventInput.date = new Date(props.eventInput.date); //convert string to a real Date Object

                const event = new Event({
                    ...props.eventInput,
                });

                const eventDB = await event.save();

                //the parser happens on the backend, before we give the return value to the frontend graphql does the data parsing
                //and sends only the data requested by the frontend
                return { ...eventDB._doc };
            } catch (error) {
                console.log('Error while trying to create event: ' + error);
            }
        }
    },

    graphiql: true, //gives a graphql client interface if you enter the graphql endpoint in the browser
}));

app.get('/', (req, res, next) => {
    res.send('MERN with GraphQL App');
});

mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    app.listen(port);
}).catch(error => {
    console.log('Error while connecting to the db: ' + error);
})



// query {
//     events {
    //   _id
    //   title
    //   description
    //   price
    //   date
//     }
//   }

//   mutation {
//     createEvent(eventInput: {title:"Test", description: "kkk", price: 25.90, date: "2021-01-05T19:39:36.099Z"}) {
    // _id
    // title
    // description
    // price
    // date
//     }
//   } 