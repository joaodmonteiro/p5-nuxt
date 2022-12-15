<template>
  <div class="color-picker">
    <div class="color-picker__background">
      <div
        class="color-picker__color"
        v-for="color in colors"
        :style="{ backgroundColor: color }"
        @click="pickColor(color)"
        :class="{ selected: color === pickedColor }"
      >
        {{ color }}
      </div>
      <button class="close-button" @click="closePicker">close</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickedColor: undefined,
    }
  },
  props: {
    colors: {
      type: Array,
      default: () => {},
    },
  },
  methods: {
    pickColor(color) {
      this.pickedColor = color
      this.$emit('colorChange', color)
    },
    closePicker() {
      this.$emit('closePicker')
    },
  },
}
</script>
<style>
.color-picker {
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50vw;
  transform: translate(-50%, -50%);
  background-color: gray;
  padding: 40px;
}

.color-picker__background {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.color-picker__color {
  height: 40px;
  cursor: pointer;
}

.selected {
  border: 2px solid red;
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
