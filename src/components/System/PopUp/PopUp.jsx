import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import cross from '../../../images/plus.svg'

export default function PopUp({ handlerAddPopUp, workerInfo, addingInfo }) {
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate() + 1));
    const [title, setTitle] = useState('')
    const [type, setType] = useState('main')
    const myChangeHandler = (event) => {
        setTitle(event.target.value)
    }
    const addInfo = () => {
        addingInfo(workerInfo, startDate, endDate, title, type)
        handlerAddPopUp(false)
    }

    const getTypeHandler = (event) => setType(event.target.value)



    const options = [
        { value: 'main', label: 'main' },
        { value: 'education', label: 'education' },
        { value: 'qaTask', label: 'QA task' },
    ];



    return (
        <>

            <div className="PopUp">
                <div className="popUpForm">

                    <div className="title">
                        <h1>Event  </h1>
                        <img onClick={() => handlerAddPopUp(false)} src={cross} alt="cross-icon" />
                    </div>

                    <div className="dates">
                        <p>Start from:</p>

                        <DatePicker
                            selected={startDate}
                            onChange={data => setStartDate(data.getTime())}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="MMMM d, yyyy"
                        />
                        <p>End:</p>

                        <DatePicker
                            selected={endDate > startDate ? endDate : startDate}
                            onChange={data => setEndDate(data.getTime())}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="MMMM d, yyyy"
                        />
                    </div>

                    <select onChange={getTypeHandler}>
                        {options.map((v, i) => <option value={v.value}>{v.label}</option>)}
                    </select>

                    <p>Enter Title:</p>

                    <textarea
                        required
                        className="textarea"
                        type='text'
                        onChange={myChangeHandler}
                    />
                    <div className="buttons">
                        <button onClick={() => addInfo()} className="submitBtn">submit</button>
                        <button onClick={() => handlerAddPopUp(false)} className="cancelBtn">cancel</button>
                    </div>


                </div>
                <button className="popUpBtn" onClick={() => handlerAddPopUp(false)}>qwdqw</button>

            </div>
        </>
    )
}
