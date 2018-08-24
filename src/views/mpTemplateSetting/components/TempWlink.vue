<template>
  <div class="wlink-container" @click="selectTemp" @mousedown="startMove($event)" :style="{'justify-content': (data.position === 1 ? 'flex-start' : data.position === 2 ? 'center' : 'flex-end'), background: data.dynamicCss.background, color: data.dynamicCss.color}">
    <div class="wlink-container-content" :style="{'max-width': data.showErrow ? 'calc(100% - 10px)' : '100%'}">{{data.content}}</div>
    <img :src="require('@/assets/componetImg/arrow.png')" v-if="data.showErrow">
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
.wlink-container {
  padding: 17px 12px;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  &-content {
  	overflow: hidden;
    word-wrap: break-word;
    word-break: normal;
    display: inline-block;
    padding-right: 3px;
  }
}

</style>
