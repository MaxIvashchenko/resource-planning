import React, { useEffect } from 'react'
import { withSize } from 'react-sizeme'
import ShowMonth from './ShowMonth';

function ShowMonthLine({ monthsView, getRowWidth, daysNumber, size }) {
    useEffect(() => {
        getRowWidth(size.width)
    }, [getRowWidth, size.width])

    const monthMap = monthsView.map((month, i) => {
        return (
            <ShowMonth
                i={i}
                key={"month-" + month.month + "-" + i}
                month={month}
                daysNumber={daysNumber}
            />
        )
    })

    return (
        <div className="months">
            {monthMap}
        </div>
    )
}

export default withSize()(ShowMonthLine)


