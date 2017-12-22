<template>
  <div class="player" v-show="playList.length>0">
    <transition 
        name="normal"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
        @after-leave="afterLeave"
    >
      <div class="normal-player" v-show="fullScreen">
          <div class="background">
            <img width="100%" height="100%" :src="currentSong.image">
          </div>
          <div class="top">
            <div class="back" @click="back">
              <i class="icon-back"></i>
            </div>
            <h1 class="title" v-html="currentSong.name"></h1>
            <h2 class="subtitle" v-html="currentSong.singer"></h2>
          </div>
          <div class="middle">
            <div class="middle-l">
              <div class="cd-wrapper" ref="cdWrapper">
                <div class="cd">
                  <img :src="currentSong.image" class="image">
                </div>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="progress-wrapper">
              <span class="time time-l">{{format(currentTiem)}}</span>
              <div class="progress-bar-wrapper">
                <progress-bar :percent="percent" @progressChange="setProgessBar"></progress-bar>
              </div>
              <span class="time time-r">{{format(currentSong.duration)}}</span>
            </div>
            <div class="operators">
              <div class="icon i-left" @click="changeMode">
                <i :class="playMode"></i>
              </div>
              <div class="icon i-left" :class="disableCla">
                <i class="icon-prev" @click="prev"></i>
              </div>
              <div class="icon i-center"  :class="disableCla">
                <i class="needsclick" :class="iconPlaying" @click="togglePlay"></i>
              </div>
              <div class="icon i-right"  :class="disableCla">
                <i class="icon-next" @click="next"></i>
              </div>
              <div class="icon i-right">
                <i class="icon icon-not-favorite"></i>
              </div>
            </div>
          </div>
      </div>
    </transition>
    <transition name="mini">
      <div @click="playerShow" class="mini-player" v-show="!fullScreen">
        <div class="icon">
          <img :src="currentSong.image" width="40" height="40" alt="">
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i class="icon-mini icon-play-mini"
             :class="{'icon-pause-mini': playing}"
             @click.stop="togglePlay"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime($event)" @ended="end"></audio>
  </div>
</template>
<script>
    import {mapGetters, mapMutations} from 'vuex'
    import * as types from '../../store/mutation-type'
    import animations from 'create-keyframe-animation'
    import {prefixStyle} from 'common/js/dom'
    import progressCircle from 'base/progress-circle/progress-circle'
    import progressBar from 'base/progress-bar/progress-bar'
    import {playMode} from 'common/js/config'
    import {shuffle} from 'common/js/util'
    const transform = prefixStyle('transform')

    export default {
      data() {
        return{
          radius: 32,
          songReady: false,
          currentTiem: ''
        }
      },
      computed: {
        ...mapGetters([
          'fullScreen',
          'playList',
          'currentSong',
          'playing',
          'currentIndex',
          'mode',
          'sequenceList'
         ]),
         iconPlaying() {
           return this.playing ? 'icon-pause' : 'icon-play'
         },
         disableCla() {
           return this.songReady ? '' : 'disable'
         },
         percent() {
           return this.currentTiem / this.currentSong.duration;
         },
         playMode() {
           return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
         }
      },
      components: {
        progressCircle,
        progressBar
      },
      methods: {
        back(){
          //分别用两种方法都可以
          this.setFullScreen(false)
          //this.$store.commit(types.SET_FULL_SCREEN, false)
        },
        ...mapMutations({
          setFullScreen: 'SET_FULL_SCREEN',
          setPlayState: 'SET_PLAYING_STATE',
          setCurIndex: 'SET_CURRENT_INDEX',
          setPlayMode: 'SET_MODE',
          setPlayList: 'SET_PLAY_LIST'
        }),
        playerShow() {
          this.setFullScreen(true)
        },
        enter(el, done) {
          const {x, y, scale} = this._getPosAadScale()

          let animation = {
            0: {
              transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
            },
            60: {
              transform: `translate3d(0, 0, 0) scale(1.1)`
            },
            100: {
              transform: `translate3d(0, 0, 0) scale(1)`
            }
          }

          animations.registerAnimation({
            name: 'move',
            animation,
            presets: {
              duration: 400,
              easing: 'linear'
            }
          })

          animations.runAnimation(this.$refs.cdWrapper, 'move', done)

        },
        afterEnter(el, done) {
          animations.unregisterAnimation('move')
          this.$refs.cdWrapper.style.animation = ''
        },
        leave(el, done) {
          this.$refs.cdWrapper.style.transition = 'all 0.4s'
          const {x, y, scale} = this._getPosAadScale();
          this.$refs.cdWrapper.style[transform] = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
          this.$refs.cdWrapper.addEventListener('transitionend', done);
        },
        afterLeave(el, done) {
          this.$refs.cdWrapper.style.transition = ''
          this.$refs.cdWrapper.style[transform] = ''
        },
        _getPosAadScale() {
          const targetWidth = 40
          const paddingLeft = 40
          const paddingBottom = 30
          const paddingTop = 80
          const width = window.innerWidth * 0.8
          const scale = targetWidth / width
          const x = -(window.innerWidth / 2 - paddingLeft)
          const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
          return {
            x,
            y,
            scale
          }
        },
        togglePlay() {
          this.setPlayState(!this.playing)
        },
        end() {
          if(this.mode === playMode.loop) {
            this.loop()
          }else{
            this.next()
          }
        },
        loop() {
          this.$refs.audio.currentTiem = 0
          this.$refs.audio.play()
        },
        prev() {
          
          if(!this.songReady) { // audio标签触发 canplay事件才可以点击下一页
            return;
          }
          let index = this.currentIndex - 1;
          if(index === -1) {
            index = this.playList.length-1;
          }
          if(this.playing === false){
            this.togglePlay()
          }
          this.setCurIndex(index);
          this.songReady = false;
        },
        next() {
          
          if(!this.songReady) {
            return;
          }
          let index = this.currentIndex + 1;
          if(index === this.playList.length) {
            index = 0;
          }
          if(this.playing === false){
            this.togglePlay()
          }
          this.setCurIndex(index);
          this.songReady = false
        },
        ready() {
          this.songReady = true;
        },
        error() {
          this.songReady = true;
        },
        updateTime(e) {
          this.currentTiem = e.target.currentTime;
        },
        setProgessBar(precent) {
          let currentTime = this.currentSong.duration*precent
          this.$refs.audio.currentTime = currentTime; //改变音乐播放进度
          if(!this.playing) {// 在拖动滚动条且当暂定时将播放按钮打开
            this.togglePlay()
          }
        },
        changeMode() {
          let mode = (this.mode+1)%3
          this.setPlayMode(mode)
          let list = null;
          if(mode === playMode.random) {
            list = shuffle(this.sequenceList)
          }else{
            list = this.sequenceList
          }
          this.resetCurrentIndex(list)
          this.setPlayList(list);
        },
        resetCurrentIndex(list) {
          let index = list.findIndex((item) => {
            return item.id === this.currentSong.id
          })
          this.setCurIndex(index)
        },
        format(interval) {
          let time = ''
          interval = interval | 0;
          let minute = interval/60 | 0;
          let second = this._pad(interval % 60);
          time = minute + ':' + second
          return time;
        },
        _pad(s, n=2) {
          let len = s.toString().length;
          while(len<n) {
            s = '0'+s;
            len++
          }
          return s
        }
      },
      watch: {
        currentSong(newSong, oldSong) {
          if(newSong.id === oldSong.id){
            return
          }
          this.$nextTick(() => {
            this.$refs.audio.play()
          })
        },
        playing() {
          let player = this.$refs.audio;
          this.$nextTick(() => {
            this.playing ? player.play() : player.pause();
          })
        }
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            box-sizing: border-box
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>