<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper"
        @touchstart.prevent="progressStart"
        @touchmove.prevent="progressMove"
        @touchend="progressEnd"
       ref="progressBtn">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
    import {prefixStyle} from 'common/js/dom'
    const transform = prefixStyle('transform')
    const btnWidth = 16;
    export default{
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        created() {
            this.touch = {}
        },
        methods: {
            progressStart(e) {
                this.touch.initail = true;
                if(!this.touch.initail){
                    return
                }
                let touch = e.changedTouches
                this.touch.startX = touch[0].pageX;
                this.touch.left = this.$refs.progress.clientWidth;
            },
            progressMove(e) {
                if(!this.touch.initail) {
                    return
                }
                let touch = e.changedTouches;
                let disX = touch[0].pageX - this.touch.startX
                let offsetWidth = Math.min(this.$refs.progressBar.clientWidth - btnWidth, Math.max(0, this.touch.left + disX))
                console.log(this.$refs.progressBar.clientWidth - btnWidth)
                console.log(offsetWidth)
                this.moveStart(offsetWidth)
            },
            progressEnd() {
                this.touch.initail = false;
                this.triggerProgress() //触发设置歌曲进度
            },
            moveStart(offsetWidth) {
                this.$refs.progress.style.width = `${offsetWidth}px`
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
            },
            triggerProgress() { 
                let perWidh = this.$refs.progressBar.clientWidth - btnWidth;
                let precent = this.$refs.progress.clientWidth/perWidh
                this.$emit('progressChange', precent)
            },
            progressClick(e) {//点击进度条设置音乐进度
            //当我们点击progressBar  获取的e.offsetX 不对
                //let offsetX = e.offsetX
                const rect = this.$refs.progressBar.getBoundingClientRect()
                const offsetX = e.pageX - rect.left;
                console.log(offsetX, 888888)
                this.moveStart(offsetX)
                this.triggerProgress()
            }
        },
        watch: {
            percent(newPercent){
                if(newPercent && !this.touch.initail) {
                    let perWidh = this.$refs.progressBar.clientWidth - btnWidth;
                    let offsetWidth = perWidh*newPercent
                    this.moveStart(offsetWidth)
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>