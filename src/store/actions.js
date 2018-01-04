import * as types from './mutation-type'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import Song from '../common/js/song';
import { saveSearch, deleteSearch, clearSearch, saveSong, saveFavorite, deleteFavorite} from 'common/js/chash'

function getIndex(list, song) {
    let num = list.findIndex((item) => {
        return item.id === song.id
    })
    return num
}

export const actionsPlay = function({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list)
    if (state.mode === playMode.random) {
        let random = shuffle(list)
        commit(types.SET_PLAY_LIST, random)
        index = getIndex(random, list[index])
    } else {
        commit(types.SET_PLAY_LIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({ commit }, { list }) {
    commit(types.SET_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let playList = shuffle(list)
    commit(types.SET_PLAY_LIST, playList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({ commit, state }, song) {
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
        // 记录当前歌曲
    let currentSong = playList[currentIndex]
        // 查找当前歌曲列表中是否待插入的歌曲并返回其索引
    let fpIndex = getIndex(playList, song)
        // 因为是插入歌曲所以索引加一
    currentIndex++
    // 插入这首歌到当前索引位置
    playList.splice(currentIndex, 0, song)
        // 如果已经包含这首歌将这首歌删掉
    if (fpIndex > -1) {
        //如果当前插入歌曲的序号大于所在列表的序号
        if (currentIndex > fpIndex) {
            playList.splice(fpIndex, 1)
            currentIndex--
        } else {
            playList.splice(fpIndex + 1, 1)
        }
    }

    let currentSIndex = getIndex(sequenceList, currentSong) + 1

    let fsIndex = getIndex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }

    commit(types.SET_PLAY_LIST, playList)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function({ commit, state }, query) {
    commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({ commit }, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({ commit }) {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function({ state, commit }, song) {
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    let pindex = getIndex(playList, song)
    playList.splice(pindex, 1)
    let sindex = getIndex(sequenceList, song)
    sequenceList.splice(sindex, 1)

    if (currentIndex > pindex || currentIndex === playList.length) {
        currentIndex--
    }

    commit(types.SET_PLAY_LIST, playList)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)

    const playingState = playList.length > 0
    commit(types.SET_PLAYING_STATE, playingState)
}

export const deleteSongList = function({ state, commit }, song) {
    commit(types.SET_PLAY_LIST, [])
    commit(types.SET_SEQUENCE_LIST, [])
    commit(types.SET_CURRENT_INDEX, -1)
    commit(types.SET_PLAYING_STATE, false)
}

//保存最近播放歌曲到本地存储
export const savePlayHistory = function({ commit }, song) {
    commit(types.SET_PLAY_HISTORY, saveSong(song))
}

//添加收藏歌曲到收藏列表
export const saveFavoriteList = function({commit}, song) {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function({commit}, song) {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}