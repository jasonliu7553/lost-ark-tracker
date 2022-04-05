import React from 'react'
import Timer from './Timer.js'
import { useState, Component } from 'react'

const TrackerList = ({ schedEvents }) => {

    const today = new Date()
    const [timer, setTimer] = useState()


    //filter out the events that are not on the reminder list, or already visited
    var trackedEvents = schedEvents.filter((event) => (
        event.reminder == true && event.visited == false
    ))

    const nextDay = (event) => {
        today.getHours()
    }

    //return the next hour the boss spawns or -1 if there are no more spawn hours
    const nextHour = (event, next) => {
        const hours = event.hour.filter((hour) => (
            hour > today.getHours()
        ))

        if (next === true && hours.length > 1) {
            return hours[1]
        } else if (next === true) {
            return -1
        }
        else if (hours.length > 0) {
            return hours[0]
        }
        else {
            return -1
        }

    }

    //returns the next time event will happen as a string
    const formatTime = (event) => {
        const minute = event.minute
        var hour
        if (today.getMinutes > minute && minute != 0) {
            hour = nextHour(event, true)
        }
        else {
            hour = nextHour(event, false)
        }

        var output = ` ${hour}:${minute}`

        if (hour < 10 & minute < 10)
            output = `Next spawn:  0${hour}:0${minute}`
        else if (hour < 10)
            output = `Next spawn:  0${hour}:${minute}`
        else if (minute < 10)
            output = `Next spawn:  ${hour}:0${minute}`

        if (hour === -1) {
            output = 'no more spawns'
        }

        return output
    }

    return (
        trackedEvents.map((event) => (
            <div key={event.id}>
                <h3>
                    {event.event} <Timer event={event} />
                </h3>
                <h4>
                    {formatTime(event)}, {event.timer[0]}:{event.timer[1]}:{event.timer[2]}
                </h4>
            </div>
        ))
    )
}

TrackerList.defaultProps = {
    schedEvents: []
}

export default TrackerList