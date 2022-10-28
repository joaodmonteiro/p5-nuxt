let p5
let color
let size
let pencil
export function main(_p5) {
  p5 = _p5

  const squareWidth = 10
  const squares = []

  for (let i = 0; i < 60; i++) {
    for (let j = 0; j < 60; j++) {
      squares.push([i * squareWidth, j * squareWidth])
    }
  }

  // NOTE: Set up is here
  p5.setup = (_) => {
    const canvas = p5.createCanvas(600, 600)
    canvas.parent('container')
  }
  // NOTE: Draw is here
  p5.draw = (_) => {
    if (p5.frameCount === 1) {
      squares.forEach((sq) => {
        p5.stroke(200)
        p5.fill(255)
        p5.square(sq[0], sq[1], squareWidth)
      })
    }

    const square = {}
    const heart = {}
    const smile = {}
    const checkers = {}

    if (p5.mouseIsPressed) {
      if (0 < p5.mouseX < 600 && 0 < p5.mouseY < 600) {
        switch (pencil) {
          case 'square':
            square.x = roundNearest(p5.mouseX, size)
            square.y = roundNearest(p5.mouseY, size)
            square.color = color
            square.size = size
            break
          case 'heart':
            heart.x = roundNearest(p5.mouseX, 50)
            heart.y = roundNearest(p5.mouseY, 50)
            heart.color = color
            break
          case 'smile':
            smile.x = roundNearest(p5.mouseX, 50)
            smile.y = roundNearest(p5.mouseY, 60)
            smile.color = color
            break
          case 'checkers':
            checkers.x = roundNearest(p5.mouseX, size)
            checkers.y = roundNearest(p5.mouseY, size)
            checkers.color = color
            checkers.size = size
        }
      }
    }
    if (Object.keys(square).length !== 0) {
      paintSquare(square)
    }

    if (Object.keys(checkers).length !== 0) {
      paintCheckers(checkers)
    }
    if (Object.keys(heart).length !== 0) {
      paintHeart(heart)
    }

    if (Object.keys(smile).length !== 0) {
      paintSmile(smile)
    }
  }
}

const roundNearest = (value, nearest) => Math.floor(value / nearest) * nearest

export function setColor(_color) {
  color = _color
}

export function setSize(_size) {
  size = _size
}

export function setPencil(_pencil) {
  pencil = _pencil
}

function paintHeart(heart) {
  const heartPositions = [
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 1],
    [4, 2],
  ]
  heartPositions.forEach((position) => {
    p5.stroke(0)
    p5.fill(heart.color)
    p5.square(heart.x + position[0] * 10, heart.y + position[1] * 10, 10)
  })
}

function paintSquare(square) {
  p5.stroke(0)
  p5.fill(square.color)
  p5.square(square.x, square.y, square.size)
}

function paintSmile(smile) {
  const smilePositions = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 1],
    [1, 3],
    [1, 5],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 5],
    [3, 1],
    [3, 3],
    [3, 5],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [4, 5],
  ]

  smilePositions.forEach((position) => {
    p5.stroke(0)
    p5.fill(smile.color)
    p5.square(smile.x + position[0] * 10, smile.y + position[1] * 10, 10)
  })
}

function paintCheckers(checkers) {
  let on = true
  for (let i = 0; i < checkers.size / 10; i++) {
    for (let j = 0; j < checkers.size / 10; j++) {
      if (on) {
        p5.stroke(0)
        p5.fill(checkers.color)
        p5.square(checkers.x + i * 10, checkers.y + j * 10, 10)
      }
      if (j !== 9) {
        on = !on
      }
    }
  }
}
