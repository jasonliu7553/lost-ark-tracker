import { useState } from 'react'

const Timer = ({ timer }) => {

    const output = () => {

        if (timer[0] < 0)
            return '--:--:--'

        var second
        var minute
        var hour

        //hours
        if (timer[0] < 10 && timer[0] >= 0)
            hour = `0${timer[0]}`
        else
            hour = timer[0]

        //minutes
        if (timer[1] < 10)
            minute = `0${timer[1]}`
        else
            minute = `${timer[1]}`

        //seconds
        if (timer[2] < 10)
            second = `0${timer[2]}`
        else
            second = timer[2]

        var text = `${hour}:${minute}:${second}`

        return text

    }



    return (<label>{output()}</label>)

}

Timer.defaultProps = {
    timer: [0, 0, 0]
}

export default Timer