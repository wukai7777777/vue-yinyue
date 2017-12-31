import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

function insertSearch(arr, val, comparCallBack, maxLen) {
    let index = arr.findIndex(comparCallBack);
    if(index===0) {
        return
    }

    if(index>0) {
        arr.splice(index, 1)
    }
    arr.unshift(val)

    if(maxLen && maxLen>15) {
        arr.pop()
    }
}

function deleteFromSearch(arr, comparCallBack) {//删除搜索历史项
    let index = arr.findIndex(comparCallBack);
    if(index > -1) {
        arr.splice(index, 1)
    }
}

export function saveSearch(query) {
    let searchArr = storage.get(SEARCH_KEY, []) //获取缓存

    insertSearch(searchArr, query, (item) => { //调用插入search规则函数
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