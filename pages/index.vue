<template>
  <main>
    <div id="container"></div>
    <div class="controls">
      <input type="text" v-model="text">
      <label for="tileSize">Tile Size</label>
      <input type="range" min="4" max="50" value="25" v-model="tileSize">
      <label for="sampleSize">Sample Size</label>
      <input type="range" min="25" max="50" value="25" v-model="sampleSize">
      <label for="colour">Colour</label>
      <input type="checkbox" v-model="colour" id="colour">
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
      tileSize: 25,
      sampleSize: 25,
      shouldWait: false,
      canvasX: 0,
      canvasY: 0,
      colour: false
    }
  },
  computed: {

  },
  mounted() {
    const P5 = require('p5')
    new P5(canvas.main)

    this.handleResize()

    window.addEventListener('resize', this.handleResize)

  },
  beforeDestroy() {
  },
  watch: {
    text() {
      canvas.setText(this.text)
    },
    tileSize() {
      canvas.setTileSize(this.tileSize)
    },
    sampleSize() {
      canvas.setSampleSize(this.sampleSize)
    },
    canvasX() {
      canvas.setCanvasSize(this.canvasX, this.canvasY)
    },
    canvasY() {
      canvas.setCanvasSize(this.canvasX, this.canvasY)
    },
    colour() {
      canvas.setColour(this.colour)
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
    handleResize() {
      this.canvasX = window.innerWidth
      this.canvasY = window.innerHeight - 200
    },
    download() {
      canvas.downloadImage()
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
  width: 800px;
}
</style>
