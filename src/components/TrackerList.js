import React from 'react'
import Timer from './Timer.js'
import Button from './Button.js'
import { useEffect, useState } from 'react'

const TrackerList = ({ schedEvents }) => {

    var today = new Date()
    const [seconds, setSeconds] = useState()

    useEffect(() => {

        var secondHand = setInterval(() => {
            today = new Date()
            setSeconds(today.getSeconds())

        }, 1000)


    }, [])

    //filter out the events that are not on the reminder list, or already visited
    var trackedEvents = schedEvents.filter((event) => (
        event.reminder == true && event.visited == false
    ))

    //return the next day the event is scheduled
    const nextDay = (event) => {

        for (var i = 0; i < event.day.length; i++) {
            if (event.day[i] >= today.getDay()) {
                return event.day[i]
            }
        }

        return event.day[0]
    }

    //return the next hour the boss spawns or -1 if there are no more spawn hours
    const nextHour = (event, next) => {
        const hours = event.hour.filter((hour) => (
            hour >= today.getHours()
        ))

        if (today.getDay() !== nextDay(event))
            return -1

        if (next === true && hours.length > 1) {
            if (hours[0] === today.getHours())
                return hours[1]
            else
                return hours[0]
        } else if (next === false && hours.length > 0) {
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
        if (today.getMinutes() > minute || minute == 0) {
            if (nextHour(event, false) > today.getHours())
                hour = nextHour(event, false)
            else
                hour = nextHour(event, true)
        }
        else {
            hour = nextHour(event, false)
        }

        var output = `Next spawn: ${hour}:${minute}`

        if (hour < 10 & minute < 10)
            output = `Next spawn:  0${hour}:0${minute}`
        else if (hour < 10)
            output = `Next spawn:  0${hour}:${minute}`
        else if (minute < 10)
            output = `Next spawn:  ${hour}:0${minute}`

        if (hour === -1) {
            output = 'no more spawns today'
        }

        return output
    }

    const updateTimer = (event) => {
        var day = new Date()
        var hour
        var minute
        var sec = 60 - seconds

        if (event.minute == 0)
            minute = 60 - day.getMinutes()
        else if (event.minute < day.getMinutes())
            minute = 60 - Math.abs(event.minute - day.getMinutes())
        else
            minute = day.getMinutes() - event.minute


        hour = nextHour(event, false)
        minute = Math.abs(minute) - 1

        return [hour - day.getHours(), minute, sec]

    }

    const visited = (event) => {
        event.visited = true
    }

    return (
        trackedEvents.map((event) => (
            <div key={event.id}>
                <h3>
                    {event.event}
                    <Timer e={event} timer={updateTimer(event)} />
                    <Button name='visited' onClick={() => visited(event)} color='black' />
                </h3>
                <h4>
                    {formatTime(event)}
                </h4>
            </div>
        ))
    )
}

TrackerList.defaultProps = {
    schedEvents: []
}

export default TrackerList