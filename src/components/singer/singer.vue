<template>
  <div class="singers">
    <list-view :data="singers"></list-view>
  </div>
</template>
<script>
import {getSinger} from 'api/singer'
//import loading from 'base/loading'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
const HOT_NAME = '热门'

export default {
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
  },
  methods: {
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
