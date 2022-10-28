<template>
  <main>
    <div id="container"></div>
    <select name="pencil" id="pencil" v-model="pencil">
      <option value="square">Square</option>
      <option value="checkers">Checkers</option>
      <option value="heart">Heart</option>
      <option value="smile">Smile</option>
    </select>
    <select name="color" id="color" v-model="color">
      <option value="#000000">Black</option>
      <option value="#FFFFFF">White</option>
      <option value="#F50000">Red</option>
      <option value="#3CC700">Green</option>
      <option value="#0030C7">Blue</option>
    </select>
    <select v-if="pencil === 'square' || pencil === 'checkers'" name="size" id="size" v-model="size">
      <option value="10">10px</option>
      <option value="50">50px</option>
      <option value="100">100px</option>
    </select>
  </main>
</template>

<script>
const canvas = require('@/p5.js')
export default {
  name: 'IndexPage',
  data() {
    return {
      color: '#000000',
      size: 10,
      pencil: 'square'
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
    }
  },
}
</script>
