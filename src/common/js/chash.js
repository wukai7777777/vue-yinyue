import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 100

function insertArray(arr, val, comparCallBack, maxLen) {
    let index = arr.findIndex(comparCallBack);
    if (index === 0) {
        return
    }

    if (index > 0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)
    let len = arr.length
    if (len && len > maxLen) {
        arr.pop()
    }
}

function deleteFromArray(arr, comparCallBack) { //删除搜索历史项
    let index = arr.findIndex(comparCallBack);
    if (index > -1) {
        arr.splice(index, 1)
    }
}

export function saveSearch(query) {
    let searchArr = storage.get(SEARCH_KEY, []) //获取缓存

    insertArray(searchArr, query, (item) => { //调用插入search规则函数
        return item === query
    }, SEARCH_MAX_LEN)

    storage.set(SEARCH_KEY, searchArr) //缓存search
    return searchArr
}

export function loadSearch() {
    return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
    let searchArr = storage.get(SEARCH_KEY, [])
    deleteFromArray(searchArr, (item) => {
        return item === query
    })
    storage.set(SEARCH_KEY, searchArr)
    return searchArr
}

export function clearSearch() {
    storage.remove(SEARCH_KEY)
    return []
}

export function saveSong(song) {
    let songs = storage.get(PLAY_KEY, [])
    insertArray(songs, song, (item) => {
        return item.id === song.id
    }, PLAY_MAX_LEN)
    storage.set(PLAY_KEY, songs)
    return songs
}

export function loadSongs() {
    return storage.get(PLAY_KEY, [])
}

//添加收藏歌曲到收藏列表

export function saveFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    insertArray(songs, song, (item) => {
        return item.id === song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}

export function deleteFavorite(song) {
    let songs = storage.get(FAVORITE_KEY, [])
    deleteFromArray(songs, (item) => {
        return item.id ===song.id
    })
    storage.set(FAVORITE_KEY, songs)
    return songs
}

export function loadFavorite() {
    return storage.get(FAVORITE_KEY, [])
}