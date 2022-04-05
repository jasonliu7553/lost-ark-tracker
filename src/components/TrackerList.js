import React from 'react'
import { useState } from 'react'

const TrackerList = ({ schedEvents }) => {

    const today = new Date()
    const [eventTimers, setEventTimers] = useState()


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

    const updateTimer = (event) => {
        var day = new Date()
        var hour
        var minute
        var sec = 60 - day.getSeconds()

        if (event.minute < day.minute && event.minute != 0) {
            hour = nextHour(event, true)
            minute = event.minute
        }
        else {
            hour = nextHour(event, false) - 1
            minute = 60
        }

        event.timer = [hour - day.getHours(), Math.abs(minute - day.getMinutes()), sec]

        var run = setInterval(() => (setEventTimers(event.timer)), 1000)

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

        if (hour === -1) {
            output = 'no more spawns'
        }

        updateTimer(event)

        return output
    }

    return (
        trackedEvents.map((event) => (
            <div key={event.id}>
                <h3>
                    {event.event}
                </h3>
                <h4>
                    Next spawn: {formatTime(event)},    {event.timer[0]}:{event.timer[1]}:{event.timer[2]}
                </h4>
            </div>
        ))
    )
}

TrackerList.defaultProps = {
    schedEvents: []
}

export default TrackerList