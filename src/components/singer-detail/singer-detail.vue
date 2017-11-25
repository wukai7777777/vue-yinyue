<template>
    <transition name="slider">
        <div class="singer-detail"></div>
    </transition>
</template>
<script>
import {getSingerList} from 'api/singer'
import {mapGetters} from 'vuex'
export default {
    computed: {
    ...mapGetters(['singer'])
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
                console.log(res, 8888)
            })
        }
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
.singer-detail
    position: fixed
    z-index : 100
    top: 0
    left :0
    right: 0
    bottom: 0
    background: $color-background
.slider-enter-active, .slider-leave-active
    transition: all 0.3s
.slider-enter, .slider-leave-to
    transform : translate3d(100%, 0, 0)
</style>
