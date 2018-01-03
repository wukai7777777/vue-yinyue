import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200

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

function deleteFromSearch(arr, comparCallBack) { //删除搜索历史项
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
    deleteFromSearch(searchArr, (item) => {
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