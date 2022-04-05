import { Component } from 'react'

export class Timer extends Component {

    static schedEvent

    constructor(event) {
        super()
        this.schedEvent = event
    }

    //return the next hour the boss spawns or -1 if there are no more spawn hours
    updateTimer(event) {
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


        //var run = setInterval(() => setTimer(event.timer), 1000)


    }

    render() { return (<>1</>) }




    componentWillUnmount() {
        clearInterval()
    }
}

function nextHour(event, next) {
    var today = new Date()
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

export default Timer