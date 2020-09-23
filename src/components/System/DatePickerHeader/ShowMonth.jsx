import React from 'react'


function ShowMonth ({ i, month, daysNumber   }) {


    return (
        <div
            className={i === 0 ? "month" : "month borderLine"}
            style={{ width: `${100 / daysNumber * month.sum}%` }}>
            {month.month}
        </div>
    )
}

export default ShowMonth