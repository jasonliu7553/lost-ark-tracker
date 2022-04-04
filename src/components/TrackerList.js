import React from 'react'

const TrackerList = ({ schedEvents }) => {

    const trackedEvents = schedEvents.filter((event) => (
        event.reminder == true && event.visited == false
    ))

    const formatTime = (event) => {
        const time = ` ${event.hour[0]}:${event.minute[0]}`
        return time
    }

    return (
        trackedEvents.map((event) => (
            <h2 key={event.id}>
                {event.event}
                {formatTime(event)}
            </h2>
        ))
    )
}

TrackerList.defaultProps = {
    schedEvents: []
}

export default TrackerList