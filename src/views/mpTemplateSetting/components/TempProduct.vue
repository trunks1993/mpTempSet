<template>
  <div class="product-container" @click="selectTemp" @mousedown="startMove($event)">
    <div class="cssType_1" v-if="data.fixedCssType === 1">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="tip" v-if="data.productCssList.includes(4)">
          <img :src="require('@/assets/componetImg/biao.png')">
          <span>{{data.logoType === 1 ? '新品' : data.logoType === 2 ? '热卖' : data.customLogo }}</span>
        </div>
        <div class="imgbox">
          <img :src="item.imagePath">
        </div>
        <div class="title">
          {{item.ProductName}}
        </div>
        <div class="priceBox">
          <span class="price">￥{{item.MinSalePrice}}</span>
          <div class="shopcar" v-if="data.productCssList.includes(3)" :style="'background:' + data.button.background">
            <img :src="data.button.type === 1 ? require('@/assets/images/shopcar.png') : require('@/assets/componetImg/plus2.png')"> 加入购物车
          </div>
        </div>
      </div>
    </div>
    <div class="cssType_2" v-if="data.fixedCssType === 2">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="tip" v-if="data.productCssList.includes(4)">
          <img :src="require('@/assets/componetImg/biao.png')">
          <span>{{data.logoType === 1 ? '新品' : data.logoType === 2 ? '热卖' : data.customLogo }}</span>
        </div>
        <div class="imgbox">
          <img :src="item.imagePath">
        </div>
        <div class="title">
          {{item.ProductName}}
        </div>
        <div class="priceBox">
          <span class="price">￥{{item.MinSalePrice}}</span>
          <div class="shopcar" v-if="data.productCssList.includes(3)" :style="'background:' + data.button.background">
            <img :src="data.button.type === 1 ? require('@/assets/images/shopcar.png') : require('@/assets/componetImg/plus2.png')">
          </div>
        </div>
      </div>
    </div>
    <div class="cssType_3" v-if="data.fixedCssType === 3">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="tip" v-if="data.productCssList.includes(4)">
          <img :src="require('@/assets/componetImg/biao.png')">
          <span>{{data.logoType === 1 ? '新品' : data.logoType === 2 ? '热卖' : data.customLogo }}</span>
        </div>
        <div class="imgbox">
          <img :src="item.imagePath">
        </div>
        <div class="title">
          {{item.ProductName}}
        </div>
        <div class="priceBox">
          <span class="price">￥{{item.MinSalePrice}}</span>
          <div class="shopcar" v-if="data.productCssList.includes(3)" :style="'background:' + data.button.background">
            <img :src="data.button.type === 1 ? require('@/assets/images/shopcar.png') : require('@/assets/componetImg/plus2.png')">
          </div>
        </div>
      </div>
    </div>
    <div class="cssType_4" v-if="data.fixedCssType === 4">
    </div>
    <div class="cssType_5" v-if="data.fixedCssType === 5">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="imgbox">
          <img :src="item.imagePath">
        </div>
        <div class="tip" v-if="data.productCssList.includes(4)">
          <img :src="require('@/assets/componetImg/biao.png')">
          <span>{{data.logoType === 1 ? '新品' : data.logoType === 2 ? '热卖' : data.customLogo }}</span>
        </div>
        <div class="right">
          <div class="title">
            {{item.ProductName}}
          </div>
          <div class="priceBox">
            <span class="price">￥{{item.MinSalePrice}}</span>
            <div class="shopcar" v-if="data.productCssList.includes(3)" :style="'background:' + data.button.background">
              <img :src="data.button.type === 1 ? require('@/assets/images/shopcar.png') : require('@/assets/componetImg/plus2.png')">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="cssType_3" v-if="data.fixedCssType === 6" style="overflow: hidden;height: 190px;">
      <div class="cssType_item" v-for="item in data.productList">
        <div class="tip" v-if="data.productCssList.includes(4)">
          <img :src="require('@/assets/componetImg/biao.png')">
          <span>{{data.logoType === 1 ? '新品' : data.logoType === 2 ? '热卖' : data.customLogo }}</span>
        </div>
        <div class="imgbox">
          <img :src="item.imagePath">
        </div>
        <div class="title">
          {{item.ProductName}}
        </div>
        <div class="priceBox">
          <span class="price">￥{{item.MinSalePrice}}</span>
          <div class="shopcar" v-if="data.productCssList.includes(3)" :style="'background:' + data.button.background">
            <img :src="data.button.type === 1 ? require('@/assets/images/shopcar.png') : require('@/assets/componetImg/plus2.png')">
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
.cssType_1 {
  padding: 8px;
  .cssType_item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    position: relative;
    .tip {
      position: absolute;
      width: 98px;
      height: 34px;
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
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
      color: #333333;
      height: 37px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
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
        padding: 5px 10px;
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
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
      color: #333333;
      height: 37px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
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
      .shopcar {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        color: #fff;
        font-size: 14px;
        width: 25px;
        height: 25px;
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
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
      color: #333333;
      height: 37px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
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
      .shopcar {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        color: #fff;
        font-size: 14px;
        width: 25px;
        height: 25px;
      }
    }
  }
}

.cssType_5 {
  padding: 0 15px 0 6px;
  .cssType_item {
    height: 76px;
    display: flex;
    position: relative;
    .tip {
      position: absolute;
      width: 62px;
      height: 21px;
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
      width: 78px;
      height: 76px;
      position: relative;
      img {
        max-width: 100%;
        max-height: 100%;
        @extend .no-flex-center;
      }
    }
    .right {
      margin-left: 15px;
      width: calc(100% - 93px);
      .title {
        font-size: 14px;
        padding: 0 5px;
        color: #333333;
        height: 37px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }
      .priceBox {
        height: 40px;
        // padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price {
          color: #E9440B;
        }
        .shopcar {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 25px;
          color: #fff;
          font-size: 14px;
          width: 25px;
          height: 25px;
        }
      }
    }
  }
  .cssType_item:not(:first-child) {
    margin-top: 15px;
  }
}

</style>
