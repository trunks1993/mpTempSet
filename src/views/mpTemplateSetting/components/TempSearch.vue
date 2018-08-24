<template>
  <div class="search-container" @click="selectTemp" :style="{background: data.dynamicCss.background}" @mousedown="startMove($event)">
    <div class="search-container-input" :style="data.fixedCssType === 1 ? style_1 : style_2">
      <img :src="require('@/assets/componetImg/search.png')">
      <span>{{data.keyWord || '搜索'}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ['index', 'data'],
  data() {
    return {
      style_1: {
        background: 'rgba(0,0,0,0.1)'
      },
      style_2: {
        border: '1px solid rgba(0,0,0,0.1)',
        background: '#fff'
      }
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
.search-container {
  height: 62px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &-input {
    width: 342px;
    height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 14px;
      color: #c4c4c4;
      margin-left: 10px;
    }
  }
}

</style>
