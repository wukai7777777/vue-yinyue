<template>
    <transition name="slide">
        <div class="user-center">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <div class="switches-wrapper">
                <switches :switches="switches" :current-index="currentIndex" @switch="selectItem"></switches>
            </div>
            <div class="play-btn" @click="playRandom">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <scroll :data="favoriteList" class="list-scroll" ref="favoritelist" v-if="currentIndex === 0">
                    <div class="list-inner">
                        <song-list :songs="favoriteList" @select="selectSong"></song-list>
                    </div>
                </scroll>
                <scroll :data="playHistory" class="list-scroll" ref="playhistory" v-if="currentIndex === 1">
                    <div class="list-inner">
                        <song-list :songs="playHistory" @select="selectSong"></song-list>
                    </div>
                </scroll>
            </div>
            <div class="no-result-wrapper" v-show="noResult">
                <no-result :title="noResultTitle"></no-result>
            </div>
        </div>
    </transition>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import Switches from 'base/switches/switches'
    import SongList from 'base/song-list/song-list'
    import {mapActions, mapGetters} from 'vuex'
    import Song from 'common/js/song'
    import {playListMixin} from 'common/js/playListMixin'
    import NoResult from 'base/no-result/no-result'

    export default{
        mixins: [playListMixin],
        data() {
            return{
                switches: [
                    {name: '我喜欢的'},
                    {name: '最近听的'}
                ],
                currentIndex: 0
            }
        },
        computed:{
            noResult(){
                if(this.currentIndex === 0) {
                    return !this.favoriteList.length
                }else{
                    return !this.playHistory.length
                }
            },
            noResultTitle(){
                if(this.currentIndex === 0) {
                    return '暂无最喜欢'
                }else{
                    return '暂无最近播放'
                }
            },
            ...mapGetters([
                'playHistory',
                'favoriteList'
            ])
        },
        components: {
            Scroll,
            Switches,
            SongList,
            NoResult
        },
        methods: {
            handleMixin(playList) {
                let bottom = playList.length > 0 ? '60px' : 0
                this.$refs.listWrapper.style.bottom = bottom
                this.$refs.favoritelist && this.$refs.favoritelist.refresh()
                this.$refs.playhistory && this.$refs.playhistory.refresh()
            },
            selectItem(index) {
                this.currentIndex = index
            },
            back() {
                this.$router.back()
            },
            selectSong(item) {
                this.insertSong(new Song(item))
            },
            playRandom() {
                let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
                if(!list.length) {
                    return
                    
                }
                list = list.map((item) => {
                    return new Song(item)
                })
                this.randomPlay({list})
            },
            ...mapActions([
                'insertSong',
                'randomPlay'
            ])
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>