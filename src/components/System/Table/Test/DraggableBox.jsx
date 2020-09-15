import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { getEmptyImage } from 'react-dnd-html5-backend'
import { Box } from './Box'

function getStyles(left, top, isDragging, cellWidth) {
  const transform = `translate3d(${left}px, ${top}px, 0)`
  return {
    position: 'absolute',
    transform,
    width: cellWidth,
    WebkitTransform: transform,
    opacity: isDragging ? 0.6 : 1,
    height: isDragging ? 1 : '',
  }
}

export const DraggableBox = ({ id, title, left, top, cellWidth, duration, position, row }) => {


  const [{ isDragging }, drag, preview] = useDrag(
    {
    item: { id, left, top:0, duration, title,position, row, type: ItemTypes.BOX },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin(monitor) {    }
  })

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  })


  return (
    // <div style={{ width: cellWidth * duration, margin: "0 auto" }}>

    <div ref={drag} style={getStyles(left, top, isDragging, cellWidth * duration,)}>

      <Box title={title} duration={duration} cellWidth={cellWidth}/>
      
    </div>
    // </div>
  )
}
