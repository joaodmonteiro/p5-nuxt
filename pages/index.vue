<template>
  <main :style="computedStyles">
    <div id="container"></div>
    <select name="pencil" id="pencil" v-model="pencil">
      <option value="square">Square</option>
      <option value="checkers">Checkers</option>
      <option value="diagonal">Diagonal</option>
      <option value="heart">Heart</option>
      <option value="smile">Smile</option>
      <option value="houndstooth">Houndstooth</option>
      <option value="diy">My own brush</option>
    </select>
    <select name="color" id="color" v-model="color">
      <option value="#000000">Black</option>
      <option value="#FFFFFF">White</option>
      <option value="#F50000">Red</option>
      <option value="#3CC700">Green</option>
      <option value="#0030C7">Blue</option>
    </select>
    <input type="checkbox" name="Perlin Noise" id="noise" value="noise" v-model="noise">
    <label for="noise">Perlin Noise</label>
    <select v-if="pencil === 'square' || pencil === 'checkers' || pencil === 'diagonal'" name="size" id="size"
      v-model="size">
      <option value="10">10px</option>
      <option value="50">50px</option>
      <option value="100">100px</option>
    </select>
    <div class="pencil-maker">
      <div class="pencil-maker__row" v-for="y in parseInt(brushSize)">
        <div class="pencil-maker__item" v-for="x in parseInt(brushSize)"
          :class="{ selected: diyPencilPositions[x - 1] && diyPencilPositions[x - 1][y - 1] === true }"
          @click="toggleSquare(x - 1, y - 1)">
        </div>
      </div>
    </div>
    <div class="brush-size">
      <input class="brush-size__slider" type="range" min="5" max="10" value="5" id="brushSize" v-model="brushSize">
    </div>
    <label for="brushSize">{{ brushSize }}</label>
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
      brushSize: 5
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
  },
  watch: {
    size() {
      canvas.setSize(this.size)
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
