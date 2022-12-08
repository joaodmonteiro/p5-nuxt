let p5
let fps
let text
let textLayer
let gridLayer
let newLayer
let sampleSizeX
let sampleSizeY
let tileSizeX
let tileSizeY
let offsetX = 0
let offsetY = 0
let xOff = 0
let yOff = 9
let canvasX = 1025
let canvasY = 768
let canvas
let red = 50
let green = 255
let blue = 100
let redOff = 0
let greenOff = 3
let blueOff = 8
let fontSize = 100
let colour = false
let paused = true
let mouseX = canvasX / 2
let mouseY = canvasY / 2
let pixelDensity
let grid = true

export function main(_p5) {
  p5 = _p5
  p5.disableFriendlyErrors = true

  // NOTE: Set up is here
  p5.setup = (_) => {
    pixelDensity = p5.pixelDensity()
    canvas = p5.createCanvas(canvasX, canvasY)
    canvas.parent('container')
    fps = p5.createP('')

    textLayer = p5.createGraphics(canvasX, canvasY)
    gridLayer = p5.createGraphics(canvasX, canvasY)
    newLayer = p5.createGraphics(canvasX, canvasY)

    canvas.mouseReleased(() => {
      if (p5.mouseX < canvasX && p5.mouseY < canvasY) {
        paused = !paused
      }
    })
  }

  // NOTE: Draw is here
  p5.draw = (_) => {
    fps.html('FPS: ' + p5.floor(p5.frameRate()))
    p5.clear()

    if (!paused) {
      mouseX = p5.mouseX
      mouseY = p5.mouseY
    }

    drawText()
    drawTiles()

    p5.image(newLayer, 0, 0)
    if (grid) {
      drawGrid()
      p5.image(gridLayer, 0, 0)
    }

    // p5.image(textLayer, 0, 0)
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
  tileSizeX = canvasX / parseInt(_tileSize)
  tileSizeY = canvasY / parseInt(_tileSize)
}

export function setSampleSize(_sampleSize) {
  sampleSizeX = canvasX / parseInt(_sampleSize)
  sampleSizeY = canvasY / parseInt(_sampleSize)
}

export function setColour(_colour) {
  colour = _colour
}

export function setFontSize(_fontSize) {
  fontSize = parseInt(_fontSize)
}

export function setGrid(_grid) {
  grid = _grid
}

export function downloadImage() {
  p5.pixelDensity(1)
  p5.saveCanvas(canvas, 'yes', 'jpg')
  p5.pixelDensity(pixelDensity)
}

const roundNearest = (value, nearest) => Math.floor(value / nearest) * nearest

export function drawText() {
  textLayer.clear()
  textLayer.textLeading(fontSize)
  textLayer.textSize(fontSize)
  textLayer.textAlign(p5.CENTER, p5.CENTER)
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

  const maxOffsetX = tileSizeX
  const maxOffsetY = tileSizeY

  for (let y = 0; y < canvasY; y += tileSizeY) {
    for (let x = 0; x < canvasX; x += tileSizeX) {
      const source = {
        x: roundNearest(x + tileSizeX / 2, sampleSizeX),
        y: roundNearest(y + tileSizeY / 2, sampleSizeY),
      }

      const offsetSource = {
        x: mouseX,
        y: mouseY,
      }

      const offsetIndexX = offsetSource.x / (canvasX / 2) - 1
      const offsetIndexY = offsetSource.y / (canvasY / 2) - 1

      // offsetX = ((x - canvasX / 2) / canvasX) * maxOffsetX
      // offsetY = ((y - canvasY / 2) / canvasY) * maxOffsetY

      const centerX = x + tileSizeX / 2
      const centerY = y + tileSizeY / 2

      offsetX = -(offsetIndexX * (centerX - canvasX / 2)) * 2.5
      offsetY = -(offsetIndexY * (centerY - canvasY / 2)) * 2.5

      newLayer.image(
        textLayer,
        x,
        y,
        tileSizeX,
        tileSizeY,
        source.x + offsetX,
        source.y + offsetY,
        sampleSizeX,
        sampleSizeY
      )

      xOff += (sampleSizeX / canvasX) * 0.00001
      yOff += (sampleSizeY / canvasY) * 0.00001
    }
  }
}

export function drawGrid() {
  gridLayer.clear()
  for (let y = 0; y < canvasY; y += tileSizeY) {
    for (let x = 0; x < canvasX; x += tileSizeX) {
      gridLayer.noFill()
      gridLayer.stroke(50)
      gridLayer.rect(x, y, tileSizeX, tileSizeY)
    }
  }

  for (let y = 0; y < canvasY; y += sampleSizeY) {
    for (let x = 0; x < canvasX; x += sampleSizeX) {
      gridLayer.noFill()
      gridLayer.stroke(255, 0, 0, 0.1)
      gridLayer.rect(x, y, sampleSizeX, sampleSizeY)
    }
  }
}
