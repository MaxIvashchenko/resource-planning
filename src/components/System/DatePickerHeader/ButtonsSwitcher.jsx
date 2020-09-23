import React from 'react'
import btnR from '../../../images/buttonRight.svg'
import btnL from '../../../images/buttonLeft.svg'


function ButtonsSwitcher(props) {
    const { nameOfClass, handler } = props

    return (
        <div className={nameOfClass}>
            <button onClick={() => handler(false)} ><img src={btnL} alt="button-icon" /></button>
            {props.children}
            <button onClick={() => handler(true)} ><img src={btnR} alt="button-icon" /></button>
        </div>

    )

}
export default ButtonsSwitcher

