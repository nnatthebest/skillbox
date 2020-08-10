<template>
  <li class="colors__item">
    <label class="colors__label">
      <input class="colors__radio sr-only" type="radio" name="color-item" v-model="colorId" />
      <span class="colors__value" :style="'background-color: ' + color.code"> </span>
    </label>
  </li>
</template>

<script>
export default {
  name: 'ProductColor',
  props: ['color', 'currentColor'],
  computed: {
    colorId: {
      get() {
        return this.color.id
      },
      set() {
        this.$emit('update:currentColor', this.color.id)
      },
    },
  },
}
</script>
