import React, { useEffect } from 'react'
import { withSize } from 'react-sizeme'

function ShowMonthLine({ i, month, daysNumber, size, getWidthRow, getRowWidth }) {

    useEffect(() => {
        console.log('ShowMonthLine render')
        getRowWidth(size.width)
    }, [getRowWidth, size.width])

    return (
        <div
            className={i === 0 ? "month" : "month borderLine"}
            style={{ width: `${100 / daysNumber * month.sum}%` }}>
            {month.month}
        </div>
    )
}

export default withSize()(ShowMonthLine)