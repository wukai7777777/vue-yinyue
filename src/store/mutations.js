import * as types from './mutation-type'

const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PLAYING_STATE](state, flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAY_LIST](state, list) {
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
    },
    [types.SET_DISC](state, singer) {
        state.disc = singer
    },
    [types.SET_TOP_LIST](state, item) {
        state.topList = item
    },
    [types.SET_SEARCH_HISTORY](state, query) {
        state.searchHistory = query
    }
}
export default mutations