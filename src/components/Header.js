import React from 'react'
import Button from './Button'

const headingStyle = { color: 'red' }
const Header = ({ onClick, showAdd }) => {
    return (
        <header>
            <h1 style={headingStyle}> Lost Ark Tracker </h1>
            <Button name={showAdd ? 'Close' : 'Reminders'} color={showAdd ? 'red' : 'green'} onClick={onClick} />
        </header>

    )
}

export default Header