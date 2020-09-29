import React, { useState,useEffect } from 'react'
import AbsoluteSmooth from './AbsoluteSmooth'

export default function CalculateData({ daysInRow, rowWidth }) {
    const cellWidth = rowWidth / daysInRow.length
    const [someData, setSomeData] = useState()

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
   
    const [board, setBoard] = useState([
        {
            departamentName: "BACKEND", show: true, workers: [
                {
                    id: 'back-1', name: 'Leonid', surname: 'Bondar', department: 'back',blockHeight: 2, projects: [
                        { positionX: 0, positionY: 0, id: "back-1-1", title: "Startup", projStart: "Aug 15 2020", duration: 2, type: 'main' },
                        { positionX: 2, positionY: 1, id: "back-2-1", title: "Startup", projStart: "Aug 15 2020", duration: 2, type: 'main' }
                    ]
                },
                {
                    id: 'back-2', name: 'Boris', surname: 'Koval', department: 'back', blockHeight: 0, projects: []
                },
                {
                    id: 'back-3', name: 'Afanasy', surname: 'Marchenko', department: 'back', blockHeight: 0, projects: []
                },
                {
                    id: 'back-4', name: 'Artur', surname: 'Rudenko', department: 'back', blockHeight: 0, projects: [
                        { positionX: 2, positionY: 1, id: "back-4-1", title: "Manifest", projStart: "Aug 19 2020", duration: 4, type: "education" }
                    ]
                },
                {
                    id: 'back-5', name: 'Mikhail', surname: 'Petrenko', department: 'back', blockHeight: 0, projects: []
                }
            ]
        },
        {
            departamentName: "QA", show: true, workers: [
                {
                    id: 'qa-1', name: 'Leonid', surname: 'Bondar', department: 'qa', blockHeight: 0,projects: [
                        { positionX: 1, positionY: 1, id: "qa-1-1", title: "Startup 1", projStart: "Aug 15 2020", duration: 2, type: 'main' },
                        { positionX: 3, positionY: 1, id: "qa-1-2", title: "Startup 2", projStart: "Aug 15 2020", duration: 2, type: 'main' },
                    ]
                },
                {
                    id: 'qa-2', name: 'Boris', surname: 'Koval', department: 'qa', blockHeight: 0, projects: []
                },
                {
                    id: 'qa-3', name: 'Afanasy', surname: 'Marchenko', department: 'qa', blockHeight: 0, projects: []
                },
                {
                    id: 'qa-4', name: 'Artur', surname: 'Rudenko', department: 'qa', blockHeight: 0, projects: []
                }
            ]
        }
    ])

    return <AbsoluteSmooth days={daysInRow} cellWidth={cellWidth} board={board} rowWidth={rowWidth} setSomeData={setSomeData} />
}
