import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../context/auth-context';
import { sendRequest } from '../graphql/request-sender';
import Spinner from '../components/spinner/spinner.component';
import BookingList from '../components/booking/booking-list.component';

const bookingsQueryObj = {
    query: `#graphql
        query {
            bookings {
                _id
                user{
                    _id
                    email
                }
                event{
                    _id
                    title
                    date
                    creator {
                        email
                    }
                }
                createdAt
                updatedAt
            }
        }
    `,
}

const cancelBookingMutationObj = bookingId => {
    return {

        query: `#graphql

            mutation {
                cancelBooking(bookingId: "${bookingId}"){
                    _id
                    title
                }
            }
        `
    }
}

const BookingPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const { authContext } = useContext(AuthContext);

    const fetchBookings = useCallback(async () => {
        try {
            setIsLoading(true);

            const res = await sendRequest(bookingsQueryObj, 'bookings', authContext.token);
            setBookings(res);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, [authContext.token]);


    //Fetch events after components component mounts 
    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const cancelBooking = async bookingId => {

        await sendRequest(cancelBookingMutationObj(bookingId), 'cancelBooking', authContext.token);

        //Remove deleted booking from the bookings array
        const updatedBookings = bookings.filter(booking => booking._id !== bookingId)
        setBookings(updatedBookings);
    }

    return (
        <React.Fragment>
            {
                isLoading ? <Spinner /> : <BookingList bookings={bookings} cancelBooking={cancelBooking} />
            }
        </React.Fragment>
    );
}

export default BookingPage;