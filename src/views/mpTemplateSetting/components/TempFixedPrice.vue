<template>
  <div class="product-container" @click="selectTemp" @mousedown="startMove($event)">
    <div class="cssType_1" v-if="data.fixedCssType === 1">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="tip" :class="{elaborates: data.logo.type === 2}" :style="{background: data.logo.background}" v-if="data.productCssList.includes(4)">
          <span>一口价</span>
        </div>
        <div class="imgbox">
          <img :src="item.imagePath">
          <div class="imgbox-timeclock" v-if="data.productCssList.includes(2)" :class="{nostart: !getActivityTimeContent(item.startTime, item.endTime, true).isStart}">
            {{getActivityTimeContent(item.startTime, item.endTime, true).content }}
          </div>
        </div>
        <div class="title">
          {{item.productName}}
        </div>
        <div class="priceBox">
          <span class="price">￥{{item.price}}</span>
          <template v-if="data.productCssList.includes(3)">
            <div class="shopcar" :style="{color: data.button.background, 'border-color': data.button.background}" v-if="data.button.type === 2">
              {{getActivityTimeContent(item.startTime, item.endTime, true).isStart ? '去抢购' : '去看看'}}
            </div>
            <div class="shopcar" :style="{background: data.button.background, color: '#fff', 'border-color': data.button.background}" v-else>
              {{getActivityTimeContent(item.startTime, item.endTime, true).isStart ? '去抢购' : '去看看'}}
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="cssType_2" v-if="data.fixedCssType === 2">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="tip" :class="{elaborates: data.logo.type === 2}" v-if="data.productCssList.includes(4)">
          <span>一口价</span>
        </div>
        <div class="imgbox">
          <img :src="item.imagePath">
          <div class="imgbox-timeclock" v-if="data.productCssList.includes(2)" :class="{nostart: !getActivityTimeContent(item.startTime, item.endTime).isStart}">
            {{getActivityTimeContent(item.startTime, item.endTime).content }}
          </div>
        </div>
        <div class="title">
          {{item.productName}}
        </div>
        <div class="priceBox">
          <span class="price">￥{{item.price}}</span>
        </div>
        <div class="shopcar" v-if="data.productCssList.includes(3)">
          <div class="shopcar-btn" :style="{color: data.button.background, 'border-color': data.button.background}" v-if="data.button.type === 2">
            {{getActivityTimeContent(item.startTime, item.endTime).isStart ? '去抢购' : '去看看'}}
          </div>
          <div class="shopcar-btn" :style="{background: data.button.background, color: '#fff', 'border-color': data.button.background}" v-else>
            {{getActivityTimeContent(item.startTime, item.endTime).isStart ? '去抢购' : '去看看'}}
          </div>
        </div>
      </div>
    </div>
    <div class="cssType_3" v-if="data.fixedCssType === 3">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="tip" :class="{elaborates: data.logo.type === 2}" v-if="data.productCssList.includes(4)"> 
          <span>一口价</span>
        </div>
        <div class="imgbox">
          <img :src="item.imagePath">
          <div class="imgbox-timeclock" v-if="data.productCssList.includes(2)" :class="{nostart: !getActivityTimeContent(item.startTime, item.endTime).isStart}">
            {{getActivityTimeContent(item.startTime, item.endTime).content }}
          </div>
        </div>
        <div class="title">
          {{item.productName}}
        </div>
        <div class="priceBox">
          <span class="price">￥{{item.price}}</span>
        </div>
        <div class="shopcar" v-if="data.productCssList.includes(3)">
          <div class="shopcar-btn" :style="{color: data.button.background, 'border-color': data.button.background}" v-if="data.button.type === 2">
            {{getActivityTimeContent(item.startTime, item.endTime).isStart ? '去抢购' : '去看看'}}
          </div>
          <div class="shopcar-btn" :style="{background: data.button.background, color: '#fff', 'border-color': data.button.background}" v-else>
            {{getActivityTimeContent(item.startTime, item.endTime).isStart ? '去抢购' : '去看看'}}
          </div>
        </div>
      </div>
    </div>
    <div class="cssType_3" v-if="data.fixedCssType === 4" :style="'overflow: hidden;height:' + (data.productCssList.includes(3) ? '221px;' : '181px;')">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="tip" :class="{elaborates: data.logo.type === 2}" v-if="data.productCssList.includes(4)">
          <span>一口价</span>
        </div>
        <div class="imgbox">
          <img :src="item.imagePath">
          <div class="imgbox-timeclock" v-if="data.productCssList.includes(2)" :class="{nostart: !getActivityTimeContent(item.startTime, item.endTime).isStart}">
            {{getActivityTimeContent(item.startTime, item.endTime).content }}
          </div>
        </div>
        <div class="title">
          {{item.productName}}
        </div>
        <div class="priceBox">
          <span class="price">￥{{item.price}}</span>
        </div>
        <div class="shopcar" v-if="data.productCssList.includes(3)">
          <div class="shopcar-btn" :style="{color: data.button.background, 'border-color': data.button.background}" v-if="data.button.type === 2">
            {{getActivityTimeContent(item.startTime, item.endTime).isStart ? '去抢购' : '去看看'}}
          </div>
          <div class="shopcar-btn" :style="{background: data.button.background, color: '#fff', 'border-color': data.button.background}" v-else>
            {{getActivityTimeContent(item.startTime, item.endTime).isStart ? '去抢购' : '去看看'}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['index', 'data'],
  data() {
    return {}
  },
  methods: {
    selectTemp() {
      this.$emit('selectTemp', this.index)
    },
    startMove(event) {
      this.$emit('startMove', event, this.index)
    },
    getActivityTimeContent(startTimeStr, endTimeStr, flag) {
      const t1 = startTimeStr.slice(6, 19)
      const t2 = endTimeStr.slice(6, 19) 
      const startMinusNow = parseInt(t1) - new Date().getTime()
      const endMinusNow = parseInt(t2) - new Date().getTime()
      return startMinusNow < 0 ? { content: '距结束 ' + this.formatTime(endMinusNow, flag), isStart: true} : { content: '距开始 ' + this.formatTime(startMinusNow, flag), isStart: false}
    },
    formatTime(mss, flag) {
      const hours = parseInt(mss / (1000 * 60 * 60))
      const minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = (mss % (1000 * 60)) / 1000
      return flag ? (hours + '时' + minutes + '分' + Math.ceil(seconds) + '秒') : (hours + ':' + minutes + ':' + Math.ceil(seconds))
    }
  }
}

</script>

<style lang="scss">
.no-flex-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.nostart {
  background: #575654;
}
.elaborates {

}
.cssType_1 {
  padding: 8px;
  .cssType_item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    .tip {
      position: absolute;
      width: 98px;
      height: 34px;
      background: rgba(233,68,11,0.9);
      z-index: 1;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 34px;
        font-size: 16px;
        color: #fff;
        text-align: center;
      }
    }
    .imgbox {
      height: 315px;
      position: relative;
      img {
        max-width: 100%;
        max-height: 100%;
        @extend .no-flex-center;
      }
      &-timeclock {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 14px;
        line-height: 14px;
        text-align: center;
        padding: 10px 0;
        background: rgba(233,68,11,0.9);
        color: #fff;
      }
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 10px;
    }
    .priceBox {
      height: 40px;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .price {
        color: #E9440B;
      }
      .shopcar {
        display: inline-block;
        border-radius: 8px;
        color: #fff;
        font-size: 14px;
        padding: 5px 35px;
        border: 1px solid rgba(233,68,11,1);
      }
    }
  }
  .cssType_item:not(:first-child) {
    margin-top: 10px;
  }
}

.cssType_2 {
  padding: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .cssType_item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    width: calc((100% - 8px) / 2);
    display: inline-block;
    margin-bottom: 4px;
    .tip {
      position: absolute;
      width: 62px;
      height: 21px;
      background: rgba(233,68,11,0.9);
      z-index: 1;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 21px;
        font-size: 12px;
        color: #fff;
        text-align: center;
      }
    }
    .imgbox {
      height: 150px;
      position: relative;
      img {
        max-width: 100%;
        max-height: 100%;
        @extend .no-flex-center;
      }
      &-timeclock {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 14px;
        line-height: 14px;
        text-align: center;
        padding: 10px 0;
        background: rgba(233,68,11,0.9);
        color: #fff;
      }
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 10px;
    }
    .priceBox {
      height: 40px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .price {
        color: #E9440B;
      }
    }
    .shopcar {
      display: inline-block;
      border-radius: 8px;
      color: #fff;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      &-btn {
        font-size: 14px;
        width: 100%;
        padding: 5px 0;
        text-align: center;
        border-radius: 5px;
        background: #fff;
        color: rgba(233, 68, 11, 1);
        border: 1px solid rgba(233, 68, 11, 1);
      }
    }
  }
}

.cssType_3 {
  padding: 4px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .cssType_item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    width: calc((100% - 12px) / 3);
    display: inline-block;
    margin-bottom: 4px;
    .tip {
      position: absolute;
      width: 62px;
      height: 21px;
      background: rgba(233,68,11,0.9);
      z-index: 1;
      img {
        width: 100%;
        height: 100%;
      }
      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 21px;
        font-size: 12px;
        color: #fff;
        text-align: center;
      }
    }
    .imgbox {
      height: 110px;
      position: relative;
      img {
        max-width: 100%;
        max-height: 100%;
        @extend .no-flex-center;
      }
      &-timeclock {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        font-size: 14px;
        line-height: 14px;
        text-align: center;
        padding: 10px 0;
        background: rgba(233,68,11,0.9);
        color: #fff;
      }
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
      color: #333333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 10px;
    }
    .priceBox {
      height: 40px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .price {
        color: #E9440B;
      }
    }
    .shopcar {
      display: inline-block;
      border-radius: 8px;
      color: #fff;
      width: 100%;
      padding: 5px;
      box-sizing: border-box;
      &-btn {
        font-size: 14px;
        width: 100%;
        padding: 5px 0;
        text-align: center;
        border-radius: 5px;
        background: #fff;
        color: rgba(233, 68, 11, 1);
        border: 1px solid rgba(233, 68, 11, 1);
      }
    }
  }
}

</style>
