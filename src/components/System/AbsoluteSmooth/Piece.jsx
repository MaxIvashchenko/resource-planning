import React from 'react'
import { Draggable } from 'react-smooth-dnd';


export default function Piece({ piece, daysNumber }) {
    const element = document.querySelector('.handlers');
    const resizers = document.querySelectorAll('.rightHandler')
    console.log(resizers)
    for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i];
        currentResizer.addEventListener('mousedown', function (e) {
            e.preventDefault()
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })
        function resize(e) {
            if (currentResizer.classList.contains('rightHandler')) {
                element.style.width = e.pageX - element.getBoundingClientRect().left + 'px'
            }
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }

    if (piece) {
        return (
            // <div
                <Draggable 
                key={piece.id + "-draggable"} style={{ overflow: "visible", position: 'absolute', left: piece.left, width: `${100 / daysNumber}%` }}>
                <div className={`handlers ${piece.type}`} >
                    <div className="project">{piece.title}</div>
                    <div className="resizer leftHandler" />
                    <div className="resizer rightHandler" />
                </div>
                </Draggable>
            // </div>
        );
    } else { return null; }
}

