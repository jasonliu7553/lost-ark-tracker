import React from 'react'
import Button from './Button'

const headingStyle = { color: 'red' }
const Header = () => {
    return (
        <header>
            <h1 style={headingStyle}> Lost Ark Tracker </h1>
            <Button name='button' />
        </header>

    )
}

export default Header