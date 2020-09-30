import React, { useEffect } from 'react'
import { Draggable } from 'react-smooth-dnd';

const element = document.querySelectorAll('.handlers');
const resizer = document.querySelectorAll('.resizer')


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

export default function Piece({ piece, cellWidth, pieceIndex, rowIndex, departamentID, setSomeData, board }) {

    const blockWidth = cellWidth || 1

    let ourPosition = piece.positionX * blockWidth

    const element = document.querySelectorAll('.handlers');

    const resizer = document.querySelectorAll('.resizer')



    for (let i = 0; i < resizer.length; i++) {
        const currentRightResizer = resizer[i];
        let original_width = 0;
        let original_mouse_x = 0;
        let original_left = 0;
        let piecePositionX = piece.positionX;
        let pieceDuration = piece.duration;
        let elI;
        if (i < 2) {
            elI = 0
        } else if (i % 2 === 0) {
            elI = i / 2
        } else {
            elI = Math.floor(i / 2)
        }

        currentRightResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(element[elI], null).getPropertyValue('width').replace('px', ''));
            original_left = parseFloat(getComputedStyle(element[elI], null).getPropertyValue('left').replace('px', ''));
            original_mouse_x = e.pageX;
            console.log('mousedown')

            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', function (e) { window.removeEventListener('mousemove', resize) })
        })


        function resize(e) {

            console.log('resize')

            if (element[elI].id === `${piece.id}-dragger` && cellWidth !== 0) {


                if (currentRightResizer.classList.contains('rightHandler')) {

                    let moveDiff = e.pageX - element[elI].getBoundingClientRect().left;
                    console.log(moveDiff)
                    let addingWidth = Math.round(moveDiff / cellWidth)
                    let newWidth = addingWidth * cellWidth
                    // console.log('resize rightHandlers')
                    if (newWidth >= cellWidth) {
                        element[elI].style.width = newWidth + 'px';
                        
                        piece.duration = addingWidth
                        setSomeData(piece)
                    }


                } else {
                    let moveDiff = e.pageX - original_mouse_x;
                    let math = Math.round(-moveDiff / cellWidth)
                    let addingWidth = math * cellWidth
                    const width = Math.round(original_width + addingWidth)

                    let withCellWI = Math.round(cellWidth)

                    if (width >= withCellWI) {
                        element[elI].style.width = width + 'px'
                        element[elI].style.left = original_left - addingWidth + 'px'

                        piece.positionX = piecePositionX - math
                        piece.duration = pieceDuration + math
                        setSomeData(piece)
                    }
                }
            }
        }

        // setTimeout(() => resize, 2000);



    }

    useEffect(() => {
        // console.log(board[departamentID].workers[rowIndex].projects[pieceIndex])

        setSomeData(board)

    }, [piece, rowIndex, departamentID])
    // console.log('changed')


    if (piece) {

        return (

            <Draggable
                id={`${piece.id}-dragger`}
                className="handlers"  
                style={{ overflow: "visible", position: 'absolute', left: ourPosition, width: blockWidth * piece.duration, top: `${ 34*piece.positionY}px` }}>
                <div className={` ${piece.type}`} >
                    <div className="project">{piece.title}</div>
                    <div className="resizer leftHandler" />
                    <div className="resizer rightHandler" />
                </div>
            </Draggable>

        );

    }


    else { return null; }
}

