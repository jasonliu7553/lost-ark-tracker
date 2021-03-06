import React from 'react'
import Button from './Button'
import img from '../img/LA_title.png'

const headingStyle = { color: 'red' }
const Header = ({ onClick, showAdd, updateQueue }) => {
    return (
        <header>
            <img src={img} />
            <h1 style={headingStyle}> Event Tracker </h1>
            <Button name={showAdd ? 'Close' : 'Reminders'} color={showAdd ? 'red' : 'green'} onClick={onClick} />
            <Button name='show pings' color='black' onClick={updateQueue} />
        </header>

    )
}

export default Header