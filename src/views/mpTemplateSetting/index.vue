<template>
  <div class="mp-container">
    <header>
      <div class="back">
        <img :src="require('@/assets/images/fh.png')">
      </div>
      <span class="title">页面编辑</span>
      <div class="btnBox">
        <button class="btnBox-btn1">启用</button>
        <button class="btnBox-btn2" @click="save">保存</button>
        <button class="btnBox-btn3">预览</button>
      </div>
    </header>
    <div class="mp-container-main">
      <div class="mp-container-main-toolsWrapper">
        <h4>基础模块</h4>
        <ul>
          <li>
            <div class="menuItem" v-for="item in toolList.baseTools" @mousedown="mousedown($event, item.type)" @mouseup="mouseup($event, item.type)">
              <div class="menuItem-box">
                <img class="menuItem-box-img" :src="item.type === activeType ? item.aimg : item.img">
                <span class="menuItem-box-title">{{item.title}}</span>
              </div>
            </div>
          </li>
        </ul>
        <h4>营销</h4>
        <ul>
          <li>
            <div class="menuItem" v-for="item in toolList.marketTools" @mousedown="mousedown($event, item.type)" @mouseup="mouseup($event, item.type)">
              <div class="menuItem-box">
                <img class="menuItem-box-img" :src="item.type === activeType ? item.aimg : item.img">
                <span class="menuItem-box-title">{{item.title}}</span>
              </div>
            </div>
          </li>
        </ul>
        <h4>其他</h4>
        <ul>
          <li>
            <div class="menuItem" v-for="item in toolList.otherTools" @mousedown="mousedown($event, item.type)" @mouseup="mouseup($event, item.type)">
              <div class="menuItem-box">
                <img class="menuItem-box-img" :src="item.type === activeType ? item.aimg : item.img">
                <span class="menuItem-box-title">{{item.title}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="mp-container-main-phoneWrapper" id="mp-container-main-phoneWrapper">
        <div class="phoneBox">
          <div :style="`height: 57px;background:url(${require('@/assets/images/phonehead.jpg')});text-align: center;line-height: 73px;`" :class="{active: activeIndex === -1}" @click="activeIndex = -1" id="tools_header">
            {{tempData.pageName || '友数商城'}}
          </div>
          <!-- 可以定义固定的头部 -->
          <!-- <div id="tools_header" v-if="tempData.headerData.visible" style="height: 30px;background: #fff;" :class="{active: activeIndex === -1}" @click="selectTemp(-1)"></div> -->
          <!-- 主要模板定义区域 -->
          <div id="phoneScreen" ref="phoneScreen" class="phoneBox-main">
            <span id="test">
              <template v-for="(item, index) in tempData.mainDataList">
                <div v-if="item.type === 0" :key="index" :style="`height: 41px;background:url(${require('@/assets/images/mkfzq.png')})`"></div>
                <TempSearch v-if="item.type === 1" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempSearch>
                <TempMenu v-else-if="item.type === 2" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempMenu>
                <TempTitle v-else-if="item.type === 3" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempTitle>
                <TempProduct v-else-if="item.type === 4" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempProduct>
                <TempImg v-else-if="item.type === 5" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempImg>
                <TempEditor v-else-if="item.type === 6" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempEditor>
                <TempLine v-else-if="item.type === 7" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempLine>
                <TempWlink v-else-if="item.type === 8" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempWlink>
                <TempFixedPrice v-else-if="item.type === 9" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempFixedPrice>
                <TempCoupon v-else-if="item.type === 10" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempCoupon>
                <TempShop v-else-if="item.type === 11" :class="{active: activeIndex === index}" :data="item" :index="index" @selectTemp="selectTemp" @startMove="startMove" :key="index"></TempShop>
              </template>
            </span>
          </div>
          <!-- 可固定的底部 -->
          <div id="tools_footer" v-if="tempData.footerData.visible" style="height: 46px; border-top: 1px solid rgba(0,0,0,0.1); background: #fff;" :class="{active: activeIndex === -2}" @click="selectTemp(-2)">
          </div>
          <div class="tempTools" id="tempTools" :style="tempData.headerData.visible ? 'top: 57px' : 'top: 0'" v-show="!isNaN(activeIndex)">
            <div class="tempTools-left" v-if="activeIndex!== -1">
              <div @click="showRightTools = !showRightTools"><img :src="require('@/assets/images/edit.png')"></div>
              <div @click="moveTop"><img :src="require('@/assets/images/mtop.png')"></div>
              <div @click="moveDown"><img :src="require('@/assets/images/mdown.png')"></div>
              <div @click="deleteTemp" v-if="activeIndex!== -1 && activeIndex!== -2"><img :src="require('@/assets/images/del.png')"></div>
            </div>
            <div class="tempTools-right" v-show="showRightTools">
              <div class="tempTools-right-header">
                <span v-if="activeIndex >= 0">{{toolTitle }}设置</span>
                <span v-else>页面设置</span>
                <img @click="showRightTools = false" :src="require('@/assets/images/cls.png')">
              </div>
              <ComponentTools v-model="tempData" :activeIndex="activeIndex"></ComponentTools>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ComponentTools from './ComponentTools'
import TempSearch from './components/TempSearch'
import TempMenu from './components/TempMenu'
import TempTitle from './components/TempTitle'
import TempImg from './components/TempImg'
import TempEditor from './components/TempEditor'
import TempLine from './components/TempLine'
import TempProduct from './components/TempProduct'
import TempFixedPrice from './components/TempFixedPrice'
import TempWlink from './components/TempWlink'
import TempCoupon from './components/TempCoupon'
import TempShop from './components/TempShop'

import { moveSpace } from '@/utils'
import { addTemplate } from '@/api'

export default {
  components: {
    ComponentTools,
    TempSearch,
    TempMenu,
    TempTitle,
    TempImg,
    TempEditor,
    TempLine,
    TempProduct,
    TempFixedPrice,
    TempWlink,
    TempCoupon,
    TempShop
  },
  data() {
    return {
      toolList: {
        baseTools: [
          { type: 1, title: '搜索', img: require('@/assets/images/ss.png'), aimg: require('@/assets/images/ass.png') },
          { type: 2, title: '分类菜单', img: require('@/assets/images/flcd.png'), aimg: require('@/assets/images/aflcd.png') },
          { type: 3, title: '标题', img: require('@/assets/images/bt.png'), aimg: require('@/assets/images/abt.png') },
          { type: 4, title: '商品', img: require('@/assets/images/sp.png'), aimg: require('@/assets/images/asp.png') },
          { type: 5, title: '图片', img: require('@/assets/images/tp.png'), aimg: require('@/assets/images/atp.png') },
          { type: 6, title: '富文本', img: require('@/assets/images/fwb.png'), aimg: require('@/assets/images/afwb.png') },
          { type: 7, title: '分割线', img: require('@/assets/images/fgx.png'), aimg: require('@/assets/images/afgx.png') },
          { type: 8, title: '文字链接', img: require('@/assets/images/wzlj.png'), aimg: require('@/assets/images/awzlj.png') },
          { type: 9, title: '一口价', img: require('@/assets/images/ykj.png'), aimg: require('@/assets/images/aykj.png') }
        ],
        marketTools: [{ type: 10, title: '优惠券', img: require('@/assets/images/yhq.png'), aimg: require('@/assets/images/ayhq.png') }],
        otherTools: [{ type: 11, title: '同城门店列表', img: require('@/assets/images/tcmd.png'), aimg: require('@/assets/images/atcmd.png') }]
      },
      tempData: {
        headerData: {
          visible: false
        },
        mainDataList: [],
        footerData: {
          visible: false
        },
        tags: '',
        pageName: '',
        desc: ''
      },
      currentTemplate: '',
      offLX: 0,
      offLY: 0,
      activeIndex: NaN,
      activeType: -1,
      showRightTools: true,
      changeTempData: '',
      isChange: false
    }
  },
  watch: {
    activeIndex(val, oldVal) {
      this.$nextTick(() => {
        const tempDoms = [...document.getElementById('test').children]
        if (val !== '' && val >= 0) {
          document.getElementById('tempTools').style.top = tempDoms[val].offsetTop + 57 + (this.tempData.headerData.visible ? 30 : 0) + 'px'
        } else if (val === -1) {
          document.getElementById('tempTools').style.top = document.getElementById('tools_header').offsetTop + 'px'
          this.showRightTools = true
        } else if (val === -2 && this.tempData.footerData.visible) {
          document.getElementById('tempTools').style.top = document.getElementById('tools_footer').offsetTop + 'px'
        }
      })
    }
  },
  computed: {
    toolTitle() {
      let str = ''
      const type = this.tempData.mainDataList[this.activeIndex].type
      const arr1 = this.toolList.baseTools
      const arr2 = this.toolList.marketTools
      const arr3 = this.toolList.otherTools
      for(const item of arr1) {
        if (item.type === type) return str = item.title
      }
      for(const item of arr2) {
        if (item.type === type) return str = item.title
      }
      for(const item of arr3) {
        if (item.type === type) return str = item.title
      }
    }
  },
  methods: {
    setMouseRel(event, currentTemplate) {
      //获取鼠标当前坐标 
      const pageX = event.clientX
      const pageY = event.clientY
      //获取block的坐标，左边界和上边界 
      const offX = parseInt(currentTemplate.style.left) || 0
      const offY = parseInt(currentTemplate.style.top) || 0
      this.currentTemplate = currentTemplate

      //计算出鼠标坐标相对于组件坐标的间距 
      this.offLX = pageX - offX
      this.offLY = pageY - offY
    },
    mousedown(event, type) {
      this.activeIndex = NaN
      this.activeType = type
      const currentTemplate = event.currentTarget.cloneNode(true)
      currentTemplate.style['z-index'] = 10
      currentTemplate.style.background = 'rgba(0,0,0,0.2)'
      currentTemplate.style.position = 'fixed'
      currentTemplate.style.top = event.currentTarget.getBoundingClientRect().y + 'px'
      currentTemplate.style.left = event.currentTarget.getBoundingClientRect().x + 'px'
      event.currentTarget.appendChild(currentTemplate)

      this.setMouseRel(event, currentTemplate)

      document.onmousemove = this.setPosition
    },
    mouseup(event, type) {
      // 如果在手机屏幕中
      if (this.isContainer()) {
        // 添加一个组件块（或者替换空白格）
        const i = this.tempData.mainDataList.findIndex(item => {
          return item.type === 0
        })
        this.$set(this.tempData.mainDataList, i, this.getObjModel(type))

        this.activeIndex = i

        event.currentTarget.removeChild(this.currentTemplate)
      } else {
        event.currentTarget.removeChild(this.currentTemplate)
      }
      this.activeType = -1
      document.onmousemove = null
    },
    startMove(event, i) {
      this.activeIndex = NaN
      this.isChange = true
      const currentTemplate = event.currentTarget

      const copyTemp = currentTemplate.cloneNode(true)
      copyTemp.style.position = 'fixed'
      copyTemp.style.top = currentTemplate.getBoundingClientRect().y + 'px'
      copyTemp.style.left = currentTemplate.getBoundingClientRect().x + 'px'
      copyTemp.style.width = currentTemplate.offsetWidth + 'px'
      document.getElementById('phoneScreen').appendChild(copyTemp)

      copyTemp.onmouseup = this.stopMove

      this.setMouseRel(event, copyTemp)

      this.changeTempData = this.tempData.mainDataList[i]

      this.$set(this.tempData.mainDataList, i, this.getObjModel(0))

      document.onmousemove = this.setPosition
    },
    stopMove() {
      if (this.currentTemplate) document.getElementById('phoneScreen').removeChild(this.currentTemplate)
      const i = this.tempData.mainDataList.findIndex(item => {
        return item.type === 0
      })
      this.$set(this.tempData.mainDataList, i, this.changeTempData)
      this.activeIndex = i
      this.isChange = false
      document.onmousemove = null
    },
    changePosition(event) {
      this.currentTemplate.style.left = event.clientX - this.offLX + 'px' // 设置block的X坐标
      this.currentTemplate.style.top = event.clientY - this.offLY + 'px' // 设置block的Y坐标
    },
    setPosition(event) {
      // 获取占位组件的index
      const spaceIdx = this.tempData.mainDataList.findIndex(item => {
        return item.type === 0
      })
      this.currentTemplate.style.left = event.clientX - this.offLX + 'px' // 设置block的X坐标
      this.currentTemplate.style.top = event.clientY - this.offLY + 'px' // 设置block的Y坐标
      // // 如果被拖入了屏幕中
      if (this.isContainer()) {
        // 判断数组是否有组件，如果没有先添加一个空白区域
        if (this.tempData.mainDataList.length === 0) {
          this.tempData.mainDataList.push({ type: 0 })
        } else {
          // 数组是有组件的再判断鼠标位置是在空白区域还是组件位置还是都不在
          const indexObj = this.getNewSpaceIndex(event.pageY)
          // 如果移动到了空白区域
          if (!indexObj) {
            if (spaceIdx === -1) this.tempData.mainDataList.push({ type: 0 })
            else {
              // 如果占位组件不在最后一行
              if (spaceIdx !== this.tempData.mainDataList.length - 1) {
                this.tempData.mainDataList.splice(spaceIdx, 1)
                this.tempData.mainDataList.push({ type: 0 })
              }
            }
          } else if (indexObj.type !== 0) {
            // 如果在系统组件上部分
            if (indexObj.isTopPart) {
              if (spaceIdx !== -1 && spaceIdx !== indexObj.index - 1) {
                moveSpace(this.tempData.mainDataList, spaceIdx, indexObj.index)
              } else if (spaceIdx === -1) this.tempData.mainDataList.splice(indexObj.index, 0, { type: 0 })
            } else {
              if (spaceIdx !== -1 && spaceIdx !== indexObj.index + 1) {
                moveSpace(this.tempData.mainDataList, spaceIdx, indexObj.index)
              } else if (spaceIdx === -1) this.tempData.mainDataList.splice(indexObj.index + 1, 0, { type: 0 })

              // 判断是否超出屏幕，超出屏幕则滚动到浏览器底部
              if (spaceIdx === this.tempData.mainDataList.length - 1) {
                const ele = document.getElementById('mp-container-main-phoneWrapper')
                ele.scrollTop = ele.scrollHeight
              }
            }
          }
        }
      } else {
        if (spaceIdx !== -1 && !this.isChange) this.tempData.mainDataList.splice(spaceIdx, 1)
      }
    },
    // 判断是否移入了手机屏幕
    isContainer() {
      let flag = false
      // 获取手机屏幕位置信息 
      const screenPositionObj = this.$refs.phoneScreen.getBoundingClientRect()
      const templatePositionObj = this.currentTemplate.getBoundingClientRect()

      const s_rx = screenPositionObj.x + screenPositionObj.width
      const t_rx = templatePositionObj.x + templatePositionObj.width
      const s_lx = screenPositionObj.x
      const t_lx = templatePositionObj.x
      // 在左边进入
      if (t_lx < s_lx) {
        if (t_rx - s_lx >= templatePositionObj.width / 2 && (templatePositionObj.y > screenPositionObj.y - templatePositionObj.height / 2 && templatePositionObj.y < screenPositionObj.y + screenPositionObj.height - templatePositionObj.height / 2)) {
          flag = true
        }
      } else {
        if (s_rx - t_lx >= templatePositionObj.width / 2 && (templatePositionObj.y > screenPositionObj.y - templatePositionObj.height / 2 && templatePositionObj.y < screenPositionObj.y + screenPositionObj.height - templatePositionObj.height / 2)) {
          flag = true
        }
      }

      return flag
    },
    // 找到屏幕中所有的子元素的上边Y和下边界y通过鼠标位置找出提示框应该插入的位置
    getNewSpaceIndex(pageY) {
      let indexObj
      const that = this
      const toolDoms = [...document.getElementById('test').children]
      const arr = toolDoms.map(item => {
        return [item.getBoundingClientRect().y, item.getBoundingClientRect().y + item.getBoundingClientRect().height]
      })
      arr.forEach((item, i) => {
        // 如果移动到了占位组件上
        if (this.tempData.mainDataList[i] && this.tempData.mainDataList[i].type === 0 && pageY >= item[0] && pageY <= item[1]) {
          return indexObj = { type: 0, index: i }
        }
        // 如果移动到了实体组件上
        if (pageY >= item[0] && pageY <= item[1]) {

          if (pageY - item[0] <= item[1] - pageY) {
            return indexObj = { type: this.tempData.mainDataList[i].type, index: i, isTopPart: true }
          } else {
            return indexObj = { type: this.tempData.mainDataList[i].type, index: i, isTopPart: false }
          }
        }
      })
      return indexObj
    },
    moveTop() {
      if (this.activeIndex > 0) {
        // es6解构赋值
        [this.tempData.mainDataList[this.activeIndex], this.tempData.mainDataList[this.activeIndex - 1]] = [this.tempData.mainDataList[this.activeIndex - 1], this.tempData.mainDataList[this.activeIndex]]
        this.activeIndex--
      } else if (this.activeIndex === 0) {
        this.activeIndex = -1
      } else if (this.activeIndex === -2) {
        if (this.tempData.mainDataList.length > 0) this.activeIndex = this.tempData.mainDataList.length - 1
        else this.activeIndex = -1
      }
    },
    moveDown() {
      if (this.activeIndex < this.tempData.mainDataList.length - 1) {
        // es6解构赋值
        if (this.activeIndex >= 0)[this.tempData.mainDataList[this.activeIndex], this.tempData.mainDataList[this.activeIndex + 1]] = [this.tempData.mainDataList[this.activeIndex + 1], this.tempData.mainDataList[this.activeIndex]]
        if (this.activeIndex !== -2) this.activeIndex++
      } else if (this.activeIndex === this.tempData.mainDataList.length - 1 && this.tempData.footerData.visible) {
        this.activeIndex = -2
      }
    },
    deleteTemp() {
      this.tempData.mainDataList.splice(this.activeIndex, 1)
      this.activeIndex = NaN
    },
    selectTemp(index) {
      this.activeIndex = index
    },
    getObjModel(type) {
      let modelObj
      switch (type) {
        case 0:
          modelObj = {
            type: type
          }
          break
        case 1:
          modelObj = {
            type: type,
            dynamicCss: {
              background: '',
            },
            fixedCssType: 1,
            keyWord: ''
          }
          break
        case 2:
          modelObj = {
            type: type,
            isImg: true,
            isTopTitle: false,
            position: 1,
            slide: false,
            menuList: [{title: '', subTitle: '', link: '', imgUrl: ''},{title: '', subTitle: '', link: '', imgUrl: ''},{title: '', subTitle: '', link: '', imgUrl: ''},{title: '', subTitle: '', link: '', imgUrl: ''}]
          }
          break
        case 3:
          modelObj = {
            type: type,
            position: 1,
            fixedCssType: 1,
            dynamicCss: {
              background: '#cdaf28',
            },
            title: '',
            subTitle: '',
            linkVisible: true,
            linkContent: '',
            link: ''
          }
          break
        case 4:
          modelObj = {
            type: type,
            fixedCssType: 2,
            productCssList: [],
            button: {
              type: 1,
              background: '#F84B3F'
            },
            logoType: 1,
            customLogo: '',
            productList: []
          }
          break
        case 5:
          modelObj = {
            type: type,
            fixedCssType: 1,
            isFill: true,
            imgList: [{title: '测试一下', link: '', imgUrl: ''}]
          }
          break
        case 6:
          modelObj = {
            type: type,
            dynamicCss: {
              background: '',
            },
            content: ''
          }
          break
        case 7:
          modelObj = {
            type: type,
            isBlock: false,
            dynamicCss: {
              height: 0,
              background: '',
              padding: '0',
              lineStyle: 'dotted'
            }
          }
          break
        case 8:
          modelObj = {
            type: type,
            content: '',
            dynamicCss: {
              color: '#333333',
              background: '#ffffff'
            },
            font: 1,
            position: 1,
            showErrow: true,
            link: ''
          }
          break
        case 9:
          modelObj = {
            type: type,
            activity: '',
            fixedCssType: 2,
            productCssList: [],
            button: {
              type: 1,
              background: '#F84B3F'
            },
            logo: {
              type: 1,
              background: '#F84B3F'
            },
            productList: []
          }
          break
        case 10:
          modelObj = {
            type: type,
            autoAdd: true,
            fixedCssType: 1,
            moreSetting: true,
            couponList: []
          }
          break
        case 11:
          modelObj = {
            type: type
          }
          break
      }
      return modelObj
    },
    save() {
      addTemplate(this.tempData).then(res => {

      })
    }
  }
}

</script>
<style lang="scss" scoped>
.active {
  border: 2px solid #CDAF28!important;
  box-sizing: border-box;
}

.mp-container {
  height: 100%;
  overflow: hidden;
  header {
    height: 58px;
    width: 100%;
    text-align: center;
    position: relative;
    .back {
      position: absolute;
      left: 26px;
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    .title {
      line-height: 58px;
      font-size: 18px;
      height: 90%;
      display: inline-block;
      width: 131px;
    }
    .btnBox {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      padding-right: 32px;
      display: flex;
      align-items: center;
      &-btn1 {
        width: 108px;
        height: 36px;
        background: rgba(205, 175, 40, 1);
        border-radius: 18px;
        border: none;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
        outline: none;
      }
      &-btn2 {
        width: 108px;
        height: 36px;
        background: #fff;
        border-radius: 18px;
        border: 1px solid rgba(205, 175, 40, 1);
        font-size: 18px;
        margin-left: 24px;
        cursor: pointer;
        outline: none;
      }
      &-btn3 {
        width: 108px;
        height: 36px;
        background: #fff;
        border-radius: 18px;
        border: 1px solid rgba(205, 175, 40, 1);
        font-size: 18px;
        margin-left: 24px;
        cursor: pointer;
        outline: none;
      }
    }
  }

  .mp-container-main {
    height: calc(100% - 58px);
    display: flex;
    background: #f1f1f1;
    &-toolsWrapper {
      height: 100%;
      width: 372px;
      background: #fff;
      border-top: 2px solid #f1f1f1;
      box-sizing: border-box;
      overflow-y: scroll;
      &::-webkit-scrollbar {
        display: none;
      }
      h4 {
        padding-left: 34px;
        color: #CDAF28;
        font-size: 16px;
      }
      ul {
        list-style-type: none;
        -webkit-padding-start: 0;
        font-size: 0;
        li {
          // text-align: left;
          .menuItem {
            width: calc(372px / 3);
            height: calc(372px / 3);
            position: relative;
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            cursor: -webkit-grab;
            &-box {
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              &-title {
                font-size: 14px;
                color: #666666;
                margin-top: 15px;
              }
            }
          }
        }
      }
    }
    &-phoneWrapper {
      height: 100%;
      width: calc(100% - 372px);
      position: relative;
      overflow-y: scroll;
      .phoneBox {
        position: absolute;
        top: 64px;
        left: 185px;
        box-shadow: 0px 0px 23px rgba(21, 33, 58, 0.08);
        .phoneBox-main {
          width: 374px;
          min-height: 562px;
          background: #fff;
          position: relative;
        }
        .tempTools {
          position: absolute;
          left: 380px; // top: 0;
          display: flex;
          &-left {
            width: 35px;
            height: 134px;
            border-radius: 4px;
            background: #fff;
            box-shadow: 0px 0px 23px rgba(21, 33, 58, 0.08);
            div {
              height: 33.5px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            }
          }
          &-right {
            width: 407px;
            margin-left: 7px;
            background: #fff;
            box-shadow: 0px 0px 23px rgba(21, 33, 58, 0.08);
            border-radius: 4px;
            &-header {
              padding: 10px 14px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              span {
                font-size: 14px;
                color: #CDAF28;
                font-weight: bolder;
              }
              img {
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}

</style>
