import React from 'react'

const Button = ({ color, name, onClick }) => {

    return (
        <button onClick={onClick} className='btn' style={{ backgroundColor: color }}>{name}</button>
    )
}

export default Button