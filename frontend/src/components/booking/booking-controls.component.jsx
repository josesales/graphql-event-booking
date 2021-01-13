import React from 'react';
import './booking-controls-styles.css';

const BookingControls = ({ changeOutputType, outputType }) => {
    return (
        <div className="booking-controls">
            <button className={outputType === 'list' ? 'active' : ''} onClick={changeOutputType.bind(this, 'list')}>List</button>
            <button className={outputType === 'chart' ? 'active' : ''} onClick={changeOutputType.bind(this, 'chart')}>Chart</button>
        </div>
    );
}

export default BookingControls;












