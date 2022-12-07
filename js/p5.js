let p5
let fps
let text
let textLayer
let gridLayer
let newLayer
let sampleSize = 25
let tileSize = 25
let tiles = {}
let offsetX = 0
let offsetY = 0
let xOff = 0
let yOff = 9
let canvasX = 800
let canvasY = 400
let canvas
let red = 50
let green = 255
let blue = 100
let redOff = 0
let greenOff = 3
let blueOff = 8
let textSize = 100
let colour = false
let paused = false

export function main(_p5) {
  p5 = _p5
  p5.disableFriendlyErrors = true

  // NOTE: Set up is here
  p5.setup = (_) => {
    canvas = p5.createCanvas(canvasX, canvasY)
    canvas.parent('container')
    fps = p5.createP('')

    textLayer = p5.createGraphics(canvasX, canvasY)
    gridLayer = p5.createGraphics(800, 400)
    newLayer = p5.createGraphics(canvasX, canvasY)

    canvas.mouseReleased(() => {
      if (p5.mouseX < 800 && p5.mouseY < 400) {
        paused = !paused
      }
    })
  }

  // NOTE: Draw is here
  p5.draw = (_) => {
    fps.html('FPS: ' + p5.floor(p5.frameRate()))
    p5.clear()

    if (!paused) {
      drawText()
      drawTiles()
    }

    // p5.image(gridLayer, 0, 0)
    // p5.image(textLayer, 0, 0)
    p5.image(newLayer, 0, 0)
    // p5.image(cursorLayer, 0, 0)
  }
}

export function setText(_text) {
  text = _text
  drawText()
}

export function setOffsetX(_offsetX) {
  offsetX = _offsetX
}

export function setOffsetY(_offsetY) {
  offsetY = _offsetY
}

export function setTileSize(_tileSize) {
  tileSize = parseInt(_tileSize)
}

export function setSampleSize(_sampleSize) {
  sampleSize = parseInt(_sampleSize)
}

export function setCanvasSize(_canvasX, _canvasY) {
  // p5.resizeCanvas(parseInt(_canvasX), parseInt(_canvasY))
  console.log(_canvasX)
}

export function setColour(_colour) {
  colour = _colour
}

export function downloadImage() {
  p5.saveCanvas(canvas, 'yes', 'jpg')
}

const roundNearest = (value, nearest) => Math.floor(value / nearest) * nearest

export function drawText() {
  textLayer.clear()
  textLayer.textSize(textSize)
  textLayer.textAlign(p5.CENTER, p5.CENTER)
  textLayer.background(0)
  if (colour) {
    textLayer.fill(red, green, blue)

    red = p5.noise(redOff) * 255
    green = p5.noise(greenOff) * 255
    blue = p5.noise(blueOff) * 255
  } else {
    textLayer.fill(255)
  }

  redOff += 0.002
  greenOff += 0.002
  blueOff += 0.002

  textLayer.text(text, 0, 0, canvasX, canvasY)
}

export function drawTiles() {
  newLayer.clear()
  // newLayer.background(255)
  const image = p5.createImage(canvasX, canvasY)

  // Object.keys(tiles).forEach((x) => {
  //   Object.keys(tiles[x]).forEach((y) => {
  //     if (tiles[x][y]) {
  //       newLayer.image(
  //         tiles[x][y],
  //         parseInt(x),
  //         parseInt(y),
  //         tileSize,
  //         tileSize
  //       )
  //       // xOff += 0.0001
  //       // yOff += 0.0001
  //     }
  //   })
  // })

  newLayer.background(0)

  const maxOffset = tileSize

  for (let y = 0; y < canvasY; y += tileSize) {
    for (let x = 0; x < canvasX; x += tileSize) {
      const source = {
        x: roundNearest(x, sampleSize),
        y: roundNearest(y, sampleSize),
      }

      const offsetSource = {
        x: p5.mouseX,
        y: p5.mouseY,
      }

      const offsetIndexX = offsetSource.x / (canvasX / 2) - 1
      const offsetIndexY = offsetSource.y / (canvasY / 2) - 1

      const maxOffsetX = -offsetIndexX * (sampleSize * 40)
      const maxOffsetY = -offsetIndexY * (sampleSize * 40)

      offsetX = ((x - canvasX / 2) / canvasX) * maxOffsetX
      offsetY = ((y - canvasY / 2) / canvasY) * maxOffsetY

      newLayer.image(
        textLayer,
        x,
        y,
        tileSize,
        tileSize,
        source.x + offsetX,
        source.y + offsetY,
        sampleSize,
        sampleSize
      )

      xOff += (sampleSize / canvasX) * 0.00001
      yOff += (sampleSize / canvasY) * 0.00001
    }
  }
}

// export function copyTiles() {
//   const emptyObj = {}
//   tiles = emptyObj
//   for (let i = 0; i < 400 / tileSize; i++) {
//     for (let j = 0; j < 800 / tileSize; j++) {
//       let tileImage = p5.createImage(tileSize, tileSize)
//       tileImage.copy(
//         textLayer,
//         (Math.floor(j / 2) + 1) * tileSize - offsetX * j,
//         (Math.floor(i / 2) + 1) * tileSize - offsetY * i,
//         tileSize,
//         tileSize,
//         0,
//         0,
//         tileSize,
//         tileSize
//       )

//       const x = j * tileSize
//       const y = i * tileSize

//       if (tiles[x]) {
//         if (tiles[x][y]) {
//           tiles[x][y] = tileImage
//         } else {
//           tiles[x] = {
//             ...tiles[x],
//             [y]: tileImage,
//           }
//         }
//       } else {
//         tiles = {
//           ...tiles,
//           [x]: { [y]: tileImage },
//         }
//       }
//     }
//   }
// }
