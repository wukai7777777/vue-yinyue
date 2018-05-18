<template>
  <div class="recommend" ref="recommend">
    <div ref="imgBox" class="imgBox"></div>
      <scroll ref="scroll" class="recommend-content" :data="dissList">
        <div>
          <div class="slider-wrapper" v-if="slideData.length">
            <slider>
              <div v-for="item in slideData">
                <a :href="item.linkUrl">
                  <img class="needsclick" @load="ImageLoad" :src="item.picUrl" alt="">
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌单推荐</h1>
            <ul>
              <li @click="selectItem(item)" class="item" v-for="item in dissList">
                <div class="icon">
                  <img width="60" height="60" v-lazy="item.imgurl" alt="">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
         <div class="loading-container" v-show="!dissList.length">
          <loading></loading>
        </div>
      </scroll>
      <router-view></router-view>
  </div>
</template>

<script>
  import {getRecommend, getDissList, taobaoke} from 'api/recommend'
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { playListMixin } from 'common/js/playListMixin.js'
  import {mapMutations} from 'vuex'
  import {delay} from 'common/js/util.js'

  export default {
    mixins: [playListMixin],
    data() {
      return {
        slideData: [],
        dissList: []
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    },
    created() {
      this._getRecommend()
      this._getDissList()


      // while(true) {
      //   await delay(500)
      //   console.log(1212121212);
      // }
      let p = (async () => {
        while(true) {
          console.time(111111)
          await delay(500)
          console.timeEnd(111111)
        }
      })()
      let time = new Date();
      let dis = 0
      setInterval(()=>{
        dis = time-new Date();
        console.log(dis, 222222)
        time = new Date()
      }, 500)
      // taobaoke().then((res) => {
      //   console.log(res, '淘宝客list')
      // })

      // this.imgUrl('/api/taobaoke').then((file) => { // ajax 请求 图片资源
      //   var img = document.createElement('img')
      //   if (typeof FileReader == 'function') {
      //     var reader = new FileReader();
      //     reader.onload = function(e) {
      //         img.src = e.target.result;
      //     };
      //     reader.readAsDataURL(file);
      //   }else{
      //     img.onload = function() {
      //       console.log('成功')
      //       window.URL.revokeObjectURL(img.src)
      //     }
      //     img.onerr = function(e) {
      //       console.log(e, '失败')
      //     }
      //     img.src = window.URL.createObjectURL(file);
      //   }
      //   let box = this.$refs.imgBox
      //   box.appendChild(img)
      // })

      //this.getAjax().then(console.log, console.error)

      // this.imgUrl().then(function(data) {
      //     console.log(data, 'blob')
      // })
    },
    methods: {
      ...mapMutations({
        setDisc: 'SET_DISC'
      }),
      selectItem(item) {
        this.$router.push({
          path: `recommend/${item.dissid}`
        })
        this.setDisc(item)
      },
      handleMixin(playList) { // mixin 单独处理方法
          let bottom = playList.length>0 ? '60px' : 0
          this.$refs.recommend.style.bottom = bottom
          this.$refs.scroll.refresh()
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === 0) {
            this.slideData = res.data.slider;
          }
        })
      },
      _getDissList() {
        getDissList().then((res) => {
          if (res.code === 0) {
            this.dissList = res.data.list
          }
        })
      },
      ImageLoad() {
        if(!this.checkLoadImg){
          this.checkLoadImg = true
          this.$refs.scroll.refresh();
        }
      },
      getAjax() {
        const url = '/api/taobaoke'
        return new Promise(function(resolve, reject) {
          let xhr = new XMLHttpRequest()

          xhr.open('GET', url, true)
          xhr.onload = function(e) {
            if(this.status === 200) {
              let result = JSON.parse(this.responseText);
              resolve(result)
            }
          }
          xhr.onerror = function(err) {
            reject(err)
          }
          xhr.send()
        })
      },
      imgUrl(url) {
          return new Promise(function(resolve, reject) {
              let xhr = new XMLHttpRequest()
              xhr.open('GET', url)
              xhr.responseType = 'blob'
              xhr.setRequestHeader("client_type", "DESKTOP_WEB");
              xhr.setRequestHeader("desktop_web_access_key", Math.random().toString());

              xhr.onload = function() {
                  if (xhr.status === 200) {
                    let blob = xhr.response
                    console.log(xhr, '数据blob')
                      resolve(blob)
                  } else {
                      reject(new Error('图片加载失败：' + xhr.statusText))
                  }
              }
              xhr.onerror = function(err) {
                  reject(err)
              }
              xhr.send()
          })
      }
  }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>