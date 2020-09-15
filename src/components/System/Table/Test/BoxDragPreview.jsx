import React, { useEffect, useState, memo } from 'react'
import { Box } from './Box'
 
export const BoxDragPreview = memo(({ title, sizeComponent,daysNumber,duration }) => {

  const [tickTock, setTickTock] = useState(false)
  useEffect(
    function subscribeToIntervalTick() {
      const interval = setInterval(() => setTickTock(!tickTock), 500)
      return () => clearInterval(interval)
    },
    [tickTock],
  )
  return (
    <div style={{width:  sizeComponent/daysNumber*duration}}  > 
      <Box title={title} duration={duration} yellow={tickTock} cellWidth={sizeComponent/daysNumber}/>
    </div>
  )
})
