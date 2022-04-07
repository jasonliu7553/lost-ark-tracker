import React from 'react'
import Button from './Button'

const PopUp = ({ handleClose, eventName, event }) => {

    const setEventName = (name) => {
        eventName = name
    }

    return (
        <div className='popup-box'>
            <div className='box'>
                <span className='close-icon' onClick={handleClose}>x</span>
                Have up visited the following event? - {eventName}
                <h1 />
                <Button color='green' name='yes' />
                <Button color='red' name='no' />
            </div>
        </div>
    )
}

PopUp.defaultProps = {
    handleClose: () => (console.log('close')),
    eventName: 'name'
}

export default PopUp