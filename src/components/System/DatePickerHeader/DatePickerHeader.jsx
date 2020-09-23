import React, { useState, useEffect } from 'react'
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ShowMDaysLine from './ShowMDaysLine';
import ButtonsSwitcher from './ButtonsSwitcher';

import ShowMonthLine from './ShowMonthLine';


const calendarDay = 24 * 60 * 60 * 1000;

function DatePickerHeader({ getDaysInRow, getRowWidth }) {
    const [daysNumber, setDaysNumber] = useState(5);
    const [days, setDays] = useState([]);
    const [monthsView, setmonthsView] = useState([]);
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate() + daysNumber));

    useEffect(() => {
        const daysLeft = Math.round((endDate - startDate) / calendarDay);
        const counter = daysLeft > 21 ? 21 : daysLeft;
        counter !== 0 && setDaysNumber(counter)
        const days = []

        for (let i = 0; i < counter + 1; i++) {
            const weekDay = moment(startDate).add(1 * i, 'day').format('dd');
            const date = moment(startDate).add(1 * i, 'day').date();
            const month = moment(startDate).add(1 * i, 'day').format('MMMM')
            const year = moment(startDate).add(1 * i, 'day').year()
            const projects = {}

            days.push({ id: weekDay + "-" + date + "-" + month, weekDay, date, month, year, projects })
        }

        const somOfDays = days.reduce((acc, el) => {
            acc[el.month] = (acc[el.month] || 0) + 1;
            return acc
        }, {});

        const monthsView = Object.keys(somOfDays).map(function (num) {
            return { month: num, sum: somOfDays[num] };
        });

        setDays(days)
        setmonthsView(monthsView)
        getDaysInRow(days)
    }, [startDate, endDate, daysNumber, getDaysInRow])

    const monthHandler = (isTrue) => {
        let newStartDate, newEndDate;
        if (isTrue) {
            newStartDate = moment(startDate).add(1, 'month').format('x')
            newEndDate = moment(endDate).add(1, 'month').format('x')

        } else {
            newStartDate = moment(startDate).subtract(1, 'month').format('x')
            newEndDate = moment(endDate).subtract(1, 'month').format('x')
        }

        setStartDate(+newStartDate)
        setEndDate(+newEndDate)
    }

    const dayHandler = (isTrue) => {
        if (isTrue) {
            setStartDate(startDate + calendarDay)
            setEndDate(endDate + calendarDay)
        } else {
            setStartDate(startDate - calendarDay)
            setEndDate(endDate - calendarDay)
        }
    }
    const clear = () => {
        setStartDate(new Date().getTime())
        setEndDate(new Date().setDate(new Date().getDate() + 14))
    }
    // console.log('rerender')
    return (
        <div className="DatePickerHeader container-fluid">
            <div className="picker">
                <div className="calendar">
                    <div className="dates">
                        <DatePicker
                            selected={startDate}
                            onChange={data => setStartDate(data.getTime())}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="MMMM d, yyyy"
                        />
                        <DatePicker
                            selected={endDate > startDate ? endDate : startDate}
                            onChange={data => setEndDate(data.getTime())}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="MMMM d, yyyy"
                        />
                        <button id="clearButton" onClick={() => clear()}>Clear</button>
                    </div>
                </div>
            </div>

            <div className="datesShow">

                <ButtonsSwitcher handler={monthHandler} nameOfClass={"months"}>
                    <ShowMonthLine monthsView={monthsView} getRowWidth={getRowWidth} daysNumber={daysNumber} />
                </ButtonsSwitcher>

                <ButtonsSwitcher handler={dayHandler} nameOfClass={"days"}>
                    {days.map(day =>
                        <ShowMDaysLine
                            key={"headerDate-" + day.date + "-" + day.i}
                            day={day}
                            daysNumber={daysNumber}
                        />
                    )}
                </ButtonsSwitcher>

            </div>
        </div>

    )
}


export default DatePickerHeader
