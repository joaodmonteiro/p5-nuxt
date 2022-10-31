import { getNoiseColor, setGradient } from './noiseColor'

let p5
let color
let size
let pencil
let noise
let xoff = 0
let yoff = 0
let fps
let diyPencilPositions = {}
let brushSize = 50
let stroke

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
    fps = p5.createP('')
  }
  // NOTE: Draw is here
  p5.draw = (_) => {
    fps.html('FPS: ' + p5.floor(p5.frameRate()))

    if (p5.frameCount === 1) {
      squares.forEach((sq) => {
        p5.stroke(200)
        p5.fill(255)
        p5.square(sq[0], sq[1], squareWidth)
      })
    }

    let square = {}
    const heart = {}
    const smile = {}
    const checkers = {}
    const diagonal = {}
    const houndstooth = {}
    const diy = {}
    const circle = {}
    const triangle = {}

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
            break
          case 'diagonal':
            diagonal.x = roundNearest(p5.mouseX, size)
            diagonal.y = roundNearest(p5.mouseY, size)
            diagonal.color = color
            diagonal.size = size
            break
          case 'houndstooth':
            houndstooth.x = roundNearest(p5.mouseX, 60)
            houndstooth.y = roundNearest(p5.mouseY, 60)
            houndstooth.color = color
            // houndstooth.size = size
            break
          case 'circle':
            circle.x = roundNearest(p5.mouseX, size)
            circle.y = roundNearest(p5.mouseY, size)
            circle.color = color
            circle.size = size
            break
          case 'triangle':
            triangle.x = roundNearest(p5.mouseX, size)
            triangle.y = roundNearest(p5.mouseY, size)
            triangle.color = color
            triangle.size = size
            break
          case 'diy':
            diy.x = roundNearest(p5.mouseX, brushSize)
            diy.y = roundNearest(p5.mouseY, brushSize)
            diy.color = color
            break
        }
      }
    }
    if (Object.keys(square).length !== 0) {
      paintSquare(square)
      square = {}
    }

    if (Object.keys(checkers).length !== 0) {
      paintCheckers(checkers)
    }

    if (Object.keys(diagonal).length !== 0) {
      paintDiagonal(diagonal)
    }

    if (Object.keys(heart).length !== 0) {
      paintHeart(heart)
    }

    if (Object.keys(smile).length !== 0) {
      paintSmile(smile)
    }

    if (Object.keys(houndstooth).length !== 0) {
      paintHoundstooth(houndstooth)
    }

    if (Object.keys(circle).length !== 0) {
      paintCircle(circle)
    }

    if (Object.keys(triangle).length !== 0) {
      paintTriangle(triangle)
      console.log(triangle)
    }

    if (Object.keys(diy).length !== 0) {
      paintDiy(diy)
    }
  }
}

const roundNearest = (value, nearest) => Math.floor(value / nearest) * nearest

export function setColor(_color) {
  color = _color
}

export function setSize(_size) {
  size = parseInt(_size)
}

export function setStroke(_stroke) {
  stroke = _stroke
}

export function setPencil(_pencil) {
  pencil = _pencil
}

export function setNoise(_noise) {
  noise = _noise
}

export function setDiyPositions(_diyPencilPositions) {
  diyPencilPositions = _diyPencilPositions
}

export function setBrushSize(_brushSize) {
  brushSize = _brushSize * 10
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
    if (!stroke) {
      p5.noStroke()
    } else {
      p5.stroke(0)
    }
    if (noise) {
      p5.fill(
        getNoiseColor(
          p5,
          color,
          heart.x + position[0] * 10,
          heart.y + position[1] * 10
        )
      )
    } else {
      p5.fill(heart.color)
    }
    p5.square(heart.x + position[0] * 10, heart.y + position[1] * 10, 10)
  })
}

function paintSquare(square) {
  if (!stroke) {
    p5.noStroke()
  } else {
    p5.stroke(0)
  }
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
    if (!stroke) {
      p5.noStroke()
    } else {
      p5.stroke(0)
    }
    p5.fill(smile.color)
    p5.square(smile.x + position[0] * 10, smile.y + position[1] * 10, 10)
  })
}

function paintCheckers(checkers) {
  let on = true

  let xoff = 0
  for (let i = 0; i < checkers.size / 10; i++) {
    let yoff = 0
    for (let j = 0; j < checkers.size / 10; j++) {
      if (on) {
        if (!stroke) {
          p5.noStroke()
        } else {
          p5.stroke(0)
        }
        if (noise) {
          p5.fill(
            getNoiseColor(p5, color, checkers.x + i * 10, checkers.y + j * 10)
          )
        } else {
          p5.fill(color)
        }
        p5.square(checkers.x + i * 10, checkers.y + j * 10, 10)
      }
      if (j !== 9) {
        on = !on
      }
      yoff += 0.01
    }
    xoff += 0.01
  }
}

function paintDiagonal(diagonal) {
  let on = true
  for (let i = 0; i < diagonal.size / 10; i++) {
    for (let j = 0; j < diagonal.size / 10; j++) {
      if (i === j) {
        if (!stroke) {
          p5.noStroke()
        } else {
          p5.stroke(0)
        }
        if (noise) {
          p5.fill(
            getNoiseColor(
              p5,
              diagonal.color,
              diagonal.x + i * 10,
              diagonal.y + j * 10
            )
          )
        } else {
          p5.fill(diagonal.color)
        }
        p5.square(diagonal.x + i * 10, diagonal.y + j * 10, 10)
      }
    }
  }
}

function paintHoundstooth(houndstooth) {
  const houndstoothPositions = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 4],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 5],
    [3, 0],
    [3, 2],
    [4, 1],
    [5, 2],
  ]

  houndstoothPositions.forEach((position) => {
    if (!stroke) {
      p5.noStroke()
    } else {
      p5.stroke(0)
    }
    if (noise) {
      p5.fill(
        getNoiseColor(p5, houndstooth.color, houndstooth.x, houndstooth.y)
      )
    } else {
      p5.fill(houndstooth.color)
    }
    p5.square(
      houndstooth.x + position[0] * 10,
      houndstooth.y + position[1] * 10,
      10
    )
  })
}

function paintCircle(circle) {
  if (!stroke) {
    p5.noStroke()
  } else {
    p5.stroke(0)
  }
  p5.fill(circle.color)
  p5.ellipse(
    circle.x + circle.size / 2,
    circle.y + circle.size / 2,
    circle.size,
    circle.size
  )
}

function paintTriangle(triangle) {
  if (!stroke) {
    p5.noStroke()
  } else {
    p5.stroke(0)
  }
  p5.fill(triangle.color)
  p5.triangle(
    triangle.x,
    triangle.y + triangle.size,
    triangle.x + triangle.size / 2,
    triangle.y,
    triangle.x + triangle.size,
    triangle.y + triangle.size
  )

  console.log(
    triangle.x,
    triangle.y + triangle.size,
    triangle.x + triangle.size / 2,
    triangle.y,
    triangle.x + triangle.size,
    triangle.y + triangle.size
  )
}

function paintDiy(diy) {
  if (Object.keys(diyPencilPositions).length === 0) return

  Object.keys(diyPencilPositions).forEach((y) => {
    if (Object.keys(diyPencilPositions[y]).length === 0) return
    Object.keys(diyPencilPositions[y]).forEach((x) => {
      if (diyPencilPositions[y][x] === true) {
        if (!stroke) {
          p5.noStroke()
        } else {
          p5.stroke(0)
        }
        if (noise) {
          p5.fill(getNoiseColor(p5, diy.color, diy.x + x * 10, diy.y + y * 10))
        } else {
          p5.fill(diy.color)
        }

        p5.square(diy.x + x * 10, diy.y + y * 10, 10)
      }
    })
  })
}

export function clearCanvas() {
  const squareWidth = 10
  const squares = []

  for (let i = 0; i < 60; i++) {
    for (let j = 0; j < 60; j++) {
      squares.push([i * squareWidth, j * squareWidth])
    }
  }

  squares.forEach((sq) => {
    p5.stroke(200)
    p5.fill(255)
    p5.square(sq[0], sq[1], squareWidth)
  })
}
