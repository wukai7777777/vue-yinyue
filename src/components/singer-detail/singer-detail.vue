<template>
    <transition name="slider">
        <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
    </transition>
</template>
<script>
import {getSingerList} from 'api/singer'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage(){
            return this.singer.avatar
        },
        ...mapGetters(['singer'])
    },
    components: {
        MusicList
    },
    created() {
        this._getSingerList(this.singer.id)
    },
    methods: {
        _getSingerList(mid) {
            if(!this.singer.id){
                this.$router.push({path: '/singer'})
                return
            }
            getSingerList(mid).then((res) => {
                this.songs = this._normalLiszSong(res.data.list)
            })
        },
        _normalLiszSong(list) {
            let ret = []
            list.forEach((item) => {
                let {musicData} = item
                if(musicData.songid && musicData.albummid){
                    ret.push(createSong(musicData))
                }
            })
            return ret;
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.slider-enter-active, .slider-leave-active
    transition: all 0.3s
.slider-enter, .slider-leave-to
    transform : translate3d(100%, 0, 0)
</style>
