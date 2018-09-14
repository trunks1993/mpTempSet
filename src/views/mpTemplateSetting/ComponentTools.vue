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
            <div class="formBox-menu-img-wrapper" @click="openImgDialog(item, item.imgUrl)" v-if="tempData.isImg">
              <img :src="item.imgUrl || require('@/assets/componetImg/nomenu.png')">
            </div>
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
              <div class="my-flex" :style="!tempData.isImg || !tempData.isTopTitle ? 'margin-top: 7px;' : ''">
                <span class="formBox-right-title require">链接到:</span>
                <div class="formBox-right-inputbox" :style="tempData.isImg ? 'width: 230px;' : 'width: 280px;'">
                  <div class="formBox-right-inputbox-main">
                    <div class="link-label" v-if="item.link">
                      {{getLinkContent(item.link) }}
                      <img :src="require('@/assets/componetImg/lcls.png')" @click="item.link = ''">
                    </div>
                    <img :src="!item.link ? require('@/assets/componetImg/linkimg1.png') : require('@/assets/componetImg/linkimg2.png')" @click.stop="openLinkSelect(index)">
                    <div class="link-select" v-if="selectIndex === index && selectLinkVisible">
                      <div class="link-select-item" v-for="item in linkSelection" @click.stop="openLinkDialog(item.name)">{{item.name}}</div>
                    </div>
                  </div>
                </div>
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
        <li class="dashBox" v-if="tempData.linkVisible">
          <img class="dashBox-closeImg" :src="require('@/assets/componetImg/close.png')" @click="tempData.linkVisible = false">
          <div class="dashBox-item">
            <span class="dashBox-item-require">链接到：</span>
            <div class="formBox-right-inputbox" style="width: 254px; margin-left: 15px; border-radius: 0; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.1);">
              <div class="formBox-right-inputbox-main">
                <div class="link-label" v-if="tempData.link" style="max-width: 155px;">
                  {{getLinkContent(tempData.link) }}
                  <img :src="require('@/assets/componetImg/lcls.png')" @click="tempData.link = ''">
                </div>
                <img :src="!tempData.link ? require('@/assets/componetImg/linkimg1.png') : require('@/assets/componetImg/linkimg2.png')" @click.stop="openLinkSelect">
                <div class="link-select" v-if="selectLinkVisible">
                  <div class="link-select-item" v-for="item in linkSelection" @click.stop="openLinkDialog(item.name)">{{item.name}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="dashBox-item">
            <span>提示语：</span>
            <input type="text" v-model="tempData.linkContent">
          </div>
        </li>
        <li class="dashBox_1" v-else @click="tempData.linkVisible = true">
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
          <div class="product-car" v-if="tempData.productCssList.includes(3)">
            <div style="margin: 10px 0">
              <el-radio v-model="tempData.button.type" :label="1">样式1</el-radio>
            </div>
            <div>
              <el-radio v-model="tempData.button.type" :label="2">样式2</el-radio>
            </div>
            <div class="colorpick">
              <el-color-picker v-model="tempData.button.background"></el-color-picker>
              <span :style="{color: tempData.button.background}">按钮颜色</span>
            </div>
          </div>
          <div class="product-tip" v-if="tempData.productCssList.includes(4)" :style="tempData.productCssList.includes(3) ? 'margin-left: 20px;' : 'margin-left: 148px;'">
            <div style="margin-top: 10px">
              <el-radio v-model="tempData.logoType" :label="1">新品</el-radio>
            </div>
            <div style="margin-top: 10px">
              <el-radio v-model="tempData.logoType" :label="2">热卖</el-radio>
            </div>
            <div class="product-tip-inputradio">
              <el-radio v-model="tempData.logoType" :label="3"></el-radio>
              <el-input v-model="tempData.customLogo" :maxlength="2" size="mini" placeholder="自定义"></el-input>
            </div>
          </div>
        </li>
        <li style="align-items: flex-start;">
          <span class="title">选择商品</span>
          <div class="product-sel">
            <div class="product-sel-item" v-for="item in tempData.productList">
              <img class="imgbox" :src="item.imagePath">
              <img :src="require('@/assets/componetImg/close.png')" @click="deleteProduct(item.Id)">
            </div>
            <div class="product-sel-item isfont" @click="openProductDialog(true)">+</div>
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
            <div class="formBox-slide-img-wrapper" @click="openImgDialog(item, item.imgUrl)">
              <img :src="item.imgUrl || require('@/assets/componetImg/nomenu.png')">
            </div>
            <div class="formBox-right">
              <div class="formBox-right-item">
                <span class="formBox-right-title noreq">标题:</span>
                <el-input v-model="item.title" size="mini" :maxlength='4' style="width: 200px;">
                  <span style="display: flex;align-items: center;height: 100%;" slot="suffix">{{item.title.length}}/4</span>
                </el-input>
              </div>
              <div class="formBox-right-item" style="margin-top: 7px;">
                <span class="formBox-right-title require">链接到:</span>
                <div class="formBox-right-inputbox" style="width: 200px;">
                  <div class="formBox-right-inputbox-main">
                    <div class="link-label" v-if="item.link" style="max-width: 155px;">
                      {{getLinkContent(item.link) }}
                      <img :src="require('@/assets/componetImg/lcls.png')" @click="item.link = ''">
                    </div>
                    <img :src="!item.link ? require('@/assets/componetImg/linkimg1.png') : require('@/assets/componetImg/linkimg2.png')" @click.stop="openLinkSelect(index)">
                    <div class="link-select" v-if="selectIndex === index && selectLinkVisible">
                      <div class="link-select-item" v-for="item in linkSelection" @click.stop="openLinkDialog(item.name)">{{item.name}}</div>
                    </div>
                  </div>
                </div>
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
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="tempData.content">
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
          <div class="formBox-right-inputbox" style="width: 200px;">
            <div class="formBox-right-inputbox-main">
              <div class="link-label" v-if="tempData.link" style="max-width: 155px;">
                {{getLinkContent(tempData.link) }}
                <img :src="require('@/assets/componetImg/lcls.png')" @click="tempData.link = ''">
              </div>
              <img :src="!tempData.link ? require('@/assets/componetImg/linkimg1.png') : require('@/assets/componetImg/linkimg2.png')" @click.stop="openLinkSelect">
              <div class="link-select" v-if="selectLinkVisible">
                <div class="link-select-item" v-for="item in linkSelection" @click.stop="openLinkDialog(item.name)">{{item.name}}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 9">
        <li>
          <span class="title">选择活动</span>
          <div class="fixed-price-sel" @click="openActivityDialog">
            {{tempData.activity.activityLabel || '请选择一口价活动'}}
          </div>
        </li>
        <li style="align-items: flex-start;" v-if="tempData.productList.length > 0">
          <span class="title">选择商品</span>
          <div class="product-sel">
            <div class="product-sel-item" v-for="item in tempData.productList">
              <img class="imgbox" :src="item.imagePath">
              <!-- <img :src="require('@/assets/componetImg/close.png')" @click="deleteProduct(item.Id)"> -->
            </div>
          </div>
        </li>
        <li style="align-items: flex-start;">
          <span class="title">布局</span>
          <div>
            <div style="display: flex;">
              <el-radio v-model="tempData.fixedCssType" :label="1">一行一列</el-radio>
              <el-radio v-model="tempData.fixedCssType" :label="2">一行两列</el-radio>
              <el-radio v-model="tempData.fixedCssType" :label="3">一行三列</el-radio>
            </div>
            <div style="display: flex; margin-top: 15px;">
              <el-radio v-model="tempData.fixedCssType" :label="4">横向滑动</el-radio>
            </div>
          </div>
        </li>
        <li :style="'align-items: flex-start;' + (tempData.productCssList.includes(3) || tempData.productCssList.includes(4) ? 'margin-bottom: 0' : 'margin-bottom: 24px')">
          <span class="title">显示内容</span>
          <el-checkbox-group v-model="tempData.productCssList">
            <div style="display: flex; justify-content: space-between;">
              <el-checkbox :label="1">商品名称</el-checkbox>
              <el-checkbox :label="2">倒计时</el-checkbox>
            </div>
            <div style="margin-top: 20px;width: 230px;display: flex;justify-content: space-between;">
              <div style="display: inline-block;position: relative;">
                <el-checkbox :label="3">按钮</el-checkbox>
              </div>
              <div style="display: inline-block;position: relative;left: -14px;">
                <el-checkbox :label="4">角标</el-checkbox>
              </div>
            </div>
          </el-checkbox-group>
        </li>
        <li v-if="tempData.productCssList.includes(3) || tempData.productCssList.includes(4)">
          <span class="title"></span>
          <div class="product-car" v-if="tempData.productCssList.includes(3)" style="left: -25px;">
            <div style="margin: 10px 0">
              <el-radio v-model="tempData.button.type" :label="1">样式1</el-radio>
            </div>
            <div>
              <el-radio v-model="tempData.button.type" :label="2">样式2</el-radio>
            </div>
            <div class="colorpick">
              <el-color-picker v-model="tempData.button.background"></el-color-picker>
              <span :style="{color: tempData.button.background}">颜色</span>
            </div>
          </div>
          <div class="product-car" v-if="tempData.productCssList.includes(4)" :style="tempData.productCssList.includes(3) ? 'margin-left: 20px;' : 'margin-left: 148px;'">
            <div style="margin-top: 10px">
              <el-radio v-model="tempData.logo.type" :label="1">样式1</el-radio>
            </div>
            <div style="margin-top: 10px">
              <el-radio v-model="tempData.logo.type" :label="2">样式2</el-radio>
            </div>
            <div class="colorpick">
              <el-color-picker v-model="tempData.logo.background"></el-color-picker>
              <span :style="{color: tempData.logo.background}">背景颜色</span>
            </div>
          </div>
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
        <li style="flex-direction: column;" v-if="!tempData.autoAdd">
          <div class="couponbox" v-for="item in tempData.couponList">
            <div class="couponbox-main">
              <div class="couponbox-main-left">
                {{item.price}}元
              </div>
              <div class="couponbox-main-right">
                <div class="couponbox-main-right-name">
                  {{item.title}}
                </div>
                <div class="couponbox-main-right-date">
                  {{item.startTime}} 至 {{item.endTime}}
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="formli" v-if="!tempData.autoAdd">
          <div class="addmenu">
            <div class="addmenu-add" @click="openCouponDialog(true)">
              <div class="addmenu-add-plus">
                <img :src="require('@/assets/componetImg/plus.png')">
                <span>添加优惠券</span>
              </div>
            </div>
          </div>
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
      <ul v-if="value.mainDataList.length > 0 && tempData && tempData.type === 11">
        <li class="same__shop">
          <div>
            排序方式按距离由近到远
          </div>
          <div>
            展示全部可服务的同城门店
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <ul>
        <li>
          <span class="title required">页面名称</span>
          <el-input size="mini" v-model="value.pageName" style="width: 294px;"></el-input>
        </li>
        <li>
          <span class="title">页面描述</span>
          <el-input size="mini" v-model="value.desc" style="width: 294px;"></el-input>
        </li>
        <li>
          <span class="title">标签</span>
          <el-input size="mini" v-model="value.tags" style="width: 294px;"></el-input>
        </li>
      </ul>
    </template>
    <!-- 弹窗部分 -->
    <el-dialog :title="editDirType ? '添加' : '重命名'" :visible.sync="dialogDirAddVisible" width="30%">
      <el-input v-model="dirName"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogDirAddVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addDir">确 定</el-button>
      </span>
    </el-dialog>
    
    <el-dialog title="选择优惠券" :visible.sync="dialogCouponVisible" width="50%">
      <div class="filter">
        <el-input type="text" v-model="listQuery.keyWord" placeholder="请输入优惠券名称" size="mini" style="width: 208px;"></el-input>
        <el-button size="mini" plain style="margin-left: 6px;" @click="searchCoupon">搜索</el-button>
      </div>
      <el-table v-loading="dialogCouponLoading" :data="couponList" border style="width: 100%">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="选择">
          <div class="coupon-box" style="text-align: center;" slot-scope="scope">
            <el-checkbox v-model="checkbox_couponIdList" :label="scope.row.game_id" v-if="isCouponMultiple"></el-checkbox>
            <el-radio v-model="radio_couponId" :label="scope.row.game_id" v-else></el-radio>
          </div>
        </el-table-column>
        <el-table-column prop="title" label="优惠券名称"></el-table-column>
        <el-table-column prop="price" label="价值（元）"></el-table-column>
        <el-table-column prop="maxTake" label="领取限制"></el-table-column>
        <el-table-column prop="stock" label="剩余库存（张）"></el-table-column>
        <el-table-column label="有效期">
          <span slot-scope="scope">
            {{scope.row.startTime}} 至 {{scope.row.endTime}}
          </span>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="couponTotal" :page-size="listQuery.size" :current-page.sync="listQuery.current" @current-change="handleCurrentChange" style="text-align: right;padding-right: 0;margin-top: 10px;">
      </el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectCoupon" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="选择图片" class="imgdialog" :visible.sync="dialogImgVisible" width="1072px">
      <div class="dialog-img">
        <div class="dialog-img-menu" v-loading="dialogImgLoading">
          <ul>
            <li @click="openDirAddDialog(true)">
              <img :src="require('@/assets/componetImg/plus3.png')">
              <span>添加</span>
            </li>
            <li @click="openDirAddDialog(false)">
              <img :src="require('@/assets/componetImg/cmm.png')">
              <span>重命名</span>
            </li>
            <li @click="deleteDir">
              <img :src="require('@/assets/componetImg/del.png')">
              <span>删除</span>
            </li>
          </ul>
          <el-tree :data="dirData" highlight-current show-checkbox check-on-click-node node-key="label" ref="treeForm" @check-change="handleNodeChange" @node-click="handleNodeClick"></el-tree>
        </div>
        <div class="dialog-img-listwrapper">
          <div class="toolbar">
            <!-- <el-button size="mini" type="primary">上传图片</el-button> -->
            <el-upload class="upload-demo" :action="uploadUrl" :data="{'dirName': selectDir}" :multiple="false" :before-upload="uploadBefore" :on-success="uploadSuccess" :show-file-list="false">
              <el-button size="mini" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <span>
              <el-button size="mini">移动图片到</el-button>
              <el-button size="mini">移动分类图片到</el-button>
              <el-button size="mini" type="text" @click="deleteImg">删除所选图片</el-button>
            </span>
            <span>
              <el-input type="text" placeholder="请输入优惠券名称" size="mini" style="width: 166px;"></el-input>
              <el-button size="mini" plain style="margin-left: 6px;">搜索</el-button>
            </span>
          </div>
          <div class="imgwrapper">
            <div class="imgwrapper-item" :class="{'sel-active': imgSelect === item}" v-for="item in imgList" @click="imgSelect = item">
              <img :src="item">
            </div>
          </div>
          <div class="btn">
            <span class="btn-word">已选择{{imgSelect ? 1 : 0}}个</span>
            <el-button size="mini" type="primary" @click="selectImg">使用选中的图片</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    
    <el-dialog title="选择商品" class="imgdialog" :visible.sync="dialogProductVisible" width="800px">
      <div class="product-filter">
        <el-select v-model="productListQuery.productSaleChannel" placeholder="请选择" size="mini" style="width: 150px;">
          <el-option label="频道|所有" :value="0"></el-option>
          <el-option label="线上" :value="1"></el-option>
          <el-option label="线下" :value="2"></el-option>
        </el-select>
        <span>分类
          <el-select v-model="categorySelection.first" placeholder="请选择" size="mini" @change="handleCategorySelect($event, 1)" style="width: 96px;">
            <el-option
              v-for="item in firstCategory"
              :key="item.Key"
              :label="item.Value"
              :value="item.Key">
            </el-option>
          </el-select>
          <el-select v-model="categorySelection.second" placeholder="请选择" size="mini" @change="handleCategorySelect($event, 2)" style="width: 96px;">
            <el-option
              v-for="item in secondCategory"
              :key="item.Key"
              :label="item.Value"
              :value="item.Key">
            </el-option>
          </el-select>
          <el-select v-model="categorySelection.third" placeholder="请选择" size="mini" @change="handleCategorySelect($event, 3)" style="width: 96px;">
            <el-option
              v-for="item in thirdCategory"
              :key="item.Key"
              :label="item.Value"
              :value="item.Key">
            </el-option>
          </el-select>
          <el-input type="text" placeholder="请输入商品名" size="mini" style="width: 150px; margin-left: 18px;" v-model="productListQuery.productName"></el-input>
          <el-button size="mini" plain style="margin-left: 6px;" @click="searchProduct">搜索</el-button>
        </span>
      </div>
      <div class="product-wrapper" v-loading="dialogProductLoading">
        <div class="product-wrapper-item" v-for="item in productList">
          <el-checkbox v-model="checkbox_productIdList" :label="item.Id" v-if="isProductMultiple"></el-checkbox>
          <el-radio v-model="radio_productId" :label="item.Id" v-else></el-radio>
          <div class="product-wrapper-item-imgbox">
            <img :src="item.imagePath">
          </div>
          <div class="product-wrapper-item-detail">
            <div class="product-wrapper-item-productname">{{item.ProductName}}</div>
            <div class="product-wrapper-item-detail-pricestock">
              <span>￥{{item.MinSalePrice}}{{item.MeasureUnit? '/' + item.MeasureUnit : '' }}</span>
              <span>库存{{item.Stock}}件</span>
            </div>
          </div>
        </div>
      </div>
      <div class="product-pagination">
        <el-checkbox v-model="isSelectProductAll" @change="handleCheckAllProduct" v-if="isProductMultiple">选择当前页</el-checkbox>
        <el-pagination @current-change="handleProductCurrentChange" :current-page.sync="productListQuery.current" :page-size="100" background layout="prev, pager, next, jumper" :total="productTotal">
        </el-pagination>
      </div>
      <div class="product-btn">
        <span class="product-btn-word">已选择{{checkbox_productIdList.length }}个</span>
        <el-button size="mini" type="primary" @click="selectProduct">确定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="选择微页面" class="imgdialog" :visible.sync="dialogWPageVisible" width="800px">
      <div class="activity-filter">
        <div>
          <span style="font-size:12px; font-weight: bolder;">状态</span>
          <el-radio v-model="wpageListQuery.disabled" label="" style="margin-left: 15px">全部</el-radio>
          <el-radio v-model="wpageListQuery.disabled" :label="true">启用</el-radio>
          <el-radio v-model="wpageListQuery.disabled" :label="false">失效</el-radio>
        </div>
        <div>
          <span>页面名称</span>
          <el-input v-model="wpageListQuery.title" size="mini" style="width: 128px"></el-input>
          <span>标签</span>
          <el-input v-model="wpageListQuery.tag" size="mini" style="width: 128px"></el-input>
          <el-button size="mini" plain style="margin-left: 6px;" @click="searchWPage">搜索</el-button>
        </div>
      </div>
      <div class="activity-wrapper" v-loading="dialogWPageLoading">
        <el-table :data="wpageList" border style="width: 100%">
          <el-table-column label="选择">
            <div style="text-align: center;" slot-scope="scope">
              <el-radio v-model="radio_wpageId" :label="scope.row.id"></el-radio>
            </div>
          </el-table-column>
          <el-table-column prop="pageName" label="页面名称"></el-table-column>
          <el-table-column label="状态">
            <span slot-scope="scope" :style="scope.row.disabled ? 'color: #CDAF28;' : ''">
              {{scope.row.disabled ? '启用' : '失效'}}
            </span>
          </el-table-column>
          <el-table-column prop="tags" label="标签"></el-table-column>
        </el-table>
      </div>
      <div class="activity-pagination">
        <el-pagination @current-change="handleWpageCurrentChange" :current-page.sync="wpageListQuery.current" :page-size="wpageListQuery.size" background layout="pager" :total="wpageTotal">
        </el-pagination>
      </div>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="selectWPage">确 定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="选择一口价活动" class="imgdialog" :visible.sync="dialogActivityVisible" width="800px">
      <div class="activity-filter">
        <div>
          <span style="font-size:12px; font-weight: bolder;">状态</span>
          <el-radio v-model="activityListQuery.status" label="" style="margin-left: 15px">全部</el-radio>
          <el-radio v-model="activityListQuery.status" :label="2">进行中</el-radio>
          <el-radio v-model="activityListQuery.status" :label="1">未开始</el-radio>
        </div>
        <div>
          <span>开始时间</span>
          <el-date-picker v-model="activityListQuery.startTime" type="date" value-format="yyyy-MM-dd" size="mini" style="width: 149px; margin-left: 10px;"></el-date-picker>
          <span>-</span>
          <el-date-picker v-model="activityListQuery.endTime" type="date" value-format="yyyy-MM-dd" size="mini" style="width: 149px"></el-date-picker>
          <el-button size="mini" plain style="margin-left: 6px;" @click="searchActivity">搜索</el-button>
        </div>
      </div>
      <div class="activity-wrapper" v-loading="dialogActivityLoading">
        <el-table :data="activityList" border style="width: 100%">
          <el-table-column label="选择">
            <div style="text-align: center;" slot-scope="scope">
              <el-radio v-model="radio_activityId" :label="scope.row.id"></el-radio>
            </div>
          </el-table-column>
          <el-table-column prop="activityLabel" label="活动名称"></el-table-column>
          <el-table-column prop="activityStatusName" label="状态"></el-table-column>
          <el-table-column label="活动时间" width="180">
            <span slot-scope="scope">
              {{scope.row.startTimeStr}}至{{scope.row.endTimeStr}}
            </span>
          </el-table-column>
          <el-table-column prop="shopCount" label="门店数"></el-table-column>
          <el-table-column prop="productCount" label="商品数"></el-table-column>
        </el-table>
      </div>
      <div class="activity-pagination">
        <el-pagination @current-change="handleActivityCurrentChange" :current-page.sync="activityListQuery.current" :page-size="activityListQuery.size" background layout="pager" :total="activityTotal">
        </el-pagination>
      </div>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="selectActivity">确 定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="选择礼品卡" class="imgdialog" :visible.sync="dialogGiftCardVisible" width="576px">
      <div class="activity-filter">
        <el-input v-model="giftCardListQuery.giftCardName" placeholder="礼品卡名称" size="mini" style="width: 170px"></el-input>
        <el-button size="mini" plain style="margin-left: 6px;" @click="searchGiftCard">搜索</el-button>
      </div>
      <div class="activity-wrapper" v-loading="dialogGiftcardLoading">
        <el-table :data="giftCardList" border style="width: 100%">
          <el-table-column label="选择">
            <div style="text-align: center;" slot-scope="scope">
              <el-radio v-model="radio_giftCardId" :label="scope.row.Id"></el-radio>
            </div>
          </el-table-column>
          <el-table-column prop="GiftCardName" label="礼品卡名称"></el-table-column>
          <el-table-column prop="FaceValue" label="礼品卡金额（元）"></el-table-column>
        </el-table>
      </div>
      <div class="activity-pagination">
        <el-pagination @current-change="handleGiftCardCurrentChange" :current-page.sync="giftCardListQuery.current" :page-size="giftCardListQuery.size" background layout="pager" :total="giftCardTotal">
        </el-pagination>
      </div>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="selectGiftCard">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="自定义链接" class="imgdialog" :visible.sync="dialogCustomeVisible" width="596px">
      <div class="custome-wrapper">
        <div class="custome-wrapper-item">
          <div class="custome-wrapper-item-title">微商城</div>
          <div class="custome-wrapper-item-inputbox">
            <span>网页链接：</span>
            <el-input v-model="customeLink.webLink" clearable style="width: 437px;"></el-input>
          </div>
        </div>
        <div class="custome-wrapper-item" style="margin-top: 50px">
          <div class="custome-wrapper-item-title">小程序</div>
          <div class="custome-wrapper-item-inputbox">
            <el-radio v-model="customeLink.isMyMp" :label="true">链接到我的小程序</el-radio>
            <el-radio v-model="customeLink.isMyMp" :label="false">链接到其他小程序</el-radio>
          </div>
          <div class="custome-wrapper-item-inputbox" v-if="!customeLink.isMyMp">
            <span>小程序AppID：</span>
            <el-input v-model="customeLink.appId" clearable style="width: 418px;"></el-input>
          </div>
          <div class="custome-wrapper-item-inputbox">
            <span>小程序路径：</span>
            <el-input v-model="customeLink.mplink" clearable style="width: 418px;"></el-input>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" size="mini" @click="selectCustome">确 定</el-button>
        <el-button plain size="mini" @click="dialogCustomeVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { moveSpace } from '@/utils'
import Ueditor from '@/components/Ueditor'
import {
  getImageDirectory,
  createDir,
  reNameDir,
  deleteDir,
  getImages,
  deleteFile,
  getCoupons,
  getShopProduct,
  getCategory,
  getFixedList,
  getFixedProducts,
  getWpageList,
  getGiftCardList
} from '@/api'
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
      dialogImgVisible: false,
      dialogDirAddVisible: false,
      dialogProductVisible: false,
      dialogActivityVisible: false,
      dialogWPageVisible: false,
      dialogGiftCardVisible: false,
      dialogCustomeVisible: false,

      selectLinkVisible: false,

      dialogImgLoading: false,
      dialogCouponLoading: false,
      dialogProductLoading: false,
      dialogActivityLoading: false,
      dialogWPageLoading: false,
      dialogGiftcardLoading: false,

      couponList: [],
      wpageList: [],
      activityList: [],
      productList: [],
      giftCardList: [],

      listQuery: {
        current: 1,
        size: 8,
        keyWord: ''
      },
      productListQuery: {
        current: 1,
        size: 6,
        productName: '',
        productSaleChannel: 0,
        categoryId: ''
      },
      // 一口价活动query对象
      activityListQuery: {
        current: 1,
        size: 8,
        status: '',
        startTime: '',
        endTime: ''
      },
      // 一口价活动query对象
      wpageListQuery: {
        current: 1,
        size: 8,
        disabled: '',
        tag: '',
        title: ''
      },
      // 礼品卡query对象
      giftCardListQuery: {
        current: 1,
        size: 8,
        giftCardName: ''
      },

      radio_activityId: '', // 选择的一口价活动id
      radio_wpageId: '', // 选择微页面id
      radio_productId: '', // 单选的商品
      radio_couponId: '', // 单选的优惠券id
      radio_giftCardId: '', // 单选的礼品卡id

      checkbox_productIdList: [], // 多选的商品
      checkbox_couponIdList: [], // 多选的优惠券

      isSelectProductAll: false, // 商品是否全选
      isProductMultiple: true, // 商品是否多选
      isCouponMultiple: true, // 优惠券是否多选

      productTotal: 0,
      couponTotal: 3,
      activityTotal: 0,
      wpageTotal: 0,
      giftCardTotal: 0,

      dirData: [],
      dirName: '',
      selectDir: '',
      currentDir: '',
      editDirType: true,
      i: 0,
      imgList: [],
      imgSelect: '',
      itemSelection: '',

      firstCategory: [], // 第一级分类
      secondCategory: [], // 第二级分类
      thirdCategory: [], // 第三级分类
      categorySelection: {
        first: '',
        second: '',
        third: ''
      },
      linkSelection: [
        { name: '商品' },
        { name: '微页面' },
        { name: '首页' },
        { name: '优惠券' },
        { name: '礼品卡' },
        { name: '购物车' },
        { name: '我的订单' },
        { name: '个人中心' },
        { name: '我的预存款' },
        { name: '我的积分' },

        { name: '积分商城' },
        { name: '现金红包' },
        { name: '拼团列表' },

        { name: '自定义链接' }
      ],
      selectIndex: -1,
      // radio_myMp: true,
      // custome_web_link: '',
      // custome_mp_link: ''
      customeLink: {
        webLink: '',
        mplink: '',
        isMyMp: true,
        appId: ''
      }
    }
  },
  computed: {
    tempData() {
      return this.value.mainDataList[this.activeIndex]
    },
    uploadUrl() {
      return process.env.BASE_API + '/admin/template/UploadPic'
    }
  },
  mounted() {
    document.body.onclick = () => {
      this.selectLinkVisible = false
    }
  },
  methods: {
    addmenu() {
      this.value.mainDataList[this.activeIndex].menuList.push({ title: '', subTitle: '', link: '', imgUrl: '' })
    },
    addimg() {
      this.value.mainDataList[this.activeIndex].imgList.push({ title: '', link: '', imgUrl: '' })
    },

    // -----------------------------------打开弹窗的一些方法-----------------------------------
    // 打开图片弹框
    openImgDialog(item, url) {
      this.itemSelection = item
      this.imgSelect = url
      this.dialogImgVisible = true
      this.getDirList()
    },
    // 打开优惠券列表弹窗
    openCouponDialog(isMultiple) {
      this.dialogCouponVisible = true
      this.isCouponMultiple = isMultiple
      this.getCouponList()
    },
    // 打开产品列表弹窗
    openProductDialog(isMultiple) {
      this.isProductMultiple = isMultiple
      this.dialogProductVisible = true
      this.getCategory()
      this.getProductList()
    },
    // 打开一口价活动列表弹窗
    openActivityDialog() {
      this.dialogActivityVisible = true
      this.getActivityList()
    },
    // 打开图库添加窗口 editDirType true为添加 false为重命名
    openDirAddDialog(editDirType) {
      if (!editDirType && !this.selectDir) {
        return this.$message({
          message: '请选择一个文件夹',
          type: 'warning'
        })
      }
      this.editDirType = editDirType
      this.dialogDirAddVisible = true
    },
    // 打开礼品卡列表弹窗
    openGiftCardDialog() {
      this.dialogGiftCardVisible = true
      this.getGiftCardList()
    },
    // 打开链接选择弹窗
    openLinkDialog(label) {
      this.selectLinkVisible = false
      let linkObj = null
      switch (label) {
        case '商品':
          this.openProductDialog(false)
          break
        case '微页面':
          this.dialogWPageVisible = true
          this.getWPageList()
          break
        case '首页':
          linkObj = { typeName: 'home', label: '首页' }
          set(linkObj)
          break
        case '优惠券':
          this.openCouponDialog(false)
          break
        case '礼品卡':
          this.openGiftCardDialog()
          break
        case '购物车':
          linkObj = { typeName: 'shopCart', label: '购物车' }
          this.setLinkInput(linkObj)
          break
        case '我的订单':
          linkObj = { typeName: 'order', label: '我的订单' }
          this.setLinkInput(linkObj)
          break
        case '个人中心':
          linkObj = { typeName: 'personal', label: '个人中心' }
          this.setLinkInput(linkObj)
          break
        case '我的预存款':
          linkObj = { typeName: 'preDeposit', label: '我的预存款' }
          this.setLinkInput(linkObj)
          break
        case '我的积分':
          linkObj = { typeName: 'points', label: '我的积分' }
          this.setLinkInput(linkObj)
          break
        case '积分商城':
          linkObj = { typeName: 'pointMall', label: '积分商城', isUseInWeb: true }
          this.setLinkInput(linkObj)
          break
        case '现金红包':
          linkObj = { typeName: 'redPacket', label: '现金红包', isUseInWeb: true }
          this.setLinkInput(linkObj)
          break
        case '拼团列表':
          linkObj = { typeName: 'groupShoppingList', label: '拼团列表', isUseInWeb: true }
          this.setLinkInput(linkObj)
          break
        default:
          this.dialogCustomeVisible = true
      }
    },
    // 设置有链接的表单
    setLinkInput(obj) {
      if (this.tempData.type === 2) {
        this.tempData.menuList[this.selectIndex].link = obj
      } else if (this.tempData.type === 5) {
        this.tempData.imgList[this.selectIndex].link = obj
      } else {
        this.tempData.link = obj
      }
    },
    // 打开链接下拉选择列表
    openLinkSelect(index) {
      this.selectLinkVisible = true
      this.selectIndex = index
    },
    // -----------------------------------end-----------------------------------

    // -----------------------------------获取一些list列表的方法-----------------------------------
    // 获取文件夹列表
    getDirList() {
      this.dialogImgLoading = true
      getImageDirectory().then(res => {
        this.dirData = res.data.map(item => {
          return { label: item }
        })
        this.$nextTick(() => {
          this.i = 0
        })
        this.dialogImgLoading = false
      })
    },
    // 获取一口价活动列表 
    getActivityList() {
      this.dialogActivityLoading = true
      getFixedList(this.activityListQuery).then(res => {
        this.activityList = res.data.rows
        this.activityTotal = res.data.total
        this.dialogActivityLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取商品列表
    getProductList() {
      this.dialogProductLoading = true
      getShopProduct(this.productListQuery).then(res => {
        this.productList = res.data.Models
        this.productTotal = res.data.Total
        this.dialogProductLoading = false
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取优惠券列表
    getCouponList() {
      this.dialogCouponLoading = true
      getCoupons(this.listQuery).then(res => {
        this.couponList = res.data.list
        this.dialogCouponLoading = false
      })
    },
    // 获取微页面列表
    getWPageList() {
      this.dialogWPageLoading = true
      getWpageList(this.wpageListQuery).then(res => {
        this.wpageList = res.data.rows
        this.wpageTotal = res.data.total
        this.dialogWPageLoading = false
      })
    },
    // 获取礼品卡列表
    getGiftCardList() {
      this.dialogGiftCardLoading = true
      getGiftCardList(this.giftCardListQuery).then(res => {
        this.giftCardList = res.data.Data.Models
        this.giftCardTotal = res.data.Data.Total
        this.dialogGiftCardLoading = false
      })
    },
    // 获取商品分类
    getCategory(level, key) {
      getCategory(level, key).then(res => {
        if (!level) {
          this.firstCategory = res.data
        } else if (level === 1) {
          this.secondCategory = res.data
        } else if (level === 2) {
          this.thirdCategory = res.data
        }
      })
    },
    // -----------------------------------end-----------------------------------
    // 商品分类发生变化触发
    handleCategorySelect(event, level) {
      if (level === 1) {
        this.categorySelection.second = ''
        this.categorySelection.third = ''
      } else if (level === 2) {
        this.categorySelection.third = ''
      }
      this.getCategory(level, event)
    },
    handleCheckAllProduct(val) {
      const arr = []
      this.productList.filter(item => {
        arr.push(item.Id)
        return item
      })
      this.checkbox_productIdList = val ? arr : []
    },
    // 删除商品
    deleteProduct(id) {
      const index = this.checkbox_productIdList.indexOf(id)
      this.checkbox_productIdList.splice(index, 1)
      const arr = this.productList.filter(item => {
        return this.checkbox_productIdList.includes(item.Id)
      })
      this.value.mainDataList[this.activeIndex].productList = arr
    },
    searchCoupon() {
      this.getCouponList()
    },
    hover() {

    },
    handleNodeChange(data, checked, node) {
      this.i++;
      if (this.i % 2 === 0) {
        if (checked) {
          this.$refs.treeForm.setCheckedNodes([])
          this.$refs.treeForm.setCheckedNodes([data])
          //交叉点击节点
        } else {
          this.$refs.treeForm.setCheckedNodes([])
        }
      }
      this.selectDir = this.$refs.treeForm.getCheckedNodes().length === 0 ? '' : this.$refs.treeForm.getCheckedNodes()[0].label
    },
    handleNodeClick(data) {
      this.currentDir = data.label
      this.getImgListByNode(data.label)
    },
    getImgListByNode(dirName) {
      getImages(dirName).then(res => {
        this.imgList = res.data
      })
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
    handleProductCurrentChange(val) {
      this.productListQuery.current = val
      this.getProductList()
    },
    // -----------------------------------一些列表筛选后搜索方法-----------------------------------
    // 点击一口价搜索按钮
    searchActivity() {
      this.activityListQuery.current = 1
      this.getActivityList()
    },
    searchWPage() {
      this.wpageListQuery.current = 1
      this.getWPageList()
    },
    // 条件搜索商品 
    searchProduct() {
      if (this.categorySelection.second && !this.categorySelection.third) {
        this.productListQuery.categoryId = this.categorySelection.second
      } else if (this.categorySelection.third) {
        this.productListQuery.categoryId = this.categorySelection.third
      } else {
        this.productListQuery.categoryId = ''
      }
      this.productListQuery.current = 1
      this.getProductList()
    },
    // 条件搜索礼品卡
    searchGiftCard() {
      this.giftCardListQuery.current = 1
      this.getGiftCardList()
    },
    // -----------------------------------end-----------------------------------

    // -----------------------------------确认选择操作-----------------------------------
    // 选择图片
    selectImg() {
      this.itemSelection.imgUrl = this.imgSelect
      this.dialogImgVisible = false
      this.imgSelect = ''
    },
    // 选择一口价活动
    selectActivity() {
      let obj = ''
      for (var i = 0; i < this.activityList.length; i++) {
        if (this.activityList[i].id === this.radio_activityId) {
          obj = this.activityList[i]
          break
        }
      }
      this.value.mainDataList[this.activeIndex].activity = obj
      getFixedProducts(this.radio_activityId).then(res => {
        this.value.mainDataList[this.activeIndex].productList = res.data[0].products
      })
      this.dialogActivityVisible = false
    },
    // 确定选择微页面
    selectWPage() {
      this.dialogWPageVisible = false
      let wpage = null
      for (const item of this.wpageList) {
        if (item.id === this.radio_wpageId) {
          wpage = item
        }
      }
      if (this.tempData.type === 2) {
        this.tempData.menuList[this.selectIndex].link = { typeName: 'wpage', label: '微页面', wpage: wpage }
      } else if (this.tempData.type === 5) {
        this.tempData.imgList[this.selectIndex].link = { typeName: 'wpage', label: '微页面', wpage: wpage }
      } else {
        this.tempData.link = { typeName: 'wpage', label: '微页面', wpage: wpage }
      }
    },
    // 确认选择商品
    selectProduct() {
      this.dialogProductVisible = false
      if (this.isProductMultiple) {
        const arr = this.productList.filter(item => {
          return this.checkbox_productIdList.includes(item.Id)
        })
        this.value.mainDataList[this.activeIndex].productList = arr
      } else {
        let product = null
        for (const item of this.productList) {
          if (item.Id === this.radio_productId) {
            product = item
          }
        }
        const linkObj = { typeName: 'product', label: '商品', product: product }
        this.setLinkInput(linkObj)
      }
    },
    // 确认选择优惠券
    selectCoupon() {
      this.dialogCouponVisible = false
      if (this.isCouponMultiple) {
        const arr = this.couponList.filter(item => {
          return this.checkbox_couponIdList.includes(item.game_id)
        })
        this.value.mainDataList[this.activeIndex].couponList = arr
      } else {
        let coupon = null
        for (const item of this.couponList) {
          if (item.game_id === this.radio_couponId) {
            coupon = item
          }
        }
        const linkObj = { typeName: 'coupon', label: '优惠券', coupon: coupon }
        this.setLinkInput(linkObj)
      }
    },
    // 确认选择礼品卡
    selectGiftCard() {
      this.dialogGiftCardVisible = false
      let giftCard = null
      for (const item of this.giftCardList) {
        if (item.Id === this.radio_giftCardId) {
          giftCard = item
        }
      }
      const linkObj = { typeName: 'giftCard', label: '礼品卡', giftCard: giftCard, isUseInWeb: false }
      this.setLinkInput(linkObj)
    },
    // 确认选择自定义链接 
    selectCustome() {
      this.dialogCustomeVisible = false
      const linkObj = {
        typeName: 'custome',
        label: '自定义链接',
        custome: {
          webLink: this.customeLink.webLink,
          mplink: this.customeLink.mplink,
          isMyMp: this.customeLink.isMyMp,
          appId: this.customeLink.appId
        }
      }
      this.setLinkInput(linkObj)
    },
    // -----------------------------------end-----------------------------------

    // -----------------------------------分页页码变化触发方法-----------------------------------
    handleActivityCurrentChange(val) {
      this.activityListQuery.current = val
      this.getActivityList()
    },
    handleWpageCurrentChange(val) {
      this.wpageListQuery.current = val
      this.getWPageList()
    },
    handleGiftCardCurrentChange(val) {
      this.giftCardListQuery.current = val
      this.getGiftCardList()
    },
    handleCurrentChange(val) {
      this.listQuery.current = val
      this.getCouponList()
    },
    // handleSelectionChange(val) {
    //   this.couponSelection = val
    // },
    // -----------------------------------end-----------------------------------

    // 添加图库文件夹
    addDir() {
      if (this.editDirType) {
        createDir(this.dirName).then(res => {
          const data = res.data
          if (data.success) {
            this.getDirList()
          }
          this.dialogDirAddVisible = false
        })
      } else {
        reNameDir(this.selectDir, this.dirName).then(res => {
          const data = res.data
          if (data.success) {
            this.getDirList()
          }
          this.dialogDirAddVisible = false
        })
      }
    },
    // 删除图库文件夹
    deleteDir() {
      if (!this.selectDir) {
        return this.$message({
          message: '请选择一个文件夹',
          type: 'warning'
        })
      }
      this.$confirm('此操作将永久删除该文件夹, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDir(this.selectDir).then(res => {
          const data = res.data
          if (data.success) {
            this.getDirList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.dialogDirAddVisible = false
        })
      })
    },
    // 图片上传前的处理
    uploadBefore(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!this.selectDir) {
        this.$message.error('请选择一个文件夹')
      }
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M && this.selectDir
    },
    // 图片上传成功后回调初始化列表方法
    uploadSuccess() {
      this.getImgListByNode(this.selectDir)
    },
    // 删除图片
    deleteImg() {
      if (!this.imgSelect) {
        return this.$message({
          message: '请选择一个文件',
          type: 'warning'
        })
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFile(this.imgSelect).then(res => {
          const data = res.data
          if (data.success) {
            this.getImgListByNode(this.currentDir)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      })
    },
    // 格式化链接选择的文本
    getLinkContent(linkObj) {
      let content = ''
      switch (linkObj.typeName) {
        case 'product':
          content = linkObj.label + '|' + linkObj.product.ProductName
          break
        case 'wpage':
          content = linkObj.label + '|' + linkObj.wpage.pageName
          break
        case 'home':
          content = linkObj.label + '|' + linkObj.label
          break
        case 'coupon':
          content = linkObj.label + '|' + linkObj.coupon.title
          break
        case 'giftCard':
          content = linkObj.label + '|' + linkObj.giftCard.GiftCardName
          break
        case 'shopCart':
          content = linkObj.label + '|' + linkObj.label
          break
        case 'order':
          content = linkObj.label + '|' + linkObj.label
          break
        case 'personal':
          content = linkObj.label + '|' + linkObj.label
          break
        case 'preDeposit':
          content = linkObj.label + '|' + linkObj.label
          break
        case 'points':
          content = linkObj.label + '|' + linkObj.label
          break
        case 'pointMall':
          content = linkObj.label + '|' + linkObj.label
          break
        case 'redPacket':
          content = linkObj.label + '|' + linkObj.label
          break
        case 'groupShoppingList':
          content = linkObj.label + '|' + linkObj.label
          break
        default:
          content = linkObj.label + '|' + linkObj.custome.webLink
      }
      return content
    }
  }
}

</script>
<style lang="scss" scoped>
.no-flex-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.my-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.required:before {
  content: '*';
  color: #FA0C0C;
  margin-right: 2px;
  position: absolute;
  left: -6px;
  top: 0px;
}
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
        display: flex;
        align-items: center;
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
        position: relative;
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
      .couponbox {
        padding: 14px 16px;
        background: #F4F4F4;
        width: 100%;
        box-sizing: border-box;
        &-main {
          display: flex;
          align-items: center;
          border: 1px solid rgba(0, 0, 0, 0.1);
          padding: 10px 0;
          &-left {
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            height: 100%;
            text-align: right;
            padding-right: 20px;
            padding-left: 40px;
          }
          &-right {
            padding-left: 15px;
            &-name {
              font-size: 12px;
              line-height: 12px;
            }
            &-date {
              margin-top: 5px;
              font-size: 12px;
              line-height: 12px;
              color: #999999;
            }
          }
        }
      }
      .couponbox:not(:first-child) {
        margin-top: 20px;
      }
      .product-sel {
        width: 300px;
        &-item {
          width: 62px;
          height: 62px;
          display: inline-block;
          position: relative;
          border: 1px solid #E0E0E0;
          box-sizing: border-box;
          margin-right: 15px;
          margin-bottom: 10px;
          vertical-align: top;
          .imgbox {
            max-width: 100%;
            max-height: 100%;
            @extend .no-flex-center;
          }
          & img:nth-child(2) {
            position: absolute;
            top: -10px;
            right: -10px;
            cursor: pointer;
          }
        }
        .isfont {
          text-align: center;
          line-height: 62px;
          font-size: 56px;
          font-weight: bold;
          color: rgba(102, 102, 102, 0.2);
          cursor: pointer;
        }
        &-item:nth-child(4n) {
          margin-right: 0;
        }
      }
      .product-car {
        width: 128px;
        height: 98px;
        background: #F2F2F2;
        text-align: center;
        position: relative;
        top: 6px;
        &:before {
          content: ' ';
          display: block;
          width: 12px;
          height: 12px;
          position: absolute;
          background: #F2F2F2;
          transform: rotate(45deg);
          top: -4px;
          left: 44%;
        }
        .colorpick {
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 10px;
        }
      }
      .product-tip {
        width: 128px;
        height: 98px;
        background: #F2F2F2;
        padding-left: 28px;
        box-sizing: border-box;
        position: relative;
        top: 6px;
        &:before {
          content: ' ';
          display: block;
          width: 12px;
          height: 12px;
          position: absolute;
          background: #F2F2F2;
          transform: rotate(45deg);
          top: -4px;
          left: 44%;
        }
        &-inputradio {
          margin-top: 10px;
          .el-input {
            margin-left: 5px;
            width: 50px;
          }
        }
      }
      .fixed-price-sel {
        width: 241px;
        height: 34px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        font-size: 14px;
        color: #CDAF28;
        line-height: 34px;
        box-sizing: border-box;
        padding-left: 15px;
        padding-right: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
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
        &-menu-img-wrapper {
          position: relative;
          width: 52px;
          height: 52px;
          cursor: pointer;
          img {
            max-width: 100%;
            @extend .no-flex-center;
          }
        }
        &-slide-img-wrapper {
          position: relative;
          width: 85px;
          height: 70px;
          cursor: pointer;
          img {
            max-width: 100%;
            @extend .no-flex-center;
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
      font-size: 12px;
      color: #999999;
    }
    .same__shop {
      flex-direction: column;
      align-items: baseline;
      padding-left: 100px;
      div {
        position: relative;
        &:before {
          content: ' ';
          display: block;
          width: 8px;
          height: 8px;
          background: rgba(205, 175, 40, 1);
          border-radius: 50%;
          position: absolute;
          left: -12px;
          top: 6px;
        }
      }
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

.dialog-img {
  height: 685px;
  display: flex;
  ul {
    display: flex;
    justify-content: space-around;
    border: 1px dashed rgba(0, 0, 0, 0.1);
    -webkit-margin-before: 7px;
    -webkit-margin-after: 7px;
    -webkit-margin-start: 7px;
    -webkit-margin-end: 7px;
    li {
      margin: 17px 0;
      cursor: pointer;
      span {
        margin-left: 4px;
        font-size: 12px;
      }
    }
  }
  &-menu {
    width: 20%;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  &-listwrapper {
    width: 80%;
    position: relative;
    .toolbar {
      justify-content: space-between;
      display: flex;
      padding: 15px 30px;
    }
    .imgwrapper {
      padding: 0 25px 25px 25px;
      height: calc(100% - 128px);
      box-sizing: border-box;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      &-item {
        width: 120px;
        height: 126px;
        border: 1px solid #EDEDED;
        text-align: center;
        position: relative;
        display: inline-block;
        margin-left: calc((100% - 720px) / 5);
        box-sizing: border-box;
        img {
          max-width: 100%;
          @extend .no-flex-center;
        }
      }
      &-item:nth-child(6n+1) {
        margin-left: 0px;
      }
      .sel-active {
        border: 2px solid #CDAF28;
      }
    }
    .btn {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      height: 70px;
      position: absolute;
      left: 15px;
      right: 15px;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      box-sizing: border-box;
      &-word {
        font-size: 14px;
        margin-right: 24px;
      }
    }
  }
}

.product-filter {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
}

.activity-filter {
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-wrapper {
  height: 514px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  &-item {
    display: flex;
    padding: 8px 25px;
    align-items: center;
    &-imgbox {
      width: 66px;
      height: 66px;
      position: relative;
      margin-left: 10px;
      border: 1px solid #F4F4F4;
      box-sizing: border-box;
      img {
        max-width: 100%;
        max-height: 100%;
        @extend .no-flex-center;
      }
    }
    &-detail {
      margin-left: 15px;
      &-productname {
        color: #666666;
        font-size: 14px;
        line-height: 14px;
      }
      &-pricestock {
        margin-top: 25px;
        & span:nth-child(1) {
          color: #FA0C0C;
          font-size: 14px;
        }
        & span:nth-child(2) {
          color: #999999;
          font-size: 12px;
          margin-left: 20px;
        }
      }
    }
  }
}

.activity-wrapper {
  height: 514px;
  padding: 0 20px;
}

.custome-wrapper {
  padding: 50px 40px;
  &-item {
    &-title {
      position: relative;
      color: #333333;
      font-size: 14px;
      font-weight: bolder;
      &:before {
        content: ' ';
        display: block;
        width: 4px;
        height: 13px;
        background: #CDAF28;
        position: absolute;
        left: -10px;
        top: 4px;
      }
    }
    &-inputbox {
      display: flex;
      align-items: center;
      margin-top: 15px;
    }
  }
}

.activity-pagination {
  text-align: right;
}

.product-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 10px;
}

.activity-pagination {
  padding: 12px 10px;
}

.product-btn {
  padding-top: 5px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;
  box-sizing: border-box;
  &-word {
    font-size: 14px;
    margin-right: 24px;
  }
}

.formBox-right-inputbox {
  display: inline-block;
  height: 34px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-sizing: border-box;
  &-main {
    position: relative;
    height: 100%;
    padding: 5px 8px 5px;
    box-sizing: border-box;
    img {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translate(0, -50%);
      cursor: pointer;
    }
    .link-label {
      color: #fff;
      font-size: 12px;
      background: #CDAF28;
      border-radius: 4px;
      padding-left: 5px;
      line-height: 23px;
      max-width: 180px;
      box-sizing: border-box;
      padding-right: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      img {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translate(0, -50%);
        cursor: pointer;
      }
    }
    .link-select {
      position: absolute;
      width: 120px;
      right: 0;
      top: 28px;
      height: 218px;
      background: #fff;
      box-shadow: 0px 0px 19px 0px rgba(0, 0, 0, 0.08); // padding: 0 20px;
      font-size: 12px;
      box-sizing: border-box;
      overflow: auto;
      z-index: 10;
      &-item {
        padding: 5px 20px;
        cursor: pointer;
        &:hover {
          color: #CDAF28;
        }
      }
    }
  }
}

</style>
<style lang="scss">
.formBox-right .el-input__inner {
  background: rgba(244, 244, 244, 1);
}

.coupon .el-radio+.el-radio {
  margin-left: 9px;
}

</style>
