const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlRouter = require('./graphql/router');


if (process.env.NODE_ENV != 'production') require('dotenv').config();
const dbUri = process.env.DB_URI;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

graphqlRouter(app);

mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    app.listen(port, () => {
        console.log('Listening on Port ' + port)
    });
}).catch(error => {
    console.log('Error while connecting to the db: ' + error);
});


//Users
// mutation {
//     createUser(userInput: {email:"sales@sales.com", password: "1234"}) {
//     	_id
//    		email
//     	password
//     }
//   } 

// query {
//     users {
//         _id
//         email
//         password
//         events {
//             _id
//             title
//           }
//     }
// }

// query {
//     user(userInput: {email:"sales@sales.com"}) {
//       _id
//       email
//       password
//       events {
//         _id
//         title
//       }
//     }
//   }

// Events
// query {
//     events {
//       _id
//       title
//       creator{
//         _id
//         email
//       }
//       description
//       price
//       date
//     }
//   }

//   mutation {
//     createEvent(eventInput: {title:"Test", description: "kkk", price: 25.90, date: "2021-01-05T19:39:36.099Z"}) {
//     _id
//     title
//     description
//     price
//     date
//     }
//   } 

//Booking

// query {
//     bookings {
//     _id
//     user{
//       _id
//       email
//     }
//     event{
//       _id
//         title
//     }
//     createdAt
//     updatedAt
//   }
//     }
//   }

// mutation{
//     bookEvent(eventId: "5ff5d0060664d35098a090ae") {
    //   _id
    //   user{
    //     _id
    //     email
    //   }
    //   event{
    //     _id
    //       title
    //   }
    //   createdAt
    //   updatedAt
    // }
//   }

// mutation {
//     cancelBooking(bookingId: "5ff62b3f34c5d912404a3482"){
//       title
//       creator {
//         email
//       }
//     }
//   }