<template>
  <div class="coupon-container" @click="selectTemp" @mousedown="startMove($event)">
    <template v-if="data.fixedCssType === 1" v-for="item in data.couponList">
      <div class="coupon-single" v-if="data.couponList.length === 1">
        <div class="coupon-single-price">{{item.price }}</div>
        <div class="coupon-single-content">
          <div>{{item.title }}</div>
          <div>{{item.startTime }} 至 {{item.endTime }}</div>
        </div>
        <div class="coupon-single-btn">立即领取</div>
      </div>
      <div class="coupon-double" v-if="data.couponList.length === 2">
        <div class="coupon-double-wrapper">
          <div class="coupon-double-wrapper-content">
            <div class="coupon-double-wrapper-content-priceandname">
              <span>{{item.price }}</span>
              <span>{{item.title }}</span>
            </div>
          </div>
          <div class="coupon-double-wrapper-btn">
            领取
          </div>
        </div>
      </div>
      <div class="coupon-more" v-if="data.couponList.length === 3">
        <div class="coupon-more-wrapper">
          <div class="coupon-more-wrapper-content">
            <div class="coupon-more-wrapper-content-priceandname">
              <span>{{item.price }}</span>
              <span>{{item.title }}</span>
            </div>
          </div>
          <div class="coupon-more-wrapper-btn">
            领取
          </div>
        </div>
      </div>
    </template>
  	<template v-else-if="data.fixedCssType === 2">
      2
    </template>
    <template v-else-if="data.fixedCssType === 3">
      3
    </template>
    <template v-else-if="data.fixedCssType === 4">
      4
    </template>
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
<style lang="scss">
.coupon-container {
  font-size: 0;
  white-space: nowrap;
  overflow: hidden;
}
.coupon-single {
  width: calc(100% - 28px); 
  margin: auto; 
  background: rgba(227,69,20,0.1);
  display: flex;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 8px;
  &-price {
    color: #E34514;
    font-size: 27px;
    font-weight: bold;
    position: relative;
    &:before {
      content: '￥';
      color: #E34514;
      font-weight: bold;
      font-size: 16px;
    }
  }
  &-content {
    font-size: 12px;
    color: #E34514;
    margin-left: 15px;
  }
  &-btn {
    width: 90px;
    height: 26px;
    background: #e34514;
    border-radius: 26px;
    text-align: center;
    color: #fff;
    line-height: 26px;
    font-size: 12px;
    position: absolute;
    right: 27px;
  }
}
.coupon-double {
  display: inline-block;
  width: calc((100% - 42px) / 2);
  background: rgba(227,69,20,0.1);
  box-sizing: border-box;
  margin-left: 14px;
  border-radius: 8px;
  padding: 9px 5px;
  &-wrapper {
    display: flex;
    align-items: center;
    flex: 5;
    &-content {
      font-size: 27px;
      &-priceandname {
        display: flex;
        & span:nth-child(1) {
          font-weight: bolder;
          color: #E34514;
        }
        & span:nth-child(1):before {
          content: '￥';
          color: #E34514;
          font-weight: bold;
          font-size: 16px;
        }
        & span:nth-child(2) {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 75px;
          color: #E34514;
          margin-left: 8px;
        }
      }
      &-date {
        font-size: 12px;
        color: rgba(227, 69, 20, 0.6);
      }
    }
    &-btn {
      flex: 3;
      font-size: 13px;
      text-align: center;
      color: #E34514;
      font-weight: bolder;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      white-space: normal;
    }
  }
}
.coupon-more {
  display: inline-block;
  width: 155px;
  background: rgba(227,69,20,0.1);
  box-sizing: border-box;
  margin-left: 14px;
  border-radius: 8px;
  padding: 9px 5px;
  &-wrapper {
    display: flex;
    align-items: center;
    // flex: 5;
    &-content {
      font-size: 27px;
      &-priceandname {
        display: flex;
        & span:nth-child(1) {
          font-weight: bolder;
          color: #E34514;
        }
        & span:nth-child(1):before {
          content: '￥';
          color: #E34514;
          font-weight: bold;
          font-size: 16px;
        }
        & span:nth-child(2) {
          font-size: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 74px;
          color: #E34514;
          margin-left: 8px;
        }
      }
      &-date {
        font-size: 12px;
        color: rgba(227, 69, 20, 0.6);
      }
    }
    &-btn {
      // flex: 3;
      font-size: 13px;
      text-align: center;
      color: #E34514;
      font-weight: bolder;
      border-left: 1px solid rgba(0, 0, 0, 0.1);
      white-space: normal;
    }
  }
}
</style>
