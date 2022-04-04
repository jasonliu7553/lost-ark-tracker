import React from 'react'
import Button from './Button'
import { useState } from 'react'

const ToggleReminders = ({ schedEvents, onTick }) => {
    return (
        < form className='add-form' >
            <div className='container'>
                {schedEvents.map((event) => (
                    <h3 key={event.id}>
                        {event.event}
                        <input type='checkbox' defaultChecked={event.reminder} onChange={() => onTick(event.id)} />
                    </h3>
                ))}
            </div>
        </form >
    )


}

export default ToggleReminders