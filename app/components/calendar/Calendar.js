import React, { Component } from 'react'
import Calendar from 'react-calendar'

export default class cCalendar extends Component {
    state = {
        date: new Date(),
    }

    onChange = (date) => {
        //console.log("Change", date)
        this.setState({ date })
    }

    render = () => {
        const { date } = this.state

        return (
            <Calendar
                onChange={this.onChange.bind(this)}
                value={date}
            />
        )
    }
}