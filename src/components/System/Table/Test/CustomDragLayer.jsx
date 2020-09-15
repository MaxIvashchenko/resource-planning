import React from 'react'
import { useDragLayer } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { BoxDragPreview } from './BoxDragPreview'
import { snapToGrid } from './snapToGrid'
import sizeMe from 'react-sizeme'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}



function CustomDragLayer(props) {

  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,

  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }))


  function getItemStyles(initialOffset, currentOffset) {
    // console.log('getItemStyles',initialOffset, currentOffset)
    if (!initialOffset || !currentOffset) {
      return {
        display: 'none',
      }
    }
  
    let { x, y } = currentOffset

      x -= initialOffset.x
      y -= initialOffset.y
      // console.log('before =',x,y)
        ;[x, y] = snapToGrid(x, y, props.size.width/props.daysNumber)
      x += initialOffset.x
      y += initialOffset.y
      // console.log('after =',x,y)



    const transform = `translate(${x}px, ${y}px)`
    return {
      transform,
      WebkitTransform: transform,
    }
  }

 
  if (!isDragging) { return null }



  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(initialOffset, currentOffset, props.snapToGrid)}
      >
        <BoxDragPreview sizeComponent={ props.size.width} daysNumber={ props.daysNumber} title={item.title} duration={item.duration}/>
      </div>
    </div>
  )
}


export default sizeMe()(CustomDragLayer)