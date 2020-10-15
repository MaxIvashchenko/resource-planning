import React, { useEffect, useState } from 'react'
import { Draggable, dropHandlers } from 'react-smooth-dnd';
import useForceUpdate from 'use-force-update';
import arrowIcon from '../../../images/plus.svg'
import deleteIcon from '../../../images/delete.svg'
import editIcon from '../../../images/edit.svg'


export default function Piece({ piece, cellWidth, pieceIndex, rowIndex, departamentID, setSomeData, board, deleteProject }) {

    const blockWidth = cellWidth || 1
    const forceUpdate = useForceUpdate();

    let ourPosition = piece.positionX * blockWidth

    const element = document.querySelectorAll('.handlers');

    const resizer = document.querySelectorAll('.resizer')




    //     for (let i = 0; i < resizer.length; i++) {
    //         const currentRightResizer = resizer[i];
    //         let original_width = 0;
    //         let original_mouse_x = 0;
    //         let original_left = 0;
    //         let piecePositionX = piece.positionX;
    //         let pieceDuration = piece.duration;
    //         let elI;
    //         if (i < 2) {
    //             elI = 0
    //         } else if (i % 2 === 0) {
    //             elI = i / 2
    //         } else {
    //             elI = Math.floor(i / 2)
    //         }

    //         currentRightResizer.addEventListener('mousedown', function (e) {
    //             e.preventDefault()
    //             original_width = parseFloat(getComputedStyle(element[elI], null).getPropertyValue('width').replace('px', ''));
    //             original_left = parseFloat(getComputedStyle(element[elI], null).getPropertyValue('left').replace('px', ''));
    //             original_mouse_x = e.pageX;
    //             console.log('mousedown',)

    //             window.addEventListener('mousemove', resize)
    //             window.addEventListener('mouseup', function (e) {
    //                 window.removeEventListener('mousemove', resize);
    //             })

    //         })



    //         function resize(e) {

    //             // console.log('resize')

    //             if (element[elI].id === `${piece.id}-dragger` && cellWidth !== 0) {


    //                 if (currentRightResizer.classList.contains('rightHandler')) {
    //                     let moveDiff = e.pageX - element[elI].getBoundingClientRect().left;
    //                     let addingWidth = Math.round(moveDiff / cellWidth)
    //                     let newWidth = addingWidth * cellWidth
    //                     // console.log('resize rightHandlers')
    //                     if (newWidth >= cellWidth) {
    //                         element[elI].style.width = newWidth + 'px';

    //                         piece.duration = addingWidth
    //                         // setSomeData(piece)
    //                     }
    //                     moveDiff = 0;
    //                     addingWidth = 0;
    //                     newWidth = 0
    //                 } else {
    //                     let moveDiff = e.pageX - original_mouse_x;
    //                     let math = Math.round(-moveDiff / cellWidth)
    //                     let addingWidth = math * cellWidth
    //                     let width = Math.round(original_width + addingWidth)

    //                     let withCellWI = Math.round(cellWidth)

    //                     if (width >= withCellWI) {
    //                         element[elI].style.width = width + 'px'
    //                         element[elI].style.left = original_left - addingWidth + 'px'

    //                         piece.positionX = piecePositionX - math
    //                         piece.duration = pieceDuration + math
    //                         // setSomeData(piece)
    //                     }
    //                     // forceUpdate()
    //                     moveDiff = 0
    //                     math = 0
    //                     addingWidth = 0
    //                     withCellWI = 0
    //                     width = 0
    //                 }
    //             }

    //         }

    //         // setTimeout(() => resize, 2000);



    //     }

    //     useEffect(() => {
    //         // console.log(board[departamentID].workers[rowIndex].projects[pieceIndex])
    //         forceUpdate()

    //         setSomeData(piece)

    //     }, [piece, board, rowIndex, departamentID])
    //     // console.log('changed')

    const [X, setX] = useState(0)
    const [Y, setY] = useState()
    const [thisId, setthisId] = useState()

    const someFunc = (e, piec) => {
        // console.log(piec)
        setthisId('')
        setX(e.clientX)

        setY(e.clientY)
        setthisId(piec)
    }
//     const deleteProject = (currentId) => {
// const data = board
//         //    board, rowIndex, departamentID,
//         data[departamentID].workers[rowIndex].projects.splice(1, 1)
//         console.log(data[departamentID].workers[rowIndex].projects)
//         // console.log()
//         deleteProject()
//     }

    if (piece) {
        // console.log(thisId)

        return (

            <Draggable
                id={`${piece.id}-dragger`}
                className="handlers"
                style={{ overflow: "visible", position: 'absolute', left: ourPosition, width: blockWidth * piece.duration, top: `${34 * piece.positionY}px` }}>
                <div className={` ${piece.type}`} >
                    <button onClick={(e) => someFunc(e, piece.id)}>
                        <div className="project">{piece.title}</div>
                        <div className="resizer leftHandler" />
                        <div className="resizer rightHandler" />
                    </button>
                    {piece.id === thisId &&


                        <div style={{ top: Y + 20, left: X - 150 }} className="editPopup">

                            <div className="buttonWrapper">
                                <div className={`cyrcleStyle popup-${piece.type}`}></div>
                                <button className="btnEdit" onClick={() => console.log('edit')}>
                                    <img src={editIcon} alt="edit-icon" />
                                </button>
                                <button className="btnDelete" onClick={() => deleteProject(pieceIndex, rowIndex, departamentID)}>
                                    <img src={deleteIcon} alt="delete-icon" />
                                </button>
                                <button className="btnClose" onClick={() => setthisId('')}>
                                    <img className="arrowIcon" src={arrowIcon} alt="close-icon" />
                                </button>
                            </div>

                            <div className="popupTitle">{piece.title}</div>

                        </div>


                    }
                </div>
            </Draggable>

        );

    }


    else { return null; }
}

