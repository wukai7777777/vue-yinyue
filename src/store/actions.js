import * as types from './mutation-type'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

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