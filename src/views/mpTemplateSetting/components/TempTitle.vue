<template>
  <div class="title-container" @click="selectTemp" @mousedown="startMove($event)">
    <div class="title-container-box" :class="{center: data.position === 2, right: data.position === 3}">
      <div class="title-container-box-title">
        <div :class="{line_01: data.fixedCssType === 2, line_02: data.fixedCssType === 1}" :style="{background: data.dynamicCss.background}"></div>
        {{data.title}}
      </div>
      <div class="title-container-box-urlbox" v-if="data.linkVisible">
        {{data.linkContent }}
        <img :src="require('@/assets/componetImg/arrow.png')">
      </div>
    </div>
    <p class="title-container-subox" :class="{center: data.position === 2, right: data.position === 3}" :style="data.fixedCssType === 2 || '-webkit-margin-before: 9px;'">
      {{data.subTitle}}
      <span v-if="data.position === 3 && data.linkVisible" style="opacity: 0;padding-right: 10px;font-size:12px;">{{data.linkContent }}</span>
    </p>
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
.title-container {
  position: relative;
  padding: 16px 20px 16px 30px;
  &-box {
    position: relative;
    &-title {
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      position: relative;
      display: inline-block;
      line-height: 16px;
    }
    &-urlbox {
      position: absolute;
      right: 0;
      top: 0;
      font-size:12px;
      color: #999999;
    }
  }
  p {
    -webkit-margin-before: 18px;
    -webkit-margin-after: 0 !important;
    font-size:12px;
    color: #999999;
  }
  .line_01 {
    height: 6px;
    border-radius: 3px;
    position: absolute;
    bottom: -12px;
    left: 0;
    right: 0;
  }
  .line_02 {
    width: 6px;
    border-radius: 3px;
    position: absolute;
    bottom: 0;
    top: 0;
    left: -12px;
  }
}
.center {
  text-align: center;
}
.right {
  text-align: right;
  .title-container-box-urlbox {
    display: inline-block;
    position: relative;
  }
}
</style>
