<template>
  <div>我是歌手模块2222</div>
</template>
<script>
import {getSinger} from 'api/singer'
export default {
  created() {
    this._getSinger();
  },
  methods: {
    _getSinger() {
      getSinger().then((res) => {
        console.log(res, 88888)
        if(res.code === 0){
        }
      })
    }
  }
}
</script>
