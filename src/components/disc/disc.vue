<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
  import MusicList from 'components/music-list/music-list'
  import {mapGetters} from 'vuex'
  import {getSongList} from 'api/recommend'
  import {createSong} from 'common/js/song.js'

  export default {
    data() {
      return {
        songs: []
      }
    },
    computed: {
        title() {
            return this.disc.dissname
        },
        bgImage() {
            return this.disc.imgurl
        },
        ...mapGetters([
            'disc'
        ])
    },
    created() {
       this._getSongList()
    },
    methods: {
        _getSongList() {
            let self = this
            if(!this.disc.dissid) {
                this.$router.push({
                    path: '/recommend'
                })
                return
            }

            getSongList(this.disc.dissid).then((res) => {
                if (typeof res === 'string') {
                    var farst = res.indexOf('{');
                    var last = res.lastIndexOf('}')

                    res = res.substring(farst, last)+'}'
                    res = JSON.parse(res)
                    if(res.code === 0) {
                        self.songs = this._normalData(res.cdlist[0].songlist);
                    }
                }
            })
        },
        _normalData(list) {
            let ret = []
            list.forEach((item) => {
                if(item.songid && item.albumid) {
                    ret.push(createSong(item))
                }
            });
            return ret
        }
    },
    components: {
        MusicList
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>