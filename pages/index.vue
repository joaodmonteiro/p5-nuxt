<template>
  <main>
    <div id="container"></div>
    <div class="controls">
      <input type="text" v-model="text" class="text-input">
      <label for="tileSize">Tile Size</label>
      <input type="range" min="0" max="100" v-model="tileSize">
      <label for="sampleSize">Sample Size</label>
      <input type="range" min="0" max="100" v-model="sampleSize">
      <label for="fontSize">Font Size</label>
      <input type="range" min="20" max="400" value="100" v-model="fontSize">
      <label for="colour">Colour</label>
      <input type="checkbox" v-model="colour" id="colour">
      <label for="grid">Grid</label>
      <input type="checkbox" v-model="grid" id="grid">
      <button @click="download">Download Image</button>
    </div>
  </main>
</template>

<script>
const canvas = require('@/js/p5.js')
export default {
  name: 'IndexPage',
  data() {
    return {
      text: '',
      tileSize: 80,
      sampleSize: 17,
      shouldWait: false,
      canvasX: 0,
      canvasY: 0,
      colour: false,
      fontSize: 100,
      minTileSize: 15,
      maxTileSize: 200,
      initialTileSize: 150,
      minSampleSize: 10,
      maxSampleSize: 60,
      initialSampleSize: 80,
      grid: true
    }
  },
  computed: {

  },
  mounted() {
    const P5 = require('p5')
    new P5(canvas.main)

    this.setSampleSize()
    this.setTileSize()

  },
  beforeDestroy() {
  },
  watch: {
    text() {
      canvas.setText(this.text)
    },
    tileSize() {
      this.setTileSize()
    },
    sampleSize() {
      this.setSampleSize()
    },
    canvasX() {
      canvas.setCanvasSize(this.canvasX, this.canvasY)
    },
    canvasY() {
      canvas.setCanvasSize(this.canvasX, this.canvasY)
    },
    colour() {
      canvas.setColour(this.colour)
    },
    fontSize() {
      canvas.setFontSize(this.fontSize)
    },
    grid() {
      canvas.setGrid(this.grid)
    }
  },
  methods: {
    throttle(cb, delay = 250) {

      return (...args) => {
        if (this.shouldWait) return

        cb(...args)
        this.shouldWait = true
        setTimeout(() => {
          this.shouldWait = false
        }, delay)
      }
    },
    download() {
      canvas.downloadImage()
    },
    setTileSize() {
      const range = this.maxTileSize - this.minTileSize
      const size = range * (1 - (this.tileSize / 100)) + this.minTileSize
      canvas.setTileSize(size)
    },
    setSampleSize() {
      const range = this.maxSampleSize - this.minSampleSize
      const size = range * (1 - (this.sampleSize / 100)) + this.minSampleSize
      canvas.setSampleSize(size)
    }
  }
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#container {
  border: 1px solid black;
  display: flex;
  justify-content: center;
  width: 1025px;
}
</style>
