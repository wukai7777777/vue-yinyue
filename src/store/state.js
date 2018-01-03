import { playMode } from 'common/js/config'
import { loadSearch, loadSongs } from 'common/js/chash'
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
    playHistory: loadSongs()
}

export default state