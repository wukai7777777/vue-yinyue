import {mapGetters} from 'vuex'

//将公共方法注入到每一个组件中 做到复用代码便于维护

export const playListMixin = {
    computed:{
        ...mapGetters([
            'playList'
        ])
    },
    mounted(){
        this.handleMixin(this.playList)
    },
    activated() {
        this.handleMixin(this.playList)
    },
    watch: {
        playList(newValue) {
            this.handleMixin(newValue)
        }
    },
    methods: {
        handleMixin(playList) {
            throw Error('在每一个组件methods中必须设置 handleMixin 方法')
        }
    }
}