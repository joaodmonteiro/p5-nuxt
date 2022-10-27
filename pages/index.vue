<template>
  <main>
    <div id="container"></div>
    <div class="buttons">
      <button @click="changeColor('#F50000')">Red</button>
      <button @click="changeColor('#3CC700')">Green</button>
      <button @click="changeColor('#0030C7')">Blue</button>
    </div>
  </main>
</template>

<script>
const canvas = require('@/p5.js')
export default {
  name: 'IndexPage',
  data() {
    return {
      color: '#F50000'
    }
  },
  mounted() {
    const P5 = require('p5')
    new P5(canvas.main)

    canvas.setColor(this.color)
  },
  methods: {
    changeColor(newColor) {
      this.color = newColor
      canvas.setColor(this.color)
    }
  }
}
</script>

<!-- <style >
main {
  display: ;
  place-items: center;
  width: 100vw;
  height: 100vh;


}
</style> -->
