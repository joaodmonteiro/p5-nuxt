let p5
let fps
let text
let textLayer
let gridLayer
let newLayer
let tileSize = 50
let tiles = {}
let offsetX = 0
let offsetY = 0
let xOff = 0
let yOff = 0

export function main(_p5) {
  p5 = _p5
  p5.disableFriendlyErrors = true

  // NOTE: Set up is here
  p5.setup = (_) => {
    const canvas = p5.createCanvas(800, 600)
    canvas.parent('container')
    fps = p5.createP('')

    textLayer = p5.createGraphics(400, 200)
    gridLayer = p5.createGraphics(400, 200)
    newLayer = p5.createGraphics(800, 400)
  }

  // NOTE: Draw is here
  p5.draw = (_) => {
    fps.html('FPS: ' + p5.floor(p5.frameRate()))
    p5.clear()

    for (let i = 0; i < 200 - tileSize; i++) {
      for (let j = 0; j < 400 - tileSize; j++) {
        gridLayer.square(i * tileSize, j * tileSize, tileSize)
      }
    }

    textLayer.clear()
    textLayer.textSize(50)
    textLayer.fill(0)
    textLayer.text(text, 0, 0, 400, 400)

    drawTiles(p5)

    p5.image(gridLayer, 0, 0)
    p5.image(textLayer, 0, 0)
    p5.image(newLayer, 0, 200)
    // p5.image(cursorLayer, 0, 0)
  }
}

export function setText(_text) {
  text = _text
}

export function setOffsetX(_offsetX) {
  offsetX = _offsetX
}

export function setOffsetY(_offsetY) {
  offsetY = _offsetY
}

export function setTileSize(_tileSize) {
  tileSize = _tileSize
}

const roundNearest = (value, nearest) => Math.floor(value / nearest) * nearest

export function drawTiles() {
  newLayer.clear()
  // newLayer.background(255)
  Object.keys(tiles).forEach((x) => {
    Object.keys(tiles[x]).forEach((y) => {
      if (tiles[x][y]) {
        newLayer.image(
          tiles[x][y],
          parseInt(x),
          parseInt(y),
          tileSize,
          tileSize
        )
        // xOff += 0.0001
        // yOff += 0.0001
      }
    })
  })
}

export function copyTiles() {
  const emptyObj = {}
  tiles = emptyObj
  for (let i = 0; i < 400 / tileSize; i++) {
    for (let j = 0; j < 800 / tileSize; j++) {
      let tileImage = p5.createImage(tileSize, tileSize)
      tileImage.copy(
        textLayer,
        (Math.floor(j / 2) + 1) * tileSize - offsetX * j,
        (Math.floor(i / 2) + 1) * tileSize - offsetY * i,
        tileSize,
        tileSize,
        0,
        0,
        tileSize,
        tileSize
      )

      const x = j * tileSize
      const y = i * tileSize

      if (tiles[x]) {
        if (tiles[x][y]) {
          tiles[x][y] = tileImage
        } else {
          tiles[x] = {
            ...tiles[x],
            [y]: tileImage,
          }
        }
      } else {
        tiles = {
          ...tiles,
          [x]: { [y]: tileImage },
        }
      }
    }
  }
}
