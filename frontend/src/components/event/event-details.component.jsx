import React from 'react';
import Modal from '../modal/modal.component';
import './event-item.styles.css';

const EventDetails = ({ event, onCancel, onBook }) => {

    let eventDateTime = new Date(event.date);
    eventDateTime = eventDateTime.toLocaleDateString() + ' ' + eventDateTime.toLocaleTimeString();


    return (

        <Modal title={event.title} canConfirm canCancel onConfirm={onBook} onCancel={onCancel}>
            <h1>{event.title}</h1>
            <h2>${event.price} - {eventDateTime}</h2>
            <p>{event.description}</p>
        </Modal>
    );
}

export default EventDetails;