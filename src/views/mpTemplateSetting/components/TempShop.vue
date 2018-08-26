<template>
  <div class="coupon-container" @click="selectTemp" @mousedown="startMove($event)">
  	<img width="100%" :src="require('@/assets/test3.png')">
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
<style>
.coupon-container {

}

</style>
