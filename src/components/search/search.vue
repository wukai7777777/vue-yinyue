<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @changeQuery="changeQuery"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query" ref="shortcutWrapper">
      <scroll class="shortcut" ref="shortcut" :data="searchHistory">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="selectQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="clearAll">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list :searches="searchHistory" @selectItem="selectQuery" @deleteItem="deleteSearchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest @select="saveSearchHistory(query)" @blurInput="blurInput" :show-singer="showSinger" :query="query" ref="suggest"></suggest>
    </div>
    <confirm :text="'你确定要清空历史列表吗？'" ref="confirm" @confirm="confirm"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmsscript-6">
  import SearchBox from 'base/search-box/search-box'
  import {getHotKey} from 'api/search.js'
  import Scroll from 'base/scroll/scroll'
  import Suggest from 'components/suggest/suggest'
  import {mapActions, mapGetters} from 'vuex'
  import SearchList from 'base/search-list/search-list'
  import Confirm from 'base/confirm/confirm'
  import {playListMixin, searchMixin} from 'common/js/playListMixin'

  
  export default {
    mixins: [playListMixin, searchMixin],
    data(){
      return {
        hotKey: [],
        showSinger: true,
      }
    },
    computed: {
      dataRefresh() {
        return hotKey.concat(this.searchHistory)
      }
    },
    components: {
      SearchBox,
      Scroll,
      Suggest,
      SearchList,
      Confirm
    },
    created() {
      this._getHotKey()
    },
    methods: {
      ...mapActions([
        'clearSearchHistory'
      ]),
       handleMixin(playList) {
          let bottom = playList.length>0 ? '60px' : ''
          this.$refs.shortcutWrapper.style.bottom = bottom
          this.$refs.shortcut.refresh()
          this.$refs.searchResult.style.bottom = bottom
          this.$refs.suggest.refresh()
      },
      _getHotKey() {
        getHotKey().then((res)=>{
          if(res.code === 0){
            this.hotKey = res.data.hotkey.slice(0, 10)
          }
        })
      },
      
      // saveSaerch() {
      //   this.saveSearchHistory(this.query)
      // },
      // deleteItem(query) {
      //   this.deleteSearchHistory(query)
      // },
      clearAll() {
        this.$refs.confirm.show()
        //this.clearSearchHistory()
      },
      confirm() {
        this.clearSearchHistory()
      }
    },
    watch: {
      query(newQuery) {
        if(!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
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
