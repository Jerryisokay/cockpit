<template>
  <div class="nav">
    <div class="nav-title">{{ this.title }}</div>
    <!-- light dark 主题, 菜单分两部分 -->
    <div class="nav-menu nav-menu-left" v-if="theme != 'blue'">
      <div class="nav-menu-inner">
        <Angleborder type="0" direction="left"></Angleborder>
        <div @click="navClickFun(v, i)" class="nav-item" v-for="(v,i) in leftMenu" :key="i" :class="{'active': pageIndex === i,'left-angle': i === 2}">
          <span :class="{'nav-border-rt': hasBorder(i,'left')}">{{v.name}}</span>
        </div>
      </div>
    </div>
    <div class="nav-menu nav-menu-right" v-if="theme != 'blue'">
      <div class="nav-menu-inner">
        <Angleborder type="0" direction="right"></Angleborder>
        <div @click="navClickFun(v, i + 3)" class="nav-item" v-for="(v,i) in rightMenu" :key="i" :class="{'active': pageIndex === i + 3,'right-angle': i === 0}">
          <span :class="{'nav-border-rt': hasBorder(i,'right')}">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- blue 主题, 菜单合并 -->
    <div class="nav-menu-long" v-if="theme == 'blue'">
      <div class="nav-menu-inner">
        <!-- <Angleborder type="0" direction="right"></Angleborder> -->
        <div @click="navClickFun(v, i)" class="nav-item" v-for="(v,i) in menuData" :key="i" :class="{'active': pageIndex === i}">
          <span :class="{'nav-border-lf': i != 0}">{{v.name}}</span>
        </div>
      </div>
    </div>
    <div class="theme-select-btn" @click="showThemeMenu(!themeOnSelect)"><i class="iconfont iconfont-setting"></i> 主题</div>
    <div class="theme-select-menu" :style="{ 'display': themeOnSelect ? 'block' : 'none' }">
      <div @click="changeTheme(item.value)" v-for="(item, $index) in themes" :key="$index" class="theme-select-item" :style="{'background': item.color}">{{ item.name }}</div>
    </div>
    <!-- <div class="nav-item" @click="changeTheme" :class="{'dark': theme === 'light', 'light': theme === 'dark'}">切换主题色</div> -->
  </div>
</template>

<script>
import Angleborder from '@/components/Angleborder'
import store from '@/store'
import { mapGetters } from 'vuex'

export default {
  name: 'navigator',
  data(){
    return{
      navData: [],
      themeOnSelect: false,
    }
  },
  components:{
    Angleborder,
  },
  computed:{
    ...mapGetters(['menuData','leftMenu','rightMenu']),
    pageIndex(){
      return store.state.base.PAGE_INDEX
    },
    themes(){
      return store.state.base.THEMES
    },
    theme(){
      return store.state.base.THEME_TYPE
    },
    title(){
      return store.state.base.PAGE_TITLE
    }
  },
  mounted(){
    // console.log( this.menuData )
  },
  methods:{
    changeTheme(theme){
      this.$store.dispatch('setThemeTypeAction', {theme})
      this.themeOnSelect = false
    },
    showThemeMenu(bool){
      this.themeOnSelect = bool
    },
    hasBorder(i, dir){
      if(dir == 'left'){
        return i === 0 && this.pageIndex >= 2 || i === 1 &&(this.pageIndex ==0 || this.pageIndex >= 3)
      }else{
        return i === 0 && (this.pageIndex <= 2 || this.pageIndex >= 5) || i === 1 && this.pageIndex <= 3
      }
    },
    navClickFun(v, index){
      console.log('this.pageIndex ' + this.pageIndex)
      console.log('PAGE_INDEX ' + store.state.base.PAGE_INDEX)
      // this.pageIndex = index
      try {
        this.$store.dispatch('setPageIndexAction', {index})
        this.$router.push({ path: v.path || '/' })
      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>
