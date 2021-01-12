import React from 'react';
import './booking-item.styles.css';

const BookingItem = ({ booking, cancelBooking }) => {

    let eventDateTime = new Date(+booking.event.date);
    eventDateTime = eventDateTime.toLocaleDateString() + ' ' + eventDateTime.toLocaleTimeString();

    return (
        <React.Fragment>

            <li className="bookings__list-item" key={booking._id} >

                <div className="bookings__item-data">
                    <h1>{booking.event.title}</h1>
                </div>

                <div className="bookings__item-data">
                    <h2>{eventDateTime}</h2>
                </div>

                <div className="bookings__item-data">
                    <h2>{booking.event.creator.email}</h2>
                </div>

                <div className="bookings__item-actions">
                    <button className="btn" onClick={cancelBooking.bind(this, booking._id)}>Cancel</button>
                </div>

            </li>
        </React.Fragment>
    );
}

export default BookingItem;