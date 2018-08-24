<template>
  <div class="menu-container" @click="selectTemp" @mousedown="startMove($event)">
    <ul class="ul_01" v-if="data.isImg && !data.isTopTitle" :style="data.slide ? 'overflow: hidden; white-space: nowrap;' : ''">
      <li v-for="(item, index) in data.menuList" :style="'width: calc(100% /' + (data.menuList.length > 5 ? 5 : data.menuList.length) + ')'">
        <img :src="item.iconUrl || require('@/assets/componetImg/nomenu.png')">
        <h4>{{item.title || '分类' + (index + 1) }}</h4>
      </li>
    </ul>
    <ul class="ul_02" v-else-if="data.isImg && data.isTopTitle" :style="data.slide ? 'overflow: hidden; white-space: nowrap;' : ''">
      <li v-for="(item, index) in data.menuList" :style="'width: calc(100% /' + (data.menuList.length > 3 ? 3 : data.menuList.length) + ')'">
        <h4>{{item.title || '分类标题' + (index + 1) }}</h4>
        <h5>{{item.subTitle || '副标题' + (index + 1) }}</h5>
        <img :src="item.iconUrl || require('@/assets/componetImg/nomenu1.png')">
        <div class="line"></div>
      </li>
    </ul>
    <ul class="ul_03" v-else-if="!data.isImg" :style="data.slide ? 'overflow: hidden; height: 30px;' : data.position === 1 ? 'text-align: left;' : data.position === 2 ? 'text-align: center;' : 'text-align: right;'">
      <li v-for="(item, index) in data.menuList"><div>{{item.title || '分类' + (index + 1) }}</div></li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['index', 'data'],
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
.menu-container {
  position: relative;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .ul_01 {
    list-style-type: none;
    -webkit-padding-start: 0;
    font-size: 0;
    // display: flex;
    // justify-content: space-around;
    li {
      width: calc(100% / 5);
      padding-top: 26px;
      text-align: center;
      display: inline-block;
      h4 {
        font-size: 13px;
        color: #333333;
        -webkit-margin-before: 17px;
        -webkit-margin-after: 20px;
      }
    }
  }
  .ul_02 {
    list-style-type: none;
    -webkit-padding-start: 0;
    font-size: 0;
    // display: flex;
    // justify-content: space-around;
    li {
      // width: calc(100% / 3);
      padding-bottom: 20px;
      text-align: center;
      position: relative;
      display: inline-block;
      h4 {
        font-size: 14px;
        line-height: 14px;
        color: #333333;
        -webkit-margin-before: 19px;
        -webkit-margin-after: 0;
      }
      h5 {
        font-size: 12px;
        line-height: 12px;
        color: #999999;
        -webkit-margin-before: 8px;
        -webkit-margin-after: 27px;
      }
    }
    // li:not(:last-child) {
    //   .line {
    //     width: 2px;
    //     background: rgba(0, 0, 0, 0.1);
    //     position: absolute;
    //     top: 44px;
    //     right: 0;
    //     bottom: 18px;
    //   }
    // }
  }
  .ul_03 {
    list-style-type: none;
    -webkit-padding-start: 0;
    font-size: 0;
    li {
      font-size: 14px;
      display: inline-block;
      padding: 8px 0;
      div {
        padding: 0 16px;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        line-height: 14px;
      }
    }
  }
}

</style>
