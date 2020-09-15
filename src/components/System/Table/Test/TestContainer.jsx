import React, { useCallback, useState } from 'react'
import { useDrop, useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { DraggableBox } from './DraggableBox'

import Lines from './Lines'
import sizeMe from 'react-sizeme'
// import { Resizable, ResizableBox } from 'react-resizable';

function TestContainer(props) {
  const { days, daysNumber } = props

  const cellWidth = props.size.width / props.daysNumber;
  const cellHeight = 40;

  const [boxes, setBoxes] = useState(
    [
      [],
      [],
      [
        { id: 'row0 cell0', top: 0, left: cellWidth * 2, title: 'row 0 - el 1', duration: 2, position: 1 },
        { id: 'row0 cell1', top: cellHeight, left: 0, title: 'row 0 - el 2', duration: 3, position: 2 }
      ],
      [
        // { id: 'row1 cell0', top: 0, left: cellWidth * 5, title: 'row 1 - el 1', duration: 1 },
        // { id: 'row1 cell1', top: 0, left: cellWidth, title: 'row 1 - el 2', duration: 1 }
      ],
      [],
      [
        { id: 'row3 cell0', top: 0, left: cellWidth * 3, title: 'row 3 - el 1', duration: 1 }
      ],
      [], [], [], [],
    ]
  )

  const [sections, setSections] = useState(
    [
      [], [], [], [],

    ]
  )

  let quantityInRowArr = boxes.map(box => {
    box.reduce((acc, current) => {
      if (!acc.includes(current.top)) {
        acc.push(current.top);
      }
      return acc;
    }, [])
    if (box.length < 1) return 1
    return box.length
  })

  const moveBox = useCallback(
    (item, left, moveToRow) => {
      const itemId = item.id
      const rowIndex = item.row

      if (moveToRow < 0) {
        const stepsMade = quantityInRowArr.splice(rowIndex + moveToRow, -moveToRow)
        const isEqual = stepsMade.reduce((a, b) => a + b, 0)

        item.row = (moveToRow === isEqual) ? item.row + moveToRow : item.row + moveToRow + (isEqual + moveToRow)

      } else {
        const stepsMade = quantityInRowArr.splice(rowIndex, moveToRow)
        const isEqual = stepsMade.reduce((a, b) => a + b, 0)

        item.row = (moveToRow === isEqual) ? item.row + moveToRow : item.row + moveToRow - (isEqual - moveToRow)
      }
 
      item.left = left
      item.top = 0
 
      const editCoordinations = [...boxes].map((box, newBoxesIndex) => {
        if (newBoxesIndex === rowIndex) {
          return box.map((cell, i) => {
            return (itemId === cell.id) ? item : cell
          })
        } else {
          return box
        }
      })

      const newBoxes = editCoordinations.map((box, boxRow) => {
        return (boxRow === rowIndex) ? box.filter(cell => cell.id !== itemId) : box
      })
      newBoxes.map((box, boxRow) => (boxRow === item.row) ? box.push(item) : box)


      newBoxes[item.row].map(el => {
        const draggingLeft = item.left
        const draggingRight = item.left + cellWidth * item.duration
        const esixtLeft = el.left
        const existRight = el.left + cellWidth * el.duration
        // console.log(draggingLeft,draggingRight)
        if (item.id !== el.id) {
          if (((draggingLeft <= esixtLeft || draggingLeft >= esixtLeft) && draggingLeft < existRight && esixtLeft < draggingRight) || draggingLeft >= esixtLeft && draggingRight <= existRight) {
            console.log('-----------  ЗОНЕ -----------')

          } else {
            console.log('----------- НЕ в ЗОНЕ -----------')
            
          }
        }
      })

      setBoxes(newBoxes)

    },

  )


  const [, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      // console.log('drop')
      const delta = monitor.getDifferenceFromInitialOffset()

      let left = Math.round((item.left + delta.x) / cellWidth) * cellWidth
      let moveToRow = Math.round((item.top + delta.y) / cellHeight)

      moveBox(item, left, moveToRow)

      return undefined
    },

  })



  const renderBox = (item, key, boxIndex) => {
    return (
      <DraggableBox
        cellWidth={cellWidth}
        row={boxIndex}
        key={key}
        id={key}
        {...item}
      />
    )
  }


  quantityInRowArr = boxes.map(box => {
    box.reduce((acc, current) => {
      if (!acc.includes(current.top)) {
        acc.push(current.top);
      }
      return acc;
    }, [])
    if (box.length < 1) return 1
    return box.length
  })
  // console.log(quantityInRowArr)

  // console.log(boxes)
  return (

    <div ref={drop} style={{ height: "100%", width: "100%", position: "relative" }}>
      {boxes.map((box, boxIndex) => {


        let heightCell = quantityInRowArr[boxIndex]

        return (
          <div className="box" style={{ height: cellHeight * heightCell }} key={box + boxIndex}>
            <Lines days={days} daysNumber={daysNumber} />
            {box.map((cell, i) => renderBox(cell, cell.id, boxIndex, cell.duration))}
          </div>
        )
      })}
    </div>

  )
}

export default sizeMe()(TestContainer)

