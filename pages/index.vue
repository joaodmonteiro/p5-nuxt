<template>
  <main>
    <div id="container"></div>
    <div class="controls">
      <input type="text" v-model="text" class="text-input" />
      <label for="tileSize">Tile Size</label>
      <input type="range" min="0" max="100" v-model="tileSize" />
      <label for="sampleSize">Sample Size</label>
      <input type="range" min="0" max="100" v-model="sampleSize" />
      <label for="fontSize">Font Size</label>
      <input type="range" min="20" max="400" value="100" v-model="fontSize" />
      <label for="grid">Grid</label>
      <input type="checkbox" v-model="grid" id="grid" />
      <div class="colors">
        <!-- <select class="color-picker" v-model="backgroundColor">
          <option
            v-for="color in colors"
            :value="color"
            :style="{ backgroundColor: color }"
            :key="color"
          >
            {{ color }}
          </option>
        </select>
        <select class="color-picker" v-model="foregroundColor">
          <option
            v-for="color in colors"
            :value="color"
            :style="{ backgroundColor: color }"
            :key="color"
          >
            {{ color }}
          </option>
        </select> -->
        <div
          class="colors__foreground"
          :style="{ backgroundColor: foregroundColor }"
          @click="foregroundPicker = true"
        ></div>
        <div
          class="colors__background"
          :style="{ backgroundColor: backgroundColor }"
          @click="backgroundPicker = true"
        ></div>
      </div>
      <button @click="download">Download Image</button>
    </div>
    <ColorPicker
      v-show="foregroundPicker"
      :colors="colors"
      @colorChange="setForegroundColor"
      @closePicker="foregroundPicker = false"
    />
    <ColorPicker
      v-show="backgroundPicker"
      :colors="colors"
      @colorChange="setBackgroundColor"
      @closePicker="backgroundPicker = false"
    />
  </main>
</template>

<script>
import ColorPicker from '~/components/ColorPicker.vue'
const canvas = require('@/js/p5.js')
export default {
  components: { ColorPicker },
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
      grid: true,
      colors: [
        '#fafafa',
        '#f3d8d4',
        '#fcb9ae',
        '#e39282',
        '#ed7f7a',
        '#ed999b',
        '#d25e5e',
        '#98353c',
        '#831e13',
        '#7e131a',
        '#5a0c0c',
        '#3b0502',
        '#faf6d7',
        '#f3edbf',
        '#f5e89a',
        '#f6e376',
        '#c3a547',
        '#8f6d07',
        '#805d14',
        '#372c02',
        '#e4dfb9',
        '#e2e1a2',
        '#dad783',
        '#aaa248',
        '#625f05',
        '#5c5b0d',
        '#333701',
        '#dad8bb',
        '#818362',
        '#545434',
        '#e2eff9',
        '#cbe0f9',
        '#9ebae6',
        '#a5c9ea',
        '#63749e',
        '#3f518c',
        '#042c67',
        '#032355',
        '#01122c',
        '#e4fac8',
        '#ddf89d',
        '#a7c45a',
        '#93c45a',
        '#89b03d',
        '#66821b',
        '#53671e',
        '#304f02',
        '#262f01',
        '#e1ffe7',
        '#c7f4cc',
        '#bceeb8',
        '#91e39f',
        '#7ece95',
        '#58ac6c',
        '#51955a',
        '#477b4e',
        '#03520d',
        '#02460a',
        '#012d06',
        '#9dcbab',
        '#87c49d',
        '#6bb282',
        '#407e5a',
        '#034624',
        '#e2d7f4',
        '#c0a9db',
        '#7d69b7',
        '#584287',
        '#49307b',
        '#331554',
        '#1d0529',
        '#fee7d0',
        '#ffcf8b',
        '#fcbd6c',
        '#f8bf65',
        '#fca950',
        '#f57e36',
        '#f17551',
        '#a65003',
        '#9c3503',
        '#dff5f9',
        '#4ca0a5',
        '#07878b',
        '#006164',
        '#01282b',
        '#d391b0',
        '#b46072',
        '#65061e',
        '#f4d7e6',
        '#bb75a5',
        '#a8548d',
        '#874070',
        '#701a4d',
        '#5a0e3b',
        '#42082a',
        '#efa97c',
        '#e09b63',
        '#9e5e37',
        '#8c5321',
        '#704023',
        '#75301c',
        '#5f2b0b',
        '#4f3910',
        '#21100c',
        '#c69e5e',
        '#d2a97d',
        '#ac865a',
        '#896640',
        '#79501f',
        '#583711',
        '#2e1c05',
        '#8d8870',
        '#8b775e',
        '#d6d7d7',
        '#afc1c7',
        '#727982',
        '#606062',
        '#4a545b',
        '#272f3b',
        '#2e2e30',
        '#000003',
        '#c1d1d6',
        '#d8e6e5',
        '#c9e4e5',
        '#a9cdd4',
        '#8cc2d1',
        '#cbedf9',
        '#a9c2db',
        '#8c9ac9',
        '#63849e',
        '#956358',
        '#688296',
        '#426476',
        '#274e5f',
        '#7ea6b0',
        '#4c7283',
        '#bb6ba7',
        '#9c4e8e',
        '#621137',
        '#f0dfb6',
        '#9f784f',
        '#9e906c',
        '#6b4e1b',
        '#cec67e',
        '#a5994b',
        '#6a621f',
        '#9a9a9a',
      ],
      backgroundColor: '#000003',
      foregroundColor: '#fafafa',
      foregroundPicker: false,
      backgroundPicker: false,
    }
  },
  computed: {},
  mounted() {
    const P5 = require('p5')
    new P5(canvas.main)

    this.setSampleSize()
    this.setTileSize()
  },
  beforeDestroy() {},
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
    foregroundColor() {
      canvas.setForegroundColor(this.foregroundColor)
    },
    backgroundColor() {
      canvas.setBackgroundColor(this.backgroundColor)
    },
    fontSize() {
      canvas.setFontSize(this.fontSize)
    },
    grid() {
      canvas.setGrid(this.grid)
    },
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
      const size = range * (1 - this.tileSize / 100) + this.minTileSize
      canvas.setTileSize(size)
    },
    setSampleSize() {
      const range = this.maxSampleSize - this.minSampleSize
      const size = range * (1 - this.sampleSize / 100) + this.minSampleSize
      canvas.setSampleSize(size)
    },
    setForegroundColor(color) {
      this.foregroundColor = color
    },
    setBackgroundColor(color) {
      this.backgroundColor = color
    },
  },
}
</script>

<style>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* .color-picker {
  background-color: red;
} */

#container {
  border: 1px solid black;
  display: flex;
  justify-content: center;
  width: 1025px;
}

.colors {
  display: flex;
}
.colors__foreground,
.colors__background {
  border: 1px solid black;
  width: 50px;
  height: 50px;
}
</style>
