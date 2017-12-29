
<template>
    <scroll class="suggest"
     :data="result"
     :pullup="pullup"
     @scrollToEnd="searchMore"
     ref="suggest"
     >
        <ul class="suggest-list">
            <li class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i :class="getIcon(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getNameList(item)"></p>
                </div>
            </li>
            <loading v-show="hasMore" title=""></loading>
        </ul>
        <div class="no-result-wrapper">

        </div>
    </scroll>
</template>
<script>
    import Scroll from 'base/scroll/scroll'
    import Loading from 'base/loading/loading'
    import Suggest from 'components/suggest/suggest'
    import {search} from 'api/search'
    import {createSong} from 'common/js/song.js'
    const TYPE_SINGER = 'singer'
    const perpage = 30;
    export default{
        props: {
            query: {
                type: String,
                default: '',
            },
            showSinger: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                page: 1,
                result: [],
                pullup: true,
                hasMore: true
            }
        },
        components: {
            Scroll,
            Loading,
            Suggest
        },
        methods: {
            _search() {
                this.page = 1
                this.hasMore = true
                this.$refs.suggest.scrollTo(0,0)
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if(res.code ===0 ) {
                        this.result = this.genResult(res.data)
                        this.checkMore(res.data.song) //判断是否还有数据
                    }
                })
            },
            searchMore() {
                if(!this.hasMore) {
                    return
                }
                search(this.query, this.page, this.showSinger, perpage).then((res) => {
                    if(res.code ===0 ) {
                        this.result = this.result.concat(this.genResult(res.data))
                        this.checkMore(res.data.song) //判断是否还有数据
                    }
                })
            },
            checkMore(data) {
                if(!data.list.length || perpage*data.curpage>=data.totalnum){
                    this.hasMore = false
                }else{
                    this.hasMore = true
                    this.page ++
                    console.log(1212)
                }
            },
            getIcon(item) {
                if(item.type === TYPE_SINGER) {
                    return 'icon-mine'
                }else{
                    return 'icon-music'
                }
            },
            getNameList(item) {
                if(item.type === TYPE_SINGER) {
                    return item.singername
                }else{
                    return `${item.name}-${item.singer}`
                }
            },
            genResult(data) {
                let ret = []
                if(data.zhida && data.zhida.singerid) {
                    ret.push({...data.zhida, ...{type: TYPE_SINGER}})
                }
                if(data.song) {
                    ret = ret.concat(this._normalData(data.song.list))
                }
                return ret
            },
            _normalData(list) {
                let ret = []
                list.forEach((muiscData) => {
                    if(muiscData.songname && muiscData.albummid) {
                        ret.push(createSong(muiscData))
                    }
                });
                console.log(ret)
                return ret
            }
        },
        watch: {
            query() {
                this._search()
            }
        }
    }
</script>



<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>