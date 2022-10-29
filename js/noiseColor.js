export function getNoiseColor(p5, color, x, y) {
  switch (color) {
    case '#F50000':
      return p5.color(
        255,
        255 * p5.noise(x / 100, y / 100),
        255 * p5.noise(x / 100, y / 100)
      )

      break
    case '#3CC700':
      return p5.color(
        255 * p5.noise(x / 100, y / 100),
        255,
        255 * p5.noise(x / 100, y / 100)
      )

      break
    case '#0030C7':
      return p5.color(
        255 * p5.noise(x / 100, y / 100),

        255 * p5.noise(x / 100, y / 100),
        255
      )
      break
    case '#000000':
      return p5.color(
        255 * p5.noise(x / 100, y / 100),

        255 * p5.noise(x / 100, y / 100),
        255 * p5.noise(x / 100, y / 100)
      )
      break
    default:
      return color
  }
}

export function setGradient(p5, x, y, w, h, c1, c2, axis) {
  p5.noFill()

  if (axis === 'Y_AXIS') {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = p5.map(i, y, y + h, 0, 1)
      let c = p5.lerpColor(c1, c2, inter)
      p5.stroke(c)
      p5.line(x, i, x + w, i)
    }
  } else if (axis === 'X_AXIS') {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = p5.map(i, x, x + w, 0, 1)
      let c = p5.lerpColor(c1, c2, inter)
      p5.stroke(c)
      p5.line(i, y, i, y + h)
      console.log('ya')
    }
  }
}
