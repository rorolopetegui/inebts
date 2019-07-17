import React, { Component } from 'react'
import Calendar from 'react-calendar'

export default class cCalendar extends Component {
    state = {
        date: this.props.startDate ? new Date(this.props.startDate) : new Date(),
    }

    onChange = (date) => {
        //console.log("Change", date)
        this.setState({ date })
        this.props.onChange(date.getTime())
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