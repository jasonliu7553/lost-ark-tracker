import React from 'react'

const TrackerList = ({ schedEvents }) => {

    const today = new Date()

    //filter out the events that are not on the reminder list, or already visited
    const trackedEvents = schedEvents.filter((event) => (
        event.reminder == true && event.visited == false
    ))

    //returns the next time event will happen as a string
    const formatTime = (event) => {
        const hours = event.hour.filter((hour) => (
            hour > today.getHours()
        ))
        const minute = event.minute

        var output = ` ${hours[0]}:${minute[0]}`

        if (hours.length < 1) {
            output = 'no more spawns'
        }
        else if (hours.length < 2 && minute[0] < today.getMinutes()) {
            output = 'no more spawns'
        }
        else if (minute[0] < today.getMinutes() && minute[0] != 0) {
            output = `${hours[1]}:${minute[0]}`
        }


        return output
    }

    return (
        trackedEvents.map((event) => (
            <div key={event.id}>
                <h3>
                    {event.event}
                </h3>
                <h4>
                    Next spawn: {formatTime(event)}
                </h4>
            </div>
        ))
    )
}

TrackerList.defaultProps = {
    schedEvents: []
}

export default TrackerList