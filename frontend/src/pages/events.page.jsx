import React, { useCallback, useContext, useEffect, useState } from 'react';
import Backdrop from '../components/backdrop/backdrop.component';
import Modal from '../components/modal/modal.component';
import '../index.css';
import './events.styles.css';
import { sendRequest } from '../graphql/request-sender';
import AuthContext from '../context/auth-context';
import EventList from '../components/event/event-list.component';
import Spinner from '../components/spinner/spinner.component';
import EventDetails from '../components/event/event-details.component';

const isEventValid = event => {
    if (event.title.trim().length === 0 || event.price < 0 || event.description.trim().length === 0) {
        return false
    }
    return true;
}

const fetchEventsQueryObj = {
    query: `#graphql
        query {
            events {
            _id
            title
            creator{
                _id
                email
            }
            description
            price
            date
            }
        }
    `,
}

const createEventMutationObj = newEvent => {
    return {

        query: `#graphql

        mutation {
            createEvent(eventInput: {title:"${newEvent.title}", description: "${newEvent.description}", price: ${newEvent.price}, date: "${newEvent.date}"}) {
            _id
            title
            creator{
                _id
                email
            }
            description
            price
            date
            }
        } 
    `
    }
}

const bookEventMutationObj = eventId => {
    return {

        query: `#graphql

            mutation{
                bookEvent(eventId: "${eventId}") {
                _id
                user{
                    _id
                    email
                }
                event{
                    _id
                    title
                }
                createdAt
                updatedAt
                }
            }
        `
    }
}


const EventsPage = () => {

    const { authContext } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        price: 0,
        date: new Date(),
        description: '',

    });

    const fetchEvents = useCallback(async () => {
        try {

            setIsLoading(true);

            const res = await sendRequest(fetchEventsQueryObj, 'events');
            setEvents(res);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }, []);


    //Fetch events after components component mounts 
    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    const startCreateEventHandler = () => {
        setCreating(true);
    }

    const onConfirmHandler = async () => {
        setCreating(false);

        if (!isEventValid(newEvent)) {
            return;
        }

        const eventRes = await sendRequest(createEventMutationObj(newEvent), 'createEvent', authContext.token);
        setEvents(events => [...events, eventRes]);
    }

    const onCancelHandler = () => {
        setCreating(false);
    }
    const onEventChangeHandler = e => {
        setNewEvent({ ...newEvent, [e.target.id]: e.target.value });

    }

    const [isDetailModalOn, setIsDetailModalOn] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const viewDetailsHandler = event => {
        setIsDetailModalOn(true)
        setSelectedEvent(event);
    }

    const onCancelDetailsHandler = () => {
        setIsDetailModalOn(false);
    }

    const onBookEventHandler = async () => {
        try {
            await sendRequest(bookEventMutationObj(selectedEvent._id), 'bookEvent', authContext.token);
            alert(selectedEvent.title + ' booked successfully!')
            setIsDetailModalOn(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <React.Fragment>
            {(creating || isDetailModalOn) && <Backdrop />}

            {creating &&
                <Modal title="Add Event" canConfirm canCancel onConfirm={onConfirmHandler} onCancel={onCancelHandler}>
                    <form>
                        <div className="form-control">
                            <label htmlFor="title">Title</label>
                            <input type="text" id="title" value={newEvent.title} onChange={onEventChangeHandler} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" value={newEvent.price} onChange={onEventChangeHandler} />
                        </div>

                        <div className="form-control">
                            <label htmlFor="date">Date</label>
                            <input type="datetime-local" id="date" value={newEvent.date} onChange={onEventChangeHandler} />
                        </div>
                        <div className="form-control">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows="4" value={newEvent.description} onChange={onEventChangeHandler} />
                        </div>
                    </form>
                </Modal>
            }

            {
                isDetailModalOn &&
                <EventDetails event={selectedEvent} onCancel={onCancelDetailsHandler}
                    onBook={onBookEventHandler} />
            }

            {authContext.token &&
                <div className="events-control">
                    <p>Share your own Events!</p>
                    <button className="btn" onClick={startCreateEventHandler}>Create Event</button>
                </div>
            }

            {
                isLoading ? <Spinner /> : <EventList events={events} viewDetailsHandler={viewDetailsHandler} />
            }

        </React.Fragment>
    );
}

export default EventsPage;