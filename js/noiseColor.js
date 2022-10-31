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
