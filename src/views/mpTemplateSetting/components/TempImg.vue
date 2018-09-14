<template>
  <div class="imgwrapper-container" @click="selectTemp" @mousedown="startMove($event)">
    <div class="imgwrapper-container-none" v-if="data.imgList.length === 0">
      <img :src="require('@/assets/componetImg/nomenu1.png')">
      <div>请在右侧添加图片</div>
    </div>
    <div class="imgwrapper-container-has" :style="data.isFill ? '' : 'padding: 5px;'" v-else>
      <div class="pointWrapper" :style="data.isFill ? '' : 'padding: 5px;'" v-if="data.fixedCssType === 1">
        <span style="background: rgba(244, 244, 244, 1);"></span>
        <span></span>
        <span></span>
      </div>
      <div :class="{item_1: data.fixedCssType === 1, item_2: data.fixedCssType === 2, item_3: data.fixedCssType === 3}" v-for="item in data.imgList" v-if="item.imgUrl">
        <div class="title">{{item.title }}</div>
        <img width="100%" style="vertical-align: middle;" :src="item.imgUrl || require('@/assets/componetImg/nomenu1.png')">
      </div>
    </div>
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
.imgwrapper-container {
  // height: 126px;
  &-none {
    height: 100%;
    background: #F4F4F4;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div {
      font-size: 13px;
      color: #999999;
      line-height: 13px;
      margin-top: 20px;
    }
  }
  &-has {
    white-space: nowrap;
    overflow: hidden;
    position: relative;
    .item_1 {
      position: relative;
      display: inline-block;
      width: 100%;
    }
    .item_2 {
      position: relative;
      display: inline-block;
      width: 90%;
    }
    .item_3 {
      position: relative;
      display: inline-block;
      width: 40%;
    }
    .pointWrapper {
      position: absolute;
      right: 5px;
      bottom: 10px;
      z-index: 1;
      line-height: 6px;
      span {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: rgba(244, 244, 244, 0.3);
      }
    }
    .title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      color: #fff;
      font-size: 14px;
      background: rgba(0, 0, 0, 0.1);
      line-height: 14px;
      padding: 5px;
      box-shadow: 1px 1px 20px 10px rgba(0, 0, 0, 0.1);
    }
  }
}

</style>
