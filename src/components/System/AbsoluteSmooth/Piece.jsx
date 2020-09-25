import React, { useState } from 'react'
import { Draggable } from 'react-smooth-dnd';


export default function Piece({ piece, daysNumber, cellWidth }) {


    const blockWidth = cellWidth || 1

    const element = document.querySelectorAll('.handlers');
    const rightHandlers = document.querySelectorAll('.rightHandler')
    const leftHandlers = document.querySelectorAll('.leftHandler')
    const resizer = document.querySelectorAll('.resizer')
    let ourPosition = piece.positionX * blockWidth

    for (let i = 0; i < resizer.length; i++) {
        const currentResizer = resizer[i];

        function deleteDragger() {
            [...element].map(v => v.classList.remove("smooth-dnd-draggable-wrapper"))
        }
        function addDragger() {
            [...element].map(v => v.classList.add("smooth-dnd-draggable-wrapper"))
        }

        currentResizer.addEventListener('mouseover', deleteDragger)
        currentResizer.addEventListener('mouseout', addDragger)
    }

    function stopResize(resize) {
        window.removeEventListener('mousemove', resize);
        console.log(' stopResize')
    }

    for (let i = 0; i < rightHandlers.length; i++) {
        const currentRightResizer = rightHandlers[i];
        // currentRightResizer.addEventListener('mouseover',  )


        currentRightResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', () => stopResize(resize))
        })
        function resize(e) {

            if (currentRightResizer.classList.contains('rightHandler')&& cellWidth!==0) {
                let moveDiff = e.pageX - element[i].getBoundingClientRect().left;
                let addingWidth = Math.round(moveDiff / cellWidth)
                let newWidth = addingWidth * cellWidth

                element[i].style.width = newWidth + 'px';
            }
        }


    }



    for (let i = 0; i < leftHandlers.length; i++) {
        const currentLeftResizer = leftHandlers[i];
        let original_width = 0;
        let original_mouse_x = 0;
        let original_left = 0;
        const minimum_size = cellWidth;
        currentLeftResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()

            original_width = parseFloat(getComputedStyle(element[i], null).getPropertyValue('width').replace('px', ''));
            original_left = parseFloat(getComputedStyle(element[i], null).getPropertyValue('left').replace('px', ''));

            original_mouse_x = e.pageX;

            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', () => stopResize(resize))
        })

        function resize(e) {

            if (currentLeftResizer.classList.contains('leftHandler')&& cellWidth!==0) {

                let moveDiff = e.pageX - original_mouse_x;
                let addingWidth = Math.round(-moveDiff / cellWidth)*cellWidth

                const width = original_width + addingWidth 



                if (width > minimum_size) {
                    element[i].style.width = width + 'px'
                    element[i].style.left = original_left - addingWidth + 'px'
                }


            }
        }


    }

    if (piece) {

        return (

            <Draggable
                id={`${piece.id}-dragger`}
                className="handlers" disabled={true} style={{ overflow: "visible", position: 'absolute', left: ourPosition, width: blockWidth }}>
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

