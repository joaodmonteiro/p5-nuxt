let p5
let color
export function main(_p5) {
  p5 = _p5

  let squaresToPaint = []

  const squareWidth = 20
  const squares = []

  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 30; j++) {
      squares.push([i * squareWidth, j * squareWidth])
    }
  }

  // NOTE: Set up is here
  p5.setup = (_) => {
    const canvas = p5.createCanvas(600, 600)
    canvas.parent('container')
    console.log($nuxt)
  }
  // NOTE: Draw is here
  p5.draw = (_) => {
    squares.forEach((sq) => {
      p5.fill(255)
      p5.square(sq[0], sq[1], squareWidth)
    })

    if (p5.mouseIsPressed) {
      if (0 < p5.mouseX < 600 && 0 < p5.mouseY < 600) {
        const newSq = squares.find((sq, index) => {
          if (
            sq[0] <= p5.mouseX &&
            sq[1] <= p5.mouseY &&
            sq[0] + squareWidth > p5.mouseX &&
            sq[1] + squareWidth > p5.mouseY
          ) {
            return true
          }
          return false
        })

        if (newSq) {
          const square = {
            x: newSq[0],
            y: newSq[1],
            color: color,
          }
          squaresToPaint.push(square)
        }
      }
    }

    if (squaresToPaint) {
      squaresToPaint.forEach((sq) => {
        p5.fill(sq.color)
        p5.square(sq.x, sq.y, squareWidth)
      })
    }
  }
}

export function setColor(_color) {
  color = _color
}
