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
            <div class="shortcut">
                <switches v-show="!query" :switches="switches" :current-index="currentIndex" @switch="switchItem"></switches>
                <div class="list-wrapper">
                    <scroll>
                        <div class="list-inner">
                            <song-list :songs="songs"></song-list>
                        </div>
                    </scroll>
                    <scroll>
                        <div class="list-inner">
                            <!-- <search-list :searches="searches" ></search-list> -->
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
    export default{
        mixins: [searchMixin],
        data() {
            return{
                showFlag: false,
                songs:[],
                searches: [],
                showSinger: false,
                switches: [
                    {name: '最近播放'},
                    {name: '搜索历史'}
                ],
                currentIndex: 0
            }
        },
        components: {
            Scroll,
            SearchBox,
            Switches,
            SongList,
            SearchList,
            Suggest,
        },
        methods: {
            show() {
                this.showFlag = true
            },
            hide() {
                this.showFlag = false
            },
            selectSuggest(query) {
                this.saveSearchHistory(query)
            },
            switchItem(index) {
                console.log(index)
                this.currentIndex = index
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