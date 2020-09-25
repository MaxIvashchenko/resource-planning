import React from 'react'

export default function Lines({ index, cellWidth }) {
    const indexs = index + 1

    console.log('rerender Lines' )
    return (
        <div  className='svgLines' style={{ 'right': `${cellWidth * indexs+20}px` }}>

            <svg   width='1px' height="100%" version="1.1" >

                <line x1="0" y1="100%" stroke="black" fill="transparent" strokeDasharray="4" strokeWidth="1" />
                <line x1="100%" y1="100%" stroke="black" fill="transparent" strokeDasharray="4" strokeWidth="1" />


            </svg>
        </div>
    )

}
