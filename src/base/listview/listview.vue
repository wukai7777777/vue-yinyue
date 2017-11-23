<template>
   <scroll 
    class="listview"
    :data="data"
    ref="listview"
    :is-scroll="true"
    :probe-type="3"
    @scroll="scroll"
   >
      <ul>
        <li class="list-group" v-for="group in data" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <uL>
            <li class="list-group-item" v-for="item in group.items">
              <img class="avatar" v-lazy="item.avatar">
              <span class="name">{{item.name}}</span>
            </li>
          </uL>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart="onShrotcutTouchStart" @touchmove.stop.prevent="onShrotcutTouchmove">
        <ul>
          <li class="item" :class="{current: curIndex == index}" v-for="(item, index) in shortcutList" :data-index="index">
            {{item}}
          </li>
        </ul>
      </div>
   </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
const ANTCH_HEIGHT = 18 //右边角标的高度 A B C .....
export default {
  data() {
    return {
      everyHeight: [],
      curIndex: 0
    }
  },
  created() {
    this.touch = {}
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  components: {
    Scroll
  },
  methods: {
    onShrotcutTouchStart(e) {
      let curIndex = getData(e.target, 'index')
      
      let fristTouch = e.touches[0]
      this.touch.y1 = fristTouch.pageY
      this.touch.curIndex = curIndex
      this.scrollTo(curIndex)
    },
    onShrotcutTouchmove(e) {
      let fristTouch = e.touches[0]
      this.touch.y2 = fristTouch.pageY
      let delat = (this.touch.y2-this.touch.y1)/ANTCH_HEIGHT | 0
      let curIndex = delat + parseInt(this.touch.curIndex)
     
      this.scrollTo(curIndex)
    },
    scrollTo(index) {
      if(!index && index!==0){
        return
      }
      if(index<0){
        index = 0
      }else if(index>this.everyHeight.length-1){
        index = this.everyHeight.length-2
      }
      console.log(index)
       this.curIndex = index
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    scroll(pos) {
      let scrollY = Math.abs(Math.floor(pos.y))
      let height = this.everyHeight
      for(let i=0; i<height.length; i++ ) {
        if(!height[i+1] || (scrollY >= height[i] && scrollY <= height[i+1])){
          console.log(i)
          this.curIndex = i
          return
        }
      }
    },
    getGroupHeight() {
      this.everyHeight = []
      setTimeout(() => {
        let lists = this.$refs.listGroup
        let height = 0
        this.everyHeight.push(height)
        for(let i=0; i<lists.length; i++){
          let item = lists[i]
          height += item.clientHeight
          this.everyHeight.push(height)
        }
      },20)
    }
  },
  watch: {
      data() {
        this.getGroupHeight()
      }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>