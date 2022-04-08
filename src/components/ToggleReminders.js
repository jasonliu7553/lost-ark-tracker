import React from 'react'
import Button from './Button.js'
import { Helmet } from 'react-helmet'

const ToggleReminders = ({ schedEvents, onTick, clearVisit }) => {

    return (
        < form className='add-form' >
            <div className='container'>
                <div className='container'>
                    {schedEvents.map((event) => (
                        <h3 key={event.id}>
                            {event.event}
                            <input type='checkbox' defaultChecked={event.reminder} onChange={() => onTick(event.id)} />
                        </h3>
                    ))}

                </div>
                <Button onClick={clearVisit} name='Clear Visits [WIP]' />
            </div>
        </form >
    )


}

ToggleReminders.defaultProps = {
    schedEvents: []
}

export default ToggleReminders