import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../context/auth-context';
import { sendRequest } from '../graphql/request-sender';
import Spinner from '../components/spinner/spinner.component';
import BookingList from '../components/booking/booking-list.component';
import BookingChart from '../components/booking/booking-chart.component';
import BookingControls from '../components/booking/booking-controls.component';

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
                    price
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
    const [outputType, setOutputType] = useState('list');
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

    let content = <Spinner />;

    const changeOutputType = type => {
        if (type === 'list') {
            setOutputType('list');
        } else {
            setOutputType('chart');
        }
    }

    if (!isLoading) {
        content = (
            <React.Fragment>
                <BookingControls changeOutputType={changeOutputType} outputType={outputType} />
                {
                    outputType === 'list' ? <BookingList bookings={bookings} cancelBooking={cancelBooking} /> :
                        <BookingChart bookings={bookings} />
                }
                <div>

                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default BookingPage;