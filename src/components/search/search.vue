<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @changeQuery="changeQuery"></search-box>
    </div>
    <div class="shortcut-wrapper">
      <scroll class="shortcut">
        <div>
          <div class="hot-key" v-show="!query">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="selectQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query">
      <suggest :show-singer="showSinger" :query="query"></suggest>
    </div>
  </div>
</template>

<script type="text/ecmsscript-6">
  import SearchBox from 'base/search-box/search-box'
  import {getHotKey} from 'api/search.js'
  import Scroll from 'base/scroll/scroll'
  import Suggest from 'components/suggest/suggest'

  export default {
    data(){
      return {
        hotKey: [],
        showSinger: true,
        query: ''
      }
    },
    components: {
      SearchBox,
      Scroll,
      Suggest
    },
    created() {
      this._getHotKey()
    },
    methods: {
      _getHotKey() {
        getHotKey().then((res)=>{
          if(res.code === 0){
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      selectQuery(query) {
        this.$refs.searchBox.selectQuery(query)
      },
      changeQuery(query) {
        this.query = query
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
