import * as types from './mutation-type'

const mutations = {
    [types.SET_SINGER](state, singer) {
        console.log(1)
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        console.log(3)
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        console.log(4)
        state.fullScreen = flag
    },
    [types.SET_PLAY_LIST](state, list) {
        console.log(5)
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_MODE](state, mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_CURRENT_SONG](state, song) {
        state.currentSong = song
    }
}
export default mutations