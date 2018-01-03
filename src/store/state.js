import { playMode } from 'common/js/config'
import { loadSearch } from 'common/js/chash'
const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: {},
    searchHistory: loadSearch(),
    savePlayHistory: []
}

export default state