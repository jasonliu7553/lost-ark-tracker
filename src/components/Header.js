import React from 'react'
import Button from './Button'

const headingStyle = { color: 'red' }
const Header = ({ onClick, showAdd }) => {
    return (
        <header>
            <h1 style={headingStyle}> Lost Ark Tracker </h1>
            <Button name={showAdd ? 'Save & Close' : 'Reminders'} color={showAdd ? 'green' : 'black'} onClick={onClick} />
        </header>

    )
}

export default Header