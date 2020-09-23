import React from 'react'
import arrowIcon from '../../../images/buttonLeft.svg'

export default function DepartmentTitle({ departament, departamentID, toggler }) {
    // console.log('rerender DepartmentTitle')
    return (
        <div className="departmentTitle" key={"key-"+departament.name+"-"+departamentID}>
            <h5>{departament.departamentName}</h5>
            <button
                onClick={() =>  toggler(departamentID)}
                className="departmentBtn"><img className={departament.show ? "show" : "hide"} src={arrowIcon} alt="arrow icon" /></button>
        </div>
    )
}
