<template>
  <div class="coupon-container" @click="selectTemp" @mousedown="startMove($event)">
  	ss
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
