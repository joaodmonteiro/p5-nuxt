<template>
  <main>
    <div id="container"></div>
    <input type="text" v-model="text">
    <label for="offsetX">Offset X</label>
    <input type="range" min="0" :max="tileSize" value="0" v-model="offsetX">
    <label for="offsetY">Offset Y</label>
    <input type="range" min="0" :max="tileSize" value="0" v-model="offsetY">
    <label for="tileSize">Tile Size</label>
    <input type="range" min="10" max="100" value="50" step="5" v-model="tileSize">
  </main>
</template>

<script>
const canvas = require('@/js/p5.js')
export default {
  name: 'IndexPage',
  data() {
    return {
      text: '',
      offsetX: 0,
      offsetY: 0,
      tileSize: 50
    }
  },
  computed: {

  },
  mounted() {
    const P5 = require('p5')
    new P5(canvas.main)

  },
  beforeDestroy() {
  },
  watch: {
    text() {
      canvas.setText(this.text)
      canvas.copyTiles()
    },
    offsetX() {
      canvas.setOffsetX(this.offsetX)
      canvas.copyTiles()
    },
    offsetY() {
      canvas.setOffsetY(this.offsetY)
      canvas.copyTiles()
    },
    tileSize() {
      canvas.setTileSize(this.tileSize)
      canvas.copyTiles()
    }
  },
  methods: {

  }
}
</script>

<style>
#container {
  border: 1px solid black;
}
</style>
