import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import cross from '../../../images/plus.svg'

export default function PopUp({ handlerAddPopUp,workerInfo,addingInfo }) {
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate()+1));
    const [title, setTitle] = useState('')

    const myChangeHandler = (event) => {
        setTitle(event.target.value)
    }
    const addInfo = () => {
        addingInfo(workerInfo, startDate,endDate,title)
        handlerAddPopUp(false)
    }
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

                        <p>Enter Title:</p>

                        <textarea
                        required
                            className="textarea"
                            type='text'
                            onChange={myChangeHandler}
                        />
                        <div className="buttons">
                            <button onClick={() =>  addInfo()} className="submitBtn">submit</button>
                            <button onClick={() => handlerAddPopUp(false)} className="cancelBtn">cancel</button>
                        </div>


                </div>
                <button className="popUpBtn" onClick={() => handlerAddPopUp(false)}>qwdqw</button>

            </div>
        </>
    )
}
