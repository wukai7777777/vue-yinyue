<template>
    <transition name="slide">
        <div class="add-song" v-show="showFlag" @click.stop>
            <div class="header">
                <h1 class="title">添加歌曲列表</h1>
                <div class="close" @click="hide">
                    <i class="icon-close"></i>
                </div>
            </div>
            <div class="search-box-wrapper">
                <search-box @changeQuery="changeQuery" ref="searchBox" placeholder="搜索歌曲"></search-box>
            </div>
            <div class="shortcut" v-show="!query">
                <switches :switches="switches" :current-index="currentIndex" @switch="switchItem"></switches>
                <div class="list-wrapper">
                    <scroll :data="playHistory" class="list-scroll" ref="songList" v-if="currentIndex === 0">
                        <div class="list-inner">
                            <song-list :songs="playHistory" @select="selectItem"></song-list>
                        </div>
                    </scroll>
                    <scroll :data="searchHistory" ref="searchList" class="list-scroll" v-if="currentIndex === 1">
                        <div class="list-inner">
                            <search-list :searches="searchHistory" @deleteItem="deleteSearchHistory" @selectItem="selectQuery"></search-list>
                        </div>
                    </scroll>
                </div>
            </div>
            <div class="search-result" v-show="query">
                <suggest :query="query"
                 :show-singer="showSinger"
                  @blurInput="blurInput"
                   @select="selectSuggest(query)"
                   @beforeScroll="blurInput"
                ></suggest>
            </div>
            <top-tip ref="topTip">
                <div class="tip-title">
                    <i class="icon-ok"></i>
                    <span class="text">1首歌曲已经添加到列表</span>
                </div>
            </top-tip>
        </div>
    </transition>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import SearchBox from 'base/search-box/search-box'
    import SongList from 'base/song-list/song-list'
    import SearchList from 'base/search-list/search-list'
    import Suggest from 'components/suggest/suggest'
    import {searchMixin} from 'common/js/playListMixin'
    import Switches from 'base/switches/switches'
    import {mapGetters, mapActions} from 'vuex'
    import Song from 'common/js/song'
    import TopTip from 'base/top-tip/top-tip'

    export default{
        mixins: [searchMixin],
        data() {
            return{
                showFlag: false,
                showSinger: false,
                switches: [
                    {name: '最近播放'},
                    {name: '搜索历史'}
                ],
                currentIndex: 0
            }
        },
        computed: {
            ...mapGetters([
                'playHistory'
            ])
        },
        components: {
            Scroll,
            SearchBox,
            Switches,
            SongList,
            SearchList,
            Suggest,
            TopTip
        },
        methods: {
            ...mapActions([
                'insertSong'
            ]),
            show() {
                this.showFlag = true
                setTimeout(() => {
                    if(this.currentIndex === 0) {
                        this.$refs.songList.refresh()
                    }else if(this.currentIndex === 1){
                        this.$refs.searchList.refresh()
                    }
                }, 20)
            },
            hide() {
                this.showFlag = false
            },
            selectSuggest(query) {
                this.saveSearchHistory(query)
                this.showTip()
            },
            switchItem(index) {
                this.currentIndex = index
            },
            selectItem(item, index) {
                if(index !== 0) {
                    this.insertSong(new Song(item))
                    this.showTip()
                }
            },
            showTip() {
                this.$refs.topTip.show()
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .add-song
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    z-index: 200
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header
      position: relative
      height: 44px
      text-align: center
      .title
        line-height: 44px
        font-size: $font-size-large
        color: $color-text
      .close
        position: absolute
        top: 0
        right: 8px
        .icon-close
          display: block
          padding: 12px
          font-size: 20px
          color: $color-theme

    .search-box-wrapper
      margin: 20px
    .shortcut
      .list-wrapper
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .list-scroll
          height: 100%
          overflow: hidden
          .list-inner
            padding: 20px 30px
    .search-result
      position: fixed
      top: 124px
      bottom: 0
      width: 100%
    .tip-title
      text-align: center
      padding: 18px 0
      font-size: 0
      .icon-ok
        font-size: $font-size-medium
        color: $color-theme
        margin-right: 4px
      .text
        font-size: $font-size-medium
        color: $color-text
</style>