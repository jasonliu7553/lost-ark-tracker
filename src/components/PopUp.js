import React from 'react'
import Button from './Button'

const PopUp = ({ handleClose, eventID, events, yes }) => {

    const getName = () => {

        for (var i = 0; i < events.length; i++) {
            if (events[i].id === eventID)
                return events[i].event
        }

        return 'nan'
    }

    return (
        <div className='popup-box'>
            <div className='box'>
                <span className='close-icon' onClick={handleClose}>x</span>
                Have up visited the following event? - {getName()}
                <h1 />
                <Button color='green' name='yes' onClick={yes} />
                <Button color='red' name='no' onClick={handleClose} />
            </div>
        </div>
    )
}

PopUp.defaultProps = {
    handleClose: () => (console.log('close')),
    yes: () => (console.log('yes')),
    no: () => (console.log('no')),
    eventName: 'name'
}

export default PopUp