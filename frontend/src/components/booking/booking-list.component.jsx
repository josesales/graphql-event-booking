import React from 'react';
import BookingItem from './booking-item.component';
import './booking-list.styles.css';

const BookingList = ({ bookings, cancelBooking }) => {

    return (
        <ul className="bookings__list">
            {
                bookings.map(booking => <BookingItem key={booking._id} booking={booking} cancelBooking={cancelBooking} />)
            }
        </ul>
    );
}

export default BookingList;