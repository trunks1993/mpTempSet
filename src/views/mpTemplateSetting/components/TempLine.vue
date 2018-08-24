<template>
  <div class="line-container" @click="selectTemp" @mousedown="startMove($event)" :style="'padding: 5px ' + data.dynamicCss.padding">
    <div class="line-container-line" :style="'border-top: 1px ' + data.dynamicCss.lineStyle + ' ' + data.dynamicCss.background" v-if="!data.isBlock"></div>
    <div v-else :style="'background:' + data.dynamicCss.background + '; height:' + data.dynamicCss.height + 'px'"></div>
  </div>
</template>
<script>
export default {
  props: ['index', 'data'],
  data() {
    return {
    }
  },
  methods: {
    selectTemp() {
      this.$emit('selectTemp', this.index)
    },
    startMove(event) {
      this.$emit('startMove', event, this.index)
    }
  }
}

</script>
<style lang="scss" scoped>
.line-container {
  &-line {
    height: 1px;
    width: 100%;
  }
}
</style>
