import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import cross from '../../../images/plus.svg'

export default function PopUp({ handlerPopUp,workerInfo,addingInfo }) {
    const [startDate, setStartDate] = useState(new Date().getTime());
    const [endDate, setEndDate] = useState(new Date().setDate(new Date().getDate()));
    const [title, setTitle] = useState('')
    // duration: 2
    // id: "back-1-1"
    // positionX: 1
    // positionY: 0
    // projStart: "Aug 15 2020"
    // title: "Startup"
    // type: "main"

    console.log(startDate,endDate,title)

    const myChangeHandler = (event) => {
        setTitle(event.target.value)
    }
    
    return (
        <>

            <div className="PopUp">
                <div className="popUpForm">
                    <form></form>
                        <div className="title">
                            <h1>Event  </h1>
                            <img onClick={() => handlerPopUp(false)} src={cross} alt="cross-icon" />
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
                            className="textarea"
                            type='text'
                            onChange={myChangeHandler}
                        />
                        <div className="buttons">
                            <button onClick={() =>  addingInfo(workerInfo, startDate,endDate,title)} className="submitBtn">submit</button>
                            <button onClick={() => handlerPopUp(false)} className="cancelBtn">cancel</button>
                        </div>


                </div>
                <button className="popUpBtn" onClick={() => handlerPopUp(false)}>qwdqw</button>

            </div>
        </>
    )
}
