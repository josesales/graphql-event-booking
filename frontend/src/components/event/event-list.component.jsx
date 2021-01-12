import React from 'react';
import EventItem from './event-item.component';
import './event-list.styles.css';

const EventList = ({ events, viewDetailsHandler }) => {

    return (
        <ul className="events__list">
            {
                events.map(event => <EventItem viewDetailsHandler={viewDetailsHandler} key={event._id} event={event} />)
            }
        </ul>
    );
}

export default EventList;