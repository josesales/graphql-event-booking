const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlRouter = require('./graphql/router');
const auth = require('./middleware/auth');
const allowClientRequests = require('./middleware/allowClientRequests');


if (process.env.NODE_ENV != 'production') require('dotenv').config(); //load the variables in the .env file into the process.env
const dbUri = process.env.DB_URI;

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(allowClientRequests);
app.use(auth);

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

