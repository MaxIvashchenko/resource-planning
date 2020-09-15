import React  from 'react'

function ShowMonthLine({ i, month, daysNumber, size, getWidthRow }) {
   
  
    return (
        <div
            className={i === 0 ? "month" : "month borderLine"}
            style={{ width: `${100 / daysNumber * month.sum}%` }}>
            {month.month}
        </div>
    )
}

export default  ShowMonthLine