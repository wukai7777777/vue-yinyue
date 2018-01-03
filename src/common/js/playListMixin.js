import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

//将公共方法注入到每一个组件中 做到复用代码便于维护

export const playListMixin = {
    computed: {
        ...mapGetters([
            'playList'
        ])
    },
    mounted() {
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

export const playerMixin = {
    computed: {
        playMode() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random';
        },
    },
    ...mapGetters([
        'mode',
        'sequenceList',
        'currentSong'
    ]),
    methods: {
        changeMode() {
            let mode = (this.mode + 1) % 3
            this.setPlayMode(mode)
            let list = null;
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList)
            } else {
                list = this.sequenceList
            }
            this.resetCurrentIndex(list)
            this.setPlayList(list);
        },
        resetCurrentIndex(list) { // 切換播放模式
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id
            })
            this.setCurIndex(index)
        },
        ...mapMutations({
            setPlayList: 'SET_PLAY_LIST',
            setCurIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_MODE',
        })
    }
}

export const searchMixin = {
    data() {
        return {
            query: ''
        }
    },
    methods: {
        ...mapActions([
            'saveSearchHistory'
        ]),
        selectQuery(query) {
            this.$refs.searchBox.selectQuery(query)
        },
        changeQuery(query) {
            this.query = query
        },
        blurInput() {
            this.$refs.searchBox.blurInput()
        },
    }
}