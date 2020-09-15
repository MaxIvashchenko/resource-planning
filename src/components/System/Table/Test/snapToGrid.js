export function snapToGrid(x, y = 0, width, ) {

    const snappedX = Math.round(x / width) * width

    const snappedY = Math.round(y / 40) * 40


    return [snappedX, snappedY]
  }
  