import React from 'react'
import { useState } from 'react'

const ToggleReminders = (schedEvents) => {
    return (
        <form className='add-form'>
            <div className='container'>
                <label> First Event </label>
                <input type='checkbox' />
            </div>
        </form>
    )
}

export default ToggleReminders