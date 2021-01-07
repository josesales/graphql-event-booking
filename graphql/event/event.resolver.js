const Event = require('../../models/event');
const User = require('../../models/user');
const dateUtil = require('../../utils/date.util');

const transformEvent = event => {
    return { ...event._doc, date: dateUtil.fromMilliToIsoString(event._doc.date) };
}

module.exports = {

    //express-graphql calls a specific function on background whenever a request looks for it in the schema 
    events: async () => {
        try {

            const events = await Event.find().populate('creator');

            return events.map(event => {

                return transformEvent(event);
            });
        } catch (error) {
            throw new Error('Error while trying to fetch events: ' + error);
        }
    },

    createEvent: async (props, req) => {
        try {

            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }

            props.eventInput.price = +props.eventInput.price; //convert price to a number
            props.eventInput.date = new Date(props.eventInput.date); //convert string to a real Date Object

            const event = new Event({
                ...props.eventInput,
                creator: req.userId,
            });

            const eventDB = await event.save();
            const user = await User.findById(eventDB.creator);

            eventDB.creator = user;

            //the parser happens on the backend, before we give the return value to the frontend graphql does the data parsing
            //and sends only the data requested by the frontend
            return transformEvent(eventDB);
        } catch (error) {
            throw new Error('Error while trying to create event: ' + error);
        }
    },
}