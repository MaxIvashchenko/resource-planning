import React, { useState, useEffect } from 'react'
import AbsoluteSmooth from './AbsoluteSmooth'
import { givePositionY } from '../../lab/givePositionY'
import useForceUpdate from 'use-force-update';
import moment from 'moment';
import { nanoid } from 'nanoid'


const calendarDay = 24 * 60 * 60 * 1000;

const data = [
    {
        departamentName: "BACKEND", show: true, workers: [
            {
                id: 'back-1', name: 'Leonid', surname: 'Bondar', department: 'back', blockHeight: 1, projects: [
                    { positionX: 0, positionY: 0, id: "back-1-1", title: "Startup", projStart: 1603183344320, duration: 2, type: 'main' },
                    { positionX: 1, positionY: 0, id: "back-2-1", title: "Startup", projStart: 1603356144000, duration: 2, type: 'main' }
                ]
            },
            {
                id: 'back-2', name: 'Boris', surname: 'Koval', department: 'back', blockHeight: 1, projects: []
            },
            {
                id: 'back-3', name: 'Afanasy', surname: 'Marchenko', department: 'back', blockHeight: 1, projects: []
            },
            {
                id: 'back-4', name: 'Artur', surname: 'Rudenko', department: 'back', blockHeight: 1, projects: [
                    { positionX: 2, positionY: 0, id: "back-4-1", title: "Manifest", projStart: 1603442544000, duration: 4, type: "education" }
                ]
            },
            {
                id: 'back-5', name: 'Mikhail', surname: 'Petrenko', department: 'back', blockHeight: 1, projects: []
            }
        ]
    },
    {
        departamentName: "QA", show: true, workers: [
            {
                id: 'qa-1', name: 'Leonid', surname: 'Bondar', department: 'qa', blockHeight: 1, projects: [
                    { positionX: 1, positionY: 0, id: "qa-1-1", title: "Startup 1", projStart: 1603442544000, duration: 2, type: 'main' },
                    { positionX: 3, positionY: 0, id: "qa-1-2", title: "Startup 2", projStart: 1603442544000, duration: 2, type: 'main' },
                ]
            },
            {
                id: 'qa-2', name: 'Boris', surname: 'Koval', department: 'qa', blockHeight: 1, projects: []
            },
            {
                id: 'qa-3', name: 'Afanasy', surname: 'Marchenko', department: 'qa', blockHeight: 1, projects: []
            },
            {
                id: 'qa-4', name: 'Artur', surname: 'Rudenko', department: 'qa', blockHeight: 1, projects: []
            }
        ]
    }
]



export default function CalculateData({ daysInRow, rowWidth }) {
    const [board, setBoard] = useState(data)
    const cellWidth = rowWidth / daysInRow.length
    const [someData, setSomeData] = useState(givePositionY(data))

    const forceUpdate = useForceUpdate();


    function addingInfo(arr, startDate, endDate, title, type) {
        // e.preventDefault();
        const daysLeft = Math.round((endDate - startDate) / calendarDay);

        const [departamentID, workerId] = arr


        board[departamentID].workers[workerId].projects.push({ positionX: 1, positionY: 0, id: nanoid(8), title, projStart: startDate, projEnd: endDate, duration: daysLeft, type },)

    }

    function editProject(pieceIndex, workerId, departamentID,piece) {
console.log('project edited',pieceIndex, workerId, departamentID)
board[departamentID].workers[workerId].projects[pieceIndex] = piece

    }

    function deleteProject(pieceIndex, workerId, departamentID) {
        console.log('deleteProject', pieceIndex, workerId, departamentID)
        board[departamentID].workers[workerId].projects.splice(pieceIndex, 1)
        forceUpdate()
    }


    const element = document.querySelectorAll('.handlers');
    const resizer = document.querySelectorAll('.resizer')

    useEffect(() => {
        for (let i = 0; i < resizer.length; i++) {
            const currentResizer = resizer[i];
            console.log('CalculateData resizer')
            function deleteDragger() {
                [...element].map(v => v.classList.remove("smooth-dnd-draggable-wrapper"))
            }
            function addDragger() {
                [...element].map(v => v.classList.add("smooth-dnd-draggable-wrapper"))
            }

            currentResizer.addEventListener('mouseover', deleteDragger)
            currentResizer.addEventListener('mouseout', addDragger)
        }

    }, [resizer])



    console.log(board)

    return <AbsoluteSmooth
        days={daysInRow}
        cellWidth={cellWidth}
        board={board}
        deleteProject={deleteProject}
        rowWidth={rowWidth}
        setSomeData={setSomeData}
        addingInfo={addingInfo}
        editProject={editProject}
    />
}
