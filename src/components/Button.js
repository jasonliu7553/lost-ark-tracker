import React from 'react'

const Button = ({ color, name, onClick }) => {

    return (
        <button type='button' onClick={onClick} className='btn' style={{ backgroundColor: color }}>{name}</button>
    )
}

Button.defaultProps = {
    color: 'black',
    name: 'button',
    onClick: () => { console.log('click') }
}

export default Button