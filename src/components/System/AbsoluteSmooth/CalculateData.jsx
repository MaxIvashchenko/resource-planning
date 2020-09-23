import React from 'react'
import AbsoluteSmooth from './AbsoluteSmooth'

export default function CalculateData({ daysInRow, rowWidth }) {
    const cellWidth = rowWidth / daysInRow.length
    const board = [
        {
            departamentName: "BACKEND", show: true, workers: [
                {
                    id: 'back-1', name: 'Leonid', surname: 'Bondar', department: 'back', projects: [
                        { left: 0, positionY: 1, id: "back-1-1", title: "Startup", projStart: "Aug 15 2020", duration: 2, type: 'main' }
                    ]
                },
                {
                    id: 'back-2', name: 'Boris', surname: 'Koval', department: 'back', projects: []
                },
                {
                    id: 'back-3', name: 'Afanasy', surname: 'Marchenko', department: 'back', projects: []
                },
                {
                    id: 'back-4', name: 'Artur', surname: 'Rudenko', department: 'back', projects: [
                        { left: 240, positionY: 1, id: "back-4-1", title: "Manifest", projStart: "Aug 19 2020", duration: 4, type: "education" }
                    ]
                },
                {
                    id: 'back-5', name: 'Mikhail', surname: 'Petrenko', department: 'back', projects: []
                }
            ]
        },
        {
            departamentName: "QA", show: true, workers: [
                {
                    id: 'qa-1', name: 'Leonid', surname: 'Bondar', department: 'qa', projects: [
                        { left: 120, positionY: 1, id: "qa-1-1", title: "Startup 1", projStart: "Aug 15 2020", duration: 2, type: 'main' },
                        { left: 131 * 4, positionY: 1, id: "qa-1-2", title: "Startup 2", projStart: "Aug 15 2020", duration: 2, type: 'main' },
                    ]
                },
                {
                    id: 'qa-2', name: 'Boris', surname: 'Koval', department: 'qa', projects: []
                },
                {
                    id: 'qa-3', name: 'Afanasy', surname: 'Marchenko', department: 'qa', projects: []
                },
                {
                    id: 'qa-4', name: 'Artur', surname: 'Rudenko', department: 'qa', projects: []
                }
            ]
        }
    ]



    return (

        <AbsoluteSmooth days={daysInRow} cellWidth={cellWidth} board={board} />
    )
}
