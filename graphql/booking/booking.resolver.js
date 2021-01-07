const Booking = require('../../models/booking');
const Event = require('../../models/event');
const User = require('../../models/user');
const dateUtil = require('../../utils/date.util');



module.exports = {

    bookings: async (props, req) => {
        try {
            //TODO instead of use populate return the event and user with separated functions {event: getEvent.bind(this, eventId)...}
            //So instead of always search in the db to fetch the relation models 
            //It calls the function(which search in the db) only when the front request

            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const bookings = await Booking.find().populate('event').populate('user');

            return bookings.map(booking => {
                console.log(booking);
                return {
                    ...booking._doc,
                    createdAt: dateUtil.fromMilliToIsoString(booking.createdAt),
                    updatedAt: dateUtil.fromMilliToIsoString(booking.updatedAt),
                }
            });

        } catch (error) {
            throw new Error('Error while trying to fetch bookings: ' + error);
        }
    },

    bookEvent: async (props, req) => {
        try {

            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const event = await Event.findById(props.eventId).populate('creator');
            console.log("Event: " + event)

            if (!event) {
                throw new Error('Event does not exist');
            }

            const booking = new Booking({
                event: props.eventId,
                user: req.userId,
            });

            const bookingDB = await booking.save();
            console.log(bookingDB)

            return {
                _id: bookingDB._id,
                event,
                user: event.creator,
                createdAt: dateUtil.fromMilliToIsoString(booking.createdAt),
                updatedAt: dateUtil.fromMilliToIsoString(booking.updatedAt),
            };
        } catch (error) {
            throw new Error('Error while trying to book an event: ' + error);
        }
    },

    cancelBooking: async (props, req) => {
        try {

            if (!req.isAuth) {
                throw new Error('Unauthenticated');
            }

            const booking = await Booking.findById(props.bookingId).populate('event');

            if (!booking) {
                throw new Error('Booking does not exist');
            }

            const user = await User.findById(booking.user._id);
            const event = { ...booking.event._doc, creator: user._doc }

            await Booking.deleteOne({ _id: props.bookingId })

            return event;

        } catch (error) {
            throw new Error('Error while trying to cancel booking: ' + error);
        }
    }
}