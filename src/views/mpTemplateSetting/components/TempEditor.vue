<template>
  <div class="editorwrapper-container" @click="selectTemp" @mousedown="startMove($event)" :style="(data.content ? '' : 'padding: 5px;') + 'background:' + data.dynamicCss.background">
    <div class="editorwrapper-container" v-html="data.content" v-if="data.content">
    </div>
    <div class="editorwrapper-container-none" v-else>【富文本】内容</div>
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
.editorwrapper-container {
  // padding: 7px;
  &-none {
    width: 359px;
    height: 79px;
    border: 1px dashed rgba(127, 135, 151, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999999;
  }
}

</style>
