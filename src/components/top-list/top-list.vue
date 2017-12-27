<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
import {createSong} from 'common/js/song'
export default {
    data() {
        return {
            songs:[],
            rank: true
        }
    },
    computed: {
        title() {
            return this.topList.topTitle
        },
        bgImage() {
            return this.topList.picUrl
        },
        ...mapGetters([
            'topList'
        ])
    },
    components: {
        MusicList
    },
    created() {
        this._getMusicList()
    },
    methods: {
        _getMusicList() {
            if(!this.topList.id) {
                this.$router.push({
                    path: '/rank'
                })
                return
            }
            getMusicList(this.topList.id).then((res) => {
                if(res.code === 0) {
                    this.songs = this.normalMusicData(res.songlist)
                }
            })
        },
        normalMusicData(list) {
            let ret = []
            list.forEach((item) => {
                let musicData = item.data
                if(musicData.songid && musicData.albumid) {
                    ret.push(createSong(musicData))
                }
            });
            return ret
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>