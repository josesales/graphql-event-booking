const Event = require('../../models/event');
const User = require('../../models/user');
const dateUtil = require('../../utils/date.util');

module.exports = {

    //express-graphql calls a specific function on background whenever a request looks for it in the schema 
    events: async () => {
        try {

            const events = await Event.find().populate('creator');

            return events.map(event => {

                //converts date from in milliseconds from db to a string date
                const date = dateUtil.fromMilliToIsoString(event._doc.date);
                return { ...event._doc, date }
            });
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
                creator: '5ff593abcfd62c05a818c74c',
            });

            const eventDB = await event.save();
            const user = await User.findById(eventDB.creator);

            //the parser happens on the backend, before we give the return value to the frontend graphql does the data parsing
            //and sends only the data requested by the frontend
            return { ...eventDB._doc, creator: user, date: dateUtil.fromMilliToIsoString(eventDB._doc.date) };
        } catch (error) {
            console.log('Error while trying to create event: ' + error);
        }
    },
}