<template>
  <div>
    <div v-if="type == 0">
      <div v-if="direction != 'right'" class="nav-angle-common nav-angle-1"></div>
      <div v-if="direction != 'right'" class="nav-angle-common nav-angle-3"></div>
      <div v-if="direction != 'left'" class="nav-angle-common nav-angle-2"></div>
      <div v-if="direction != 'left'" class="nav-angle-common nav-angle-4"></div>
    </div>
    <div v-if="type == 1">
      <div class="mid-container-angle mid-container-angle-left-top"></div>
      <div class="mid-container-angle mid-container-angle-left-bottom"></div>
      <div class="mid-container-angle mid-container-angle-right-top"></div>
      <div class="mid-container-angle mid-container-angle-right-bottom"></div>
    </div>
    <div v-if="type == 2">
      <div class="aside-dialog-angle aside-dialog-angle-1"></div>
      <div class="aside-dialog-angle aside-dialog-angle-2"></div>
      <div v-if="theme == 'blue'" class="aside-dialog-angle aside-dialog-angle-3"></div>
      <div v-if="theme == 'blue'" class="aside-dialog-angle aside-dialog-angle-4"></div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'angleborder',
  data(){
    return {
      temp: ''
    }
  },
  props: {
    type: {
      type: String,
      default: '0', // 0 nav , 1 mid container, 2 dialog
    },
    direction: {
      type: String,
      default: ''
    }
  },
  computed:{
    theme(){
      return store.state.base.THEME_TYPE
    }
  }
}
</script>
