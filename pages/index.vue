<template>
  <main :style="computedStyles">
    <div id="container"></div>
    <select name="pencil" id="pencil" v-model="pencil">
      <option value="square">Square</option>
      <option value="circle">Circle</option>
      <option value="triangle">Triangle</option>
      <option value="checkers">Checkers</option>
      <option value="diagonal">Diagonal</option>
      <option value="heart">Heart</option>
      <option value="smile">Batman</option>
      <option value="houndstooth">Houndstooth</option>
      <option value="diy">Custom brush</option>
    </select>
    <input v-if="!noise" type="color" id="color" v-model="color">
    <select v-else name="color" id="color" v-model="color">
      <option value="#000000">Black</option>
      <!-- <option value="#FFFFFF">White</option> -->
      <option value="#F50000">Red</option>
      <option value="#3CC700">Green</option>
      <option value="#0030C7">Blue</option>
    </select>
    <select
      v-if="pencil === 'square' || pencil === 'checkers' || pencil === 'diagonal' || pencil === 'circle' || pencil === 'triangle'"
      name="size" id="size" v-model="size">
      <option value="10">10px</option>
      <option value="50">50px</option>
      <option value="100">100px</option>
    </select>
    <input type="checkbox" name="stroke" value="stroke" id="stroke" v-model="stroke">
    <label for="stroke">Stroke</label>
    <button @click="clearCanvas()">Clear canvas!</button>
    <div v-if="pencil !== 'square'">
      <input type="checkbox" name="Perlin Noise" id="noise" value="noise" v-model="noise">
      <label for="noise">Perlin Noise</label>
    </div>

    <div class="pencil-maker">
      <div class="pencil-maker__row" v-for="y in parseInt(brushSize)">
        <div class="pencil-maker__item" v-for="x in parseInt(brushSize)"
          :class="{ selected: diyPencilPositions[x - 1] && diyPencilPositions[x - 1][y - 1] === true }"
          @mouseover="mouseDown && toggleSquare(x - 1, y - 1)" @mousedown="toggleSquare(x - 1, y - 1)">
        </div>
      </div>
    </div>
    <div class="brush-size">
      <input class="brush-size__slider" type="range" min="5" max="20" value="5" id="brushSize" v-model="brushSize">
    </div>
    <label for="brushSize">{{ brushSize }}</label>
    <button @click="clearBrush()">Clear Brush</button>
  </main>
</template>

<script>
const canvas = require('@/js/p5.js')
export default {
  name: 'IndexPage',
  data() {
    return {
      color: '#000000',
      size: 10,
      pencil: 'square',
      noise: false,
      diyPencilPositions: {},
      brushSize: 5,
      mouseDown: false,
      stroke: false
    }
  },
  computed: {
    computedStyles() {
      return {
        '--brush-size': parseInt(this.brushSize)
      }
    }
  },
  mounted() {
    const P5 = require('p5')
    new P5(canvas.main)

    canvas.setColor(this.color)
    canvas.setSize(this.size)
    canvas.setPencil(this.pencil)

    document.addEventListener('mousedown', () => this.mouseDown = true)
    document.addEventListener('mouseup', () => this.mouseDown = false)
  },
  beforeDestroy() {
    document.removeEventListener('mousedown', () => this.mouseDown = true)
    document.removeEventListener('mouseup', () => this.mouseDown = false)
  },
  watch: {
    size() {
      canvas.setSize(this.size)
    },
    stroke() {
      canvas.setStroke(this.stroke)
    },
    color() {
      canvas.setColor(this.color)
    },
    pencil() {
      canvas.setPencil(this.pencil)
    },
    noise() {
      canvas.setNoise(this.noise)
    },
    diyPencilPositions: {
      handler() {
        canvas.setDiyPositions(this.diyPencilPositions)
        console.log(this.diyPencilPositions)
      },
      deep: true
    },
    brushSize() {
      canvas.setBrushSize(this.brushSize)

      Object.keys(this.diyPencilPositions).forEach(x => {
        Object.keys(this.diyPencilPositions).forEach(y => {
          if (y >= this.brushSize) {
            delete this.diyPencilPositions[x][y]
          }
        })
        if (x >= this.brushSize) {
          delete this.diyPencilPositions[x]
        }
      })
    }
  },
  methods: {
    toggleSquare(x, y) {
      const newObj = { ...this.diyPencilPositions }
      if (newObj[x]) {
        if (newObj[x][y]) {
          newObj[x][y] = !newObj[x][y]
        } else {
          newObj[x][y] = true
        }
      } else {
        newObj[x] = {}
        newObj[x][y] = true
      }

      this.diyPencilPositions = newObj
      console.log(this.diyPencilPositions)
    },
    clearBrush() {
      const emptyObj = {}

      this.diyPencilPositions = emptyObj
    },
    clearCanvas() {
      canvas.clearCanvas()
    }
  }
}
</script>

<style>
.pencil-maker {
  display: grid;
  grid-template-columns: repeat(var(--brush-size), 10px);
  margin-top: 20px;
}

.pencil-maker__item {
  width: 10px;
  height: 10px;
  border: 1px solid gray;
  box-sizing: border-box;
}

.selected {
  background-color: black;
}

#brushSize {
  width: 100px;
}
</style>
