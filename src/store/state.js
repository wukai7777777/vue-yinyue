import { playMode } from 'common/js/config'
import { loadSearch, loadSongs, loadFavorite } from 'common/js/chash'
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
    playHistory: loadSongs(),
    favoriteList: loadFavorite()
}

export default state