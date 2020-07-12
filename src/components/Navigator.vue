<template>
  <div class="nav">
    <div class="nav-title" :class="{'fontsmaller': title.length > 10 }">{{ this.title }}</div>
    <!-- light dark 主题, 菜单分两部分 -->
    <div class="nav-menu nav-menu-left" v-if="theme != 'blue'">
      <div @click="changeRange(0)" v-if="start >= 1 && menuData.length > 6" class="nav-btn-prev">
        <i class="iconfont icon-triangle-left-solid"></i>
      </div>
      <div class="nav-menu-inner">
        <!-- <Angleborder type="0" direction="left"></Angleborder> -->
        <div @click="navClickFun(v, i)" class="nav-item" v-for="(v,i) in leftMenu" :key="i" :class="{'active': pageIndexOnNav === i,'left-angle': i === 2}">
          <span :class="{'nav-border-rt': (i === 0 || i === 1) && showMenu.length > i + 1 }">{{v.name}}</span>
        </div>
      </div>
    </div>
    <div class="nav-menu nav-menu-right" v-if="theme != 'blue'">
      <div @click="changeRange(1)" v-if="end < menuData.length && menuData.length > 6" class="nav-btn-next">
        <i class="iconfont icon-triangle-right-solid"></i>
      </div>
      <div class="nav-menu-inner">
        <!-- <Angleborder type="0" direction="right"></Angleborder> -->
        <div @click="navClickFun(v, i + 3)" class="nav-item" v-for="(v,i) in rightMenu" :key="i" :class="{'active': pageIndexOnNav === i + 3,'right-angle': i === 0}">
          <span :class="{'nav-border-rt': (i === 0 || i === 1) && showMenu.length > i + 1 }">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- blue 主题, 菜单合并 -->
    <div class="nav-menu-long" v-if="theme == 'blue'">
      <div @click="changeRange(0)" v-if="start >= 1 && menuData.length > 6" class="nav-btn-prev">
        <i class="iconfont icon-triangle-left-solid"></i>
      </div>
      <div class="nav-menu-inner">
        <!-- <Angleborder type="0" direction="right"></Angleborder> -->
        <div @click="navClickFun(v, i)" class="nav-item" v-for="(v,i) in showMenu" :key="i" :class="{'active': pageIndexOnNav === i}">
          <span :class="{'nav-border-lf': i != 0}">{{v.name}}</span>
        </div>
      </div>
      <div @click="changeRange(1)" v-if="end < menuData.length && menuData.length > 6" class="nav-btn-next">
        <i class="iconfont icon-triangle-right-solid"></i>
      </div>
    </div>
    <!-- <div class="theme-select-btn" @click="showThemeMenu(!themeOnSelect)"><i class="iconfont icon-setting"></i> 主题</div>
    <div class="theme-select-menu" :style="{ 'display': themeOnSelect ? 'block' : 'none' }">
      <div @click="changeTheme(item.value)" v-for="(item, $index) in themes" :key="$index" class="theme-select-item" :style="{'background': item.color}">{{ item.name }}</div>
    </div> -->
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
      // 当前展示的导航起点
      start: 0,
      // 当前展示的导航终点
      end: 6
    }
  },
  components:{
    Angleborder,
  },
  computed:{
    ...mapGetters(['menuData']),
    sysid(){
      return store.state.base.SYSTEM_ID
    },
    // 当前展示的导航列表
    showMenu(){
      let data = this.menuData.map( (item) => {
        item.path = `/${this.sysid}/page/${item.id}`
        return item
      })
      console.log(data)
      return data.slice(this.start, this.end)
    },
    leftMenu(){
      let data = this.showMenu
      return data.slice(0, 3)
    },
    rightMenu(){
      let data = this.showMenu
      return data.slice(3, 6)
    },
    pageIndex(){
      return store.state.base.PAGE_INDEX
    },
    pageIndexOnNav(){
      return this.pageIndex - this.start
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
    // 导航列表前后翻页（模块数超出6个）
    changeRange(direction){
      if(direction && this.end < this.menuData.length){
        this.start ++;
        this.end ++
      }else if(!direction && this.start > 0){
        this.start --;
        this.end --
      }
    },
    // 切换主题 先隐藏
    changeTheme(theme){
      this.$store.dispatch('setThemeTypeAction', {theme})
      this.themeOnSelect = false
    },
    showThemeMenu(bool){
      this.themeOnSelect = bool
    },
    navClickFun(v, index){
      // 获取在全部导航中的index
      let realIndex = index + this.start
      try {
        this.$store.dispatch('setPageIndexAction', {index:realIndex})
        this.$router.push({ path: v.path || '/' })
      } catch (error) {
        console.log(error)
      }

    }
  }
}
</script>
