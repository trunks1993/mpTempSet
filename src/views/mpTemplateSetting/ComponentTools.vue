<template>
  <div class="tools-container">
    <!-- {{value}} {{activeIndex}} -->
    <template v-if="activeIndex !== -1 && activeIndex !== -2">
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 1">
        <li>
          <span class="title">默认搜索词</span>
          <el-input size="mini" v-model="tempData.keyWord" style="width: 294px;"></el-input>
        </li>
        <li>
          <span class="title">样式</span>
          <template>
            <el-radio v-model="tempData.fixedCssType" :label="1">样式1</el-radio>
            <el-radio v-model="tempData.fixedCssType" :label="2">样式2</el-radio>
          </template>
        </li>
        <li>
          <span class="title">背景颜色</span>
          <el-color-picker v-model="tempData.dynamicCss.background"></el-color-picker>
          <div class="resetColor" @click="tempData.dynamicCss.background = ''">重置</div>
        </li>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 2">
        <li>
          <span class="title">模板</span>
          <div class="menuSel" :class="{menu_active: tempData.isImg}" @click="tempData.isImg = true">
            <img :src="require('@/assets/componetImg/sel_menuimg.png')">
            <span>图片菜单</span>
          </div>
          <div class="menuSel" :class="{menu_active: !tempData.isImg}" style="margin-left: 33px; padding-top: 18px;" @click="tempData.isImg = false">
            <img :src="require('@/assets/componetImg/sel_contentimg.png')">
            <span>文字菜单</span>
          </div>
        </li>
        <li>
          <span class="title">滑动</span>
          <template>
            <el-radio v-model="tempData.slide" :label="false">固定</el-radio>
            <el-radio v-model="tempData.slide" :label="true">滑动</el-radio>
          </template>
        </li>
        <li v-if="!tempData.isImg && !tempData.slide">
          <span class="title">位置</span>
          <template>
            <el-radio v-model="tempData.position" :label="1">居左</el-radio>
            <el-radio v-model="tempData.position" :label="2">居中</el-radio>
            <el-radio v-model="tempData.position" :label="3">居右</el-radio>
          </template>
        </li>
        <li v-if="tempData.isImg">
          <span class="title">位置</span>
          <template>
            <el-radio v-model="tempData.isTopTitle" :label="true">文字在上</el-radio>
            <el-radio v-model="tempData.isTopTitle" :label="false">文字在下</el-radio>
          </template>
        </li>
        <li class="formli">
          <div class="formBox" v-for="(item, index) in tempData.menuList">
            <div class="formBox-tool">
              <img :src="index === 0 ? ncmt:cmt" @click="changeStatus('moveTop', index, tempData.menuList)" @mouseover="hover(true, index !== 0)" @mouseout="hover(false)">
              <img :src="index === tempData.menuList.length - 1 ? ncmd : cmd" @click="changeStatus('moveDown', index, tempData.menuList)" @mouseover="hover(true, index !== tempData.menuList.length - 1)" @mouseout="hover(false)">
              <img :src="tempData.menuList.length === 1 ? ncc : cc" @click="changeStatus('close', index, tempData.menuList)" @mouseover="hover(true, tempData.menuList.length !== 1)" @mouseout="hover(false)">
            </div>
            <img width="52px" height="52px" :src="item.iconUrl || require('@/assets/componetImg/nomenu.png')" v-if="tempData.isImg">
            <div class="formBox-right">
              <div>
                <span class="formBox-right-title" :class="{require: !tempData.isImg, noreq: tempData.isImg}">分类名:</span>
                <el-input v-model="item.title" size="mini" :maxlength='4' :style="tempData.isImg ? 'width: 230px;' : 'width: 280px;'">
                  <span style="display: flex;align-items: center;height: 100%;" slot="suffix">{{item.title.length}}/4</span>
                </el-input>
              </div>
              <div style="margin: 7px 0;" v-if="tempData.isImg && tempData.isTopTitle">
                <span class="formBox-right-title" :class="{require: !tempData.isImg, noreq: tempData.isImg}">副标题:</span>
                <el-input v-model="item.subTitle" size="mini" :maxlength='8' :style="tempData.isImg ? 'width: 230px;' : 'width: 280px;'">
                  <span style="display: flex;align-items: center;height: 100%;" slot="suffix">{{item.subTitle.length}}/8</span>
                </el-input>
              </div>
              <div :style="!tempData.isImg || !tempData.isTopTitle ? 'margin-top: 7px;' : ''">
                <span class="formBox-right-title require">链接到:</span>
                <el-input v-model="item.link" size="mini" placeholder="请选择链接的页面" readonly :style="tempData.isImg ? 'width: 230px;' : 'width: 280px;'">
                  <div slot="suffix" style="display: flex;align-items: center;height: 100%;cursor: pointer;">
                    <img :src="!item.link ? require('@/assets/componetImg/linkimg1.png') : require('@/assets/componetImg/linkimg2.png')">
                  </div>
                </el-input>
              </div>
            </div>
          </div>
          <div class="addmenu" v-if="tempData.menuList.length < 5">
            <div class="addmenu-add" @click="addmenu">
              <div class="addmenu-add-plus">
                <img :src="require('@/assets/componetImg/plus.png')">
                <span>添加图片</span>
              </div>
            </div>
          </div>
          <div style="text-align: center; font-size:16px; color: rgba(0,0,0,0.2);" v-else>
            已添加至最多5个分类
          </div>
        </li>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 3">
        <li>
          <span class="title">位置</span>
          <template>
            <el-radio v-model="tempData.position" :label="1">居左</el-radio>
            <el-radio v-model="tempData.position" :label="2">居中</el-radio>
            <el-radio v-model="tempData.position" :label="3">居右</el-radio>
          </template>
        </li>
        <li>
          <span class="title">样式</span>
          <template>
            <el-radio v-model="tempData.fixedCssType" :label="1">前置线</el-radio>
            <el-radio v-model="tempData.fixedCssType" :label="2">下划线</el-radio>
            <el-radio v-model="tempData.fixedCssType" :label="3">纯文字</el-radio>
          </template>
        </li>
        <li style="margin-bottom: 7px;">
          <span class="title">标题</span>
          <el-input v-model="tempData.title" size="mini" :maxlength='20' style="width: 280px;">
            <span style="display: flex;align-items: center;height: 100%;" slot="suffix">{{tempData.title.length}}/20</span>
          </el-input>
        </li>
        <li>
          <span class="title">副标题</span>
          <el-input v-model="tempData.subTitle" size="mini" :maxlength='30' style="width: 280px;">
            <span style="display: flex;align-items: center;height: 100%;" slot="suffix">{{tempData.subTitle.length}}/30</span>
          </el-input>
        </li>
        <li>
          <span class="title">样式线颜色</span>
          <el-color-picker v-model="tempData.dynamicCss.background"></el-color-picker>
          <div class="resetColor" @click="tempData.dynamicCss.background = ''">重置</div>
        </li>
        <li class="dashBox" v-if="tempData.link.visible">
          <img class="dashBox-closeImg" :src="require('@/assets/componetImg/close.png')" @click="tempData.link.visible = false">
          <div class="dashBox-item">
            <span class="dashBox-item-require">链接到：</span>
            <input type="text" v-model="tempData.link.url">
          </div>
          <div class="dashBox-item">
            <span>提示语：</span>
            <input type="text" v-model="tempData.link.note">
          </div>
        </li>
        <li class="dashBox_1" v-else @click="tempData.link.visible = true">
          <span>添加链接</span>
        </li>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 4">
        <li style="align-items: flex-start;">
          <span class="title">布局</span>
          <div>
            <div style="display: flex;">
              <el-radio v-model="tempData.fixedCssType" :label="1">一行一列</el-radio>
              <el-radio v-model="tempData.fixedCssType" :label="2">一行两列</el-radio>
              <el-radio v-model="tempData.fixedCssType" :label="3">一行三列</el-radio>
            </div>
            <div style="display: flex; margin-top: 15px;">
              <el-radio v-model="tempData.fixedCssType" :label="4">一大两小</el-radio>
              <el-radio v-model="tempData.fixedCssType" :label="5">详细列表</el-radio>
              <el-radio v-model="tempData.fixedCssType" :label="6">横向滑动</el-radio>
            </div>
          </div>
        </li>
        <li :style="'align-items: flex-start;' + (tempData.productCssList.includes(3) || tempData.productCssList.includes(4) ? 'margin-bottom: 0' : 'margin-bottom: 24px')">
          <span class="title">显示内容</span>
          <el-checkbox-group v-model="tempData.productCssList">
            <div style="display: flex; justify-content: space-between;">
              <el-checkbox :label="1">商品名称</el-checkbox>
              <el-checkbox :label="2">商品价格</el-checkbox>
            </div>
            <div style="margin-top: 20px;width: 230px;display: flex;justify-content: space-between;">
              <div style="display: inline-block;position: relative;">
                <el-checkbox :label="3">加入购物车按钮</el-checkbox>
              </div>
              <div style="display: inline-block;position: relative;"> 
                <el-checkbox :label="4">商品角标</el-checkbox>
              </div>
            </div>
          </el-checkbox-group>
        </li>
        <li v-if="tempData.productCssList.includes(3) || tempData.productCssList.includes(4)">
          <span class="title"></span>
          <div v-if="tempData.productCssList.includes(3)" style="width: 128px;height: 98px;background: #F2F2F2; text-align: center;">
            <div>
              <el-radio v-model="tempData.button.type" :label="1">样式1</el-radio>
            </div>
            <div>
              <el-radio v-model="tempData.button.type" :label="2">样式2</el-radio>
            </div>
            <el-color-picker v-model="tempData.button.background"></el-color-picker>
          </div>
          <div v-if="tempData.productCssList.includes(4)" :style="'width: 128px;height: 98px;background: #F2F2F2;' + (tempData.productCssList.includes(3) ? 'margin-left: 20px;' : 'margin-left: 148px;')">
            <div>
              <el-radio v-model="tempData.logoType" :label="1">新品</el-radio>
            </div>
            <div>
              <el-radio v-model="tempData.logoType" :label="2">热卖</el-radio>
            </div>
            <div>
              <el-radio v-model="tempData.logoType" :label="3">自定义</el-radio>
            </div>
          </div>
        </li>
        <li style="align-items: flex-start;">
          <span class="title">选择商品</span>
          <div>
            <div style="width: 62px;height: 62px;background: red;display: inline-block;"></div>
            <div style="width: 62px;height: 62px;background: red;display: inline-block;"></div>
            <div style="width: 62px;height: 62px;background: red;display: inline-block;"></div>
            <div style="width: 62px;height: 62px;background: red;display: inline-block;"></div>
            <div style="width: 62px;height: 62px;background: red;display: inline-block;"></div>
          </div>
        </li>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 5">
        <li>
          <span class="title">模板</span>
          <div class="menuSel" :class="{menu_active: tempData.fixedCssType === 1}" @click="tempData.fixedCssType = 1">
            <img :src="require('@/assets/componetImg/sel_menuimg.png')">
            <span>轮播广告</span>
          </div>
          <div class="menuSel" :class="{menu_active: tempData.fixedCssType === 2}" style="margin-left: 12px; padding-top: 18px;" @click="tempData.fixedCssType = 2">
            <img :src="require('@/assets/componetImg/sel_contentimg.png')">
            <span>横向滑动(大)</span>
          </div>
          <div class="menuSel" :class="{menu_active: tempData.fixedCssType === 3}" style="margin-left: 12px; padding-top: 18px;" @click="tempData.fixedCssType = 3">
            <img :src="require('@/assets/componetImg/sel_contentimg.png')">
            <span>横向滑动(小)</span>
          </div>
        </li>
        <li>
          <span class="title">填充方式</span>
          <template>
            <el-radio v-model="tempData.isFill" :label="true">填充</el-radio>
            <el-radio v-model="tempData.isFill" :label="false">边留白</el-radio>
          </template>
        </li>
        <li class="formli">
          <div class="formBox" v-for="(item, index) in tempData.imgList">
            <div class="formBox-tool">
              <img :src="index === 0 ? ncmt:cmt" @click="changeStatus2('moveTop', index, tempData.imgList)" @mouseover="hover(true, index !== 0)" @mouseout="hover(false)">
              <img :src="index === tempData.imgList.length - 1 ? ncmd : cmd" @click="changeStatus2('moveDown', index, tempData.imgList)" @mouseover="hover(true, index !== tempData.imgList.length - 1)" @mouseout="hover(false)">
              <img :src="tempData.imgList.length === 1 ? ncc : cc" @click="changeStatus2('close', index, tempData.imgList)" @mouseover="hover(true, tempData.menuList.length !== 1)" @mouseout="hover(false)">
            </div>
            <img width="85px" height="70px" :src="item.iconUrl || require('@/assets/componetImg/nomenu.png')">
            <div class="formBox-right">
              <div class="formBox-right-item">
                <span class="formBox-right-title noreq">标题:</span>
                <el-input v-model="item.title" size="mini" :maxlength='4' style="width: 200px;">
                  <span style="display: flex;align-items: center;height: 100%;" slot="suffix">{{item.title.length}}/4</span>
                </el-input>
              </div>
              <div class="formBox-right-item" :style="!tempData.isImg || !tempData.isTopTitle ? 'margin-top: 7px;' : ''">
                <span class="formBox-right-title require">链接到:</span>
                <el-input v-model="item.link" size="mini" placeholder="请选择链接的页面" readonly style="width: 200px;">
                  <div slot="suffix" style="display: flex;align-items: center;height: 100%;cursor: pointer;">
                    <img :src="!item.link ? require('@/assets/componetImg/linkimg1.png') : require('@/assets/componetImg/linkimg2.png')">
                  </div>
                </el-input>
              </div>
            </div>
          </div>
          <div class="addmenu" v-if="tempData.imgList.length < 8">
            <div class="addmenu-add" @click="addimg">
              <div class="addmenu-add-plus">
                <img :src="require('@/assets/componetImg/plus.png')">
                <span>添加图片</span>
              </div>
              <div class="addmenu-add-suj">建议宽度750×250px</div>
            </div>
          </div>
          <div style="text-align: center; font-size:16px; color: rgba(0,0,0,0.2);" v-else>
            已添加至最多8个图片
          </div>
        </li>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 6">
        <li>
          <span class="title">背景颜色</span>
          <el-color-picker v-model="tempData.dynamicCss.background"></el-color-picker>
          <div class="resetColor" @click="tempData.dynamicCss.background = ''">重置</div>
        </li>
        <ueditor class="ueditor" v-model="tempData.content" @ready="ueditorReady"></ueditor>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 7">
        <li>
          <span class="title">颜色</span>
          <el-color-picker v-model="tempData.dynamicCss.background"></el-color-picker>
          <div class="resetColor" @click="tempData.dynamicCss.background = ''">重置</div>
        </li>
        <li>
          <span class="title">分割符</span>
          <template>
            <el-radio v-model="tempData.isBlock" :label="false">线</el-radio>
            <el-radio v-model="tempData.isBlock" :label="true">块</el-radio>
          </template>
        </li>
        <li v-if="tempData.isBlock">
          <span class="title"></span>
          <span class="inline-title">高度</span>
          <div class="block">
            <el-slider v-model="tempData.dynamicCss.height" :min="5" :max="15"></el-slider>
          </div>
          <el-input-number v-model="tempData.dynamicCss.height" :min="5" :max="15" size="mini" style="width: 65px;margin-left: 12px;" :controls="false"></el-input-number>
        </li>
        <li>
          <span class="title">边距</span>
          <template>
            <el-radio v-model="tempData.dynamicCss.padding" label="0">无</el-radio>
            <el-radio v-model="tempData.dynamicCss.padding" label="10px">左右留边</el-radio>
          </template>
        </li>
        <li v-if="!tempData.isBlock">
          <span class="title">样式</span>
          <template>
            <el-radio v-model="tempData.dynamicCss.lineStyle" label="solid">实线</el-radio>
            <el-radio v-model="tempData.dynamicCss.lineStyle" label="dashed">虚线</el-radio>
            <el-radio v-model="tempData.dynamicCss.lineStyle" label="dotted">点线</el-radio>
          </template>
        </li>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 8">
        <li style="align-items: flex-start;">
          <span class="title">文本</span>
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="tempData.content">
          </el-input>
        </li>
        <li>
          <span class="title">字体大小</span>
          <template>
            <el-radio v-model="tempData.font" :label="1">大</el-radio>
            <el-radio v-model="tempData.font" :label="2">中</el-radio>
            <el-radio v-model="tempData.font" :label="3">小</el-radio>
          </template>
        </li>
        <li>
          <span class="title">文本颜色</span>
          <el-color-picker v-model="tempData.dynamicCss.color"></el-color-picker>
        </li>
        <li>
          <span class="title">背景颜色</span>
          <el-color-picker v-model="tempData.dynamicCss.background"></el-color-picker>
        </li>
        <li>
          <span class="title">显示位置</span>
          <template>
            <el-radio v-model="tempData.position" :label="1">居左</el-radio>
            <el-radio v-model="tempData.position" :label="2">居中</el-radio>
            <el-radio v-model="tempData.position" :label="3">居右</el-radio>
          </template>
        </li>
        <li>
          <span class="title">箭头</span>
          <template>
            <el-radio v-model="tempData.showErrow" :label="true">显示</el-radio>
            <el-radio v-model="tempData.showErrow" :label="false">隐藏</el-radio>
          </template>
        </li>
        <li>
          <span class="title">链接到</span>
          <el-input v-model="tempData.link" size="mini" placeholder="请选择链接的页面" readonly style="width: 200px;">
            <div slot="suffix" style="display: flex;align-items: center;height: 100%;cursor: pointer;">
              <img :src="require('@/assets/componetImg/linkimg2.png')">
            </div>
          </el-input>
        </li>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 10">
        <li>
          <span class="title">添加方式</span>
          <template>
            <el-radio v-model="tempData.autoAdd" :label="false">手动添加</el-radio>
            <el-radio v-model="tempData.autoAdd" :label="true">自动添加</el-radio>
          </template>
        </li>
        <li>
          <span class="title">样式</span>
          <div class="coupon">
            <el-radio v-model="tempData.fixedCssType" :label="1">样式1</el-radio>
            <el-radio v-model="tempData.fixedCssType" :label="2">样式2</el-radio>
            <el-radio v-model="tempData.fixedCssType" :label="3">样式3</el-radio>
            <el-radio v-model="tempData.fixedCssType" :label="4">样式4</el-radio>
          </div>
        </li>
        <li>
          <span class="title">更多设置</span>
          <el-checkbox v-model="tempData.moreSetting">隐藏已抢完的券</el-checkbox>
        </li>
        <li class="explain">
          注：当页面无可显示的优惠券时，优惠券区域将隐藏
        </li>
      </ul>
    </template>
    <el-dialog title="选择优惠券" :visible.sync="dialogCouponVisible" width="50%" :before-close="handleClose">
      <div class="filter">
        <el-input type="text" placeholder="请输入优惠券名称" size="mini" style="width: 208px;"></el-input>
        <el-button size="mini" plain style="margin-left: 6px;">搜索</el-button>
      </div>
      <el-table :data="CouponList" border style="width: 100%"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="couponName" label="优惠券名称"></el-table-column>
        <el-table-column prop="price" label="价值（元）"></el-table-column>
        <el-table-column prop="limit" label="领取限制"></el-table-column>
        <el-table-column prop="stock" label="剩余库存（张）"></el-table-column>
        <el-table-column prop="expiryDate" label="有效期"></el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="listQuery.size" :current-page.sync="listQuery.current" @current-change="handleCurrentChange" style="text-align: right;padding-right: 0;margin-top: 10px;">
      </el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closeDialogCoupon" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { moveSpace } from '@/utils'
import Ueditor from '@/components/Ueditor'

export default {
  props: {
    value: {
      type: Object,
      default: {}
    },
    activeIndex: {
      type: Number,
      default: NaN
    }
  },
  components: {
    Ueditor
  },
  data() {
    return {
      cmt: require('@/assets/componetImg/cmt.png'),
      cmd: require('@/assets/componetImg/cmd.png'),
      cc: require('@/assets/componetImg/cc.png'),

      ncmt: require('@/assets/componetImg/ncmt.png'),
      ncmd: require('@/assets/componetImg/ncmd.png'),
      ncc: require('@/assets/componetImg/ncc.png'),
      dialogCouponVisible: false,
      CouponList: [
        {id: 1,couponName: '测试测试优惠券名字啊啊啊', price: 17, limit: '1人/张', stock: 20, expiryDate: '2018-07-02 至 2018-08-02'},
        {id: 2,couponName: '8月平台主动发放劵', price: 17, limit: '1人/张', stock: 20, expiryDate: '2018-07-02 至 2018-08-02'},
        {id: 3,couponName: '测试测试优惠券名字啊啊啊', price: 17, limit: '1人/张', stock: 20, expiryDate: '2018-07-02 至 2018-08-02'}
      ],
      couponSelection: [],
      listQuery: {
        current: 1,
        size: 8
      },
      total: 3
    }
  },
  computed: {
    tempData() {
      return this.value.mainDataList[this.activeIndex]
    }
  },
  methods: {
    addmenu() {
      this.value.mainDataList[this.activeIndex].menuList.push({ title: '', subTitle: '', link: '', imgUrl: '' })
    },
    addimg() {
      this.value.mainDataList[this.activeIndex].imgList.push({ title: '', link: '', imgUrl: '' })
    },
    changeStatus(type, index, arr) {
      if (type === 'moveTop' && index !== 0) {
        moveSpace(arr, index, index - 1)
        this.$set(this.value.mainDataList[this.activeIndex].menuList, arr)
      } else if (type === 'moveDown' && index !== arr.length - 1) {
        moveSpace(arr, index, index + 1)
        this.$set(this.value.mainDataList[this.activeIndex].menuList, arr)
      } else if (type === 'close' && arr.length !== 1) {
        arr.splice(index, 1)
      }
    },
    changeStatus2(type, index, arr) {
      if (type === 'moveTop' && index !== 0) {
        moveSpace(arr, index, index - 1)
        this.$set(this.value.mainDataList[this.activeIndex].imgList, arr)
      } else if (type === 'moveDown' && index !== arr.length - 1) {
        moveSpace(arr, index, index + 1)
        this.$set(this.value.mainDataList[this.activeIndex].imgList, arr)
      } else if (type === 'close' && arr.length !== 1) {
        arr.splice(index, 1)
      }
    },
    ueditorReady() {
      console.log(this.tempData)
    },
    handleCurrentChange() {
      this.listQuery.current++
    },
    handleSelectionChange(val) {
      this.couponSelection = val
    },
    closeDialogCoupon() {
      this.dialogCouponVisible = false
      this.value.mainDataList[this.activeIndex].couponList = this.couponSelection
    }
  }
}

</script>
<style lang="scss" scoped>
.tools-container {
  ul {
    list-style-type: none;
    -webkit-padding-start: 14px;
    -webkit-padding-end: 14px;
    .dashBox {
      height: 97px;
      border: 1px dashed rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      box-sizing: border-box;
      flex-direction: column;
      justify-content: space-around;
      position: relative;
      &-closeImg {
        position: absolute;
        right: -9px;
        top: -9px;
        cursor: pointer;
      }
      &-item {
        width: 100%;
        padding-left: 28px;
        box-sizing: border-box;
        &-require:before {
          content: '*';
          color: #FA0C0C;
          margin-right: 2px;
          position: absolute;
          left: -6px;
          top: 0px;
        }
        span {
          font-size: 13px;
          color: #666666;
          position: relative;
        }
        input {
          height: 23px;
          width: 254px;
          border-top: none;
          border-left: none;
          border-right: none;
          margin-left: 15px;
          outline: none;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
    .dashBox_1 {
      height: 48px;
      border: 1px dashed rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      font-size: 14px;
      color: #999999;
      justify-content: center;
    }
    li {
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      .title {
        font-size: 13px;
        color: #666666;
        width: 76px;
        display: inline-block;
      }
      .inline-title {
        font-size: 13px;
        color: #666666;
      }
      .block {
        width: 174px;
        margin-left: 13px;
      }
      .resetColor {
        font-size: 13px;
        color: #59A1F3;
        margin-left: 14px;
        cursor: pointer;
      }
      .menu_active {
        border: 1px solid #CDAF28 !important;
      }
      .menuSel {
        width: 70px;
        height: 73px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        border: 1px solid #E5E7EA;
        box-sizing: border-box;
        cursor: pointer;
        padding: 9px 0 6px 0;
        span {
          font-size: 12px;
          color: #666666;
          margin-top: 15px;
        }
      }
    }
    .formli {
      display: block;
      .formBox {
        position: relative;
        background: rgba(244, 244, 244, 1);
        padding: 16px 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-tool {
          position: absolute;
          width: 75px;
          height: 20px;
          background: #fff;
          border-radius: 10px;
          right: 0;
          top: -12px;
          border: 1px solid #C5C5C5;

          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 10px;
          box-sizing: border-box;
          img {
            cursor: pointer;
          }
        }
        &-right {
          &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          &-title {
            font-size: 13px;
            color: #666666;
            margin-right: 17px;
          }
        }
        .require:before {
          content: '*';
          color: #FA0C0C;
          margin-right: 2px;
        }
        .noreq:before {
          content: '*';
          margin-right: 2px;
          opacity: 0;
        }
      }
      .formBox:not(:last-child) {
        margin-bottom: 17px;
      }
      .addmenu {
        // height: 62px;
        padding: 7px 12px;
        background: rgba(244, 244, 244, 1);
        &-add {
          height: 48px;
          width: 100%;
          border: 1px dashed rgba(0, 0, 0, 0.1);
          cursor: pointer;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          &-plus {
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              font-size: 16px;
              color: #999999;
              margin-left: 13px;
              line-height: 16px;
            }
          }
          &-suj {
            text-align: center;
            font-size: 12px;
            color: #BFBFBF;
            margin-top: 5px;
          }
        }
      }
    }
    .explain {
      font-size:12px;
      color: #999999;
    }
  }
  &-sub {
    margin: 0 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 10px 6px;
    text-align: right;
  }
}
.filter {
  text-align: center;
  padding-bottom: 25px;
}
</style>
<style>
.formBox-right .el-input__inner {
  background: rgba(244, 244, 244, 1);
}
.coupon .el-radio + .el-radio {
  margin-left: 15px;
}
</style>
