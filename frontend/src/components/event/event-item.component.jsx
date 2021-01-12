import React, { useContext } from 'react';
import AuthContext from '../../context/auth-context';
import './event-item.styles.css';

const EventItem = ({ event, viewDetailsHandler }) => {
    const { authContext } = useContext(AuthContext);

    let eventDateTime = new Date(event.date);
    eventDateTime = eventDateTime.toLocaleDateString() + ' ' + eventDateTime.toLocaleTimeString();

    return (
        <React.Fragment>

            <li className="events__list-item" key={event._id} >

                <div className="someclass">
                    <h1>{event.title}</h1>
                    <h2>${event.price} - {eventDateTime}</h2>
                </div>

                <div className="someclass">
                    {
                        authContext.userId === event.creator._id ? <p>You are the owner of the Event</p> :
                            <button className="btn" onClick={viewDetailsHandler.bind(this, event)}>View Details</button>
                    }
                </div>
            </li>
        </React.Fragment>
    );
}

export default EventItem;