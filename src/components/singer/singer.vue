<template>
  <div class="singers" ref="singers">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import {getSinger, getSingerList} from 'api/singer'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import * as mutation_type from '../../store/mutation-type'
import originJsonp from 'jsonp'
import { playListMixin } from 'common/js/playListMixin.js'
 

const HOT_NAME = '热门'

export default {
  mixins: [playListMixin],
  data() {
    return {
      singers: []
    }
  },
  components: {
    ListView
  },
  created() {
    this._getSinger();
    //获取百度地图api接口 （将经纬度转化为实际人能看懂的地址）
    let url = 'http://api.map.baidu.com/geocoder/v2/?location=39.934,116.329&output=json&pois=1&ak=nbw2YKOeOsClKLWi1dF3Fy8ZPiMK6Kua&v=2.0'
    //const opation = {param: 'jsonpCallback'}

    originJsonp(url, (err, data)=>{
      if(!err) {
        //console.log(data)
      } else {
        //console.log(err, 9999)
      }
    })


  },
  methods: {
    handleMixin(playList) { // mixin 单独处理方法
        let bottom = playList.length>0 ? '60px' : 0
        this.$refs.singers.style.bottom = bottom
        this.$refs.list.refresh()
    },
    _getSinger() {
      getSinger().then((res) => {
        if(res.code === 0){
          this.singers = this._normalSinger(res.data.list)
        }
      })
    },
    _normalSinger(lists) { // 改造数据结构得到我们想要的数据结构
      let map = {
        hot: {
          title: HOT_NAME,
          items : []
        }
      }

      lists.forEach((item, index) => {
        if(index < 10){
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        const key = item.Findex
        if(!map[key]){
          map[key] = {
            title: key,
            items: []

          }
        }

        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      //将map数据进行有序化
      let hot = []
      let ret = []
     for(let key in map){
       let val = map[key]
       if(val.title.match(/[a-zA-Z]/)){
         ret.push(val)
       } else if (val.title == HOT_NAME){
         hot.push(val)
       }
     }

     ret.sort(function(a, b){
       return a.title.charCodeAt(0)-b.title.charCodeAt(0)
     })

     return hot.concat(ret)
    },
    selectSinger(item) {
      this.$store.commit(mutation_type.SET_SINGER, item)
      this.$router.push({
        path: `/singer/${item.id}`
      })
    }
  }

}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .singers
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
</style>
