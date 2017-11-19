<template>
  <div class="slider" ref="slider">
      <div  class="slider-group" ref="sliderGroup">
          <slot></slot>
      </div>
      <div class="dots">
          <span class="dot" v-for="(item, index) in dots" :class="{active: curIndexPage === index }"></span>
      </div>
  </div>
</template>
<script>
import {addClass} from 'common/js/dom.js'
import Bsrcoll from 'better-scroll'
export default {
  props: {
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    loop: {
      type: Boolean,
      default: true
    }
  },
  data() {
      return {
          dots: [],
          curIndexPage: 0
      }
  },
  mounted() {
    setTimeout(() => {
        this._setSliderWidth()
        this._initDots()
        this._initSlider()
        
        if(this.autoPlay){
            this._play()
        }
    }, 20)

    window.addEventListener('resize', () => {
        if(!this.slider){
            return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.childrens = this.$refs.sliderGroup.children
      let len = this.childrens.length
      let sliderWidth = this.$refs.slider.clientWidth
      let width = 0
      for (let i = 0; i < len; i++) {
          let childrens = this.childrens[i]
          addClass(childrens, 'slider-item')
          childrens.style.width = sliderWidth + 'px'
          width += sliderWidth
      }
      if (this.loop && !isResize) { //无缝滚动
          width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
    },
    _initSlider() {
        this.slider = new Bsrcoll(this.$refs.slider, {
            scrollX: true,
            scrollY: false,
            momentum: false,
            snap: true,
            snapLoop: this.loop,
            snapthreshold: 0.3,
            snapSpeed: 400,
            click: true
        })
        this.slider.on('scrollEnd', ()=>{
            let pageIndex = this.slider.getCurrentPage().pageX
            if(this.loop){ //无缝滚动
                pageIndex -= 1
            }
            this.curIndexPage = pageIndex
            if(this.autoPlay){
                clearTimeout(this.timer)
                this._play()
            }
        })
    },
    _initDots() {
        this.dots = new Array(this.childrens.length)
    },
    _play() {
        let indexPage = this.curIndexPage + 1
        if(this.loop){
            indexPage += 1
        }
        this.timer = setTimeout(() => {
            this.slider.goToPage(indexPage, 0, 400)
        }, this.interval)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    position relative
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>