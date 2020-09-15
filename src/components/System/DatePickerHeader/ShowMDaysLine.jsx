import React from 'react'

export default function ShowMDaysLine({ day, daysNumber }) {
    return (
        <div
            className="day"
            style={{ width: `${100 / daysNumber}%` }}>
            <p>{day.date}</p>
            <p>{day.weekDay}</p>
        </div>
    )
}
