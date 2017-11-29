import * as types from './mutation-type'

export const actionsPlay = function({ commit, state }, { list, index }) {
    commit(types.SET_PLAY_LIST, list)
    commit(types.SET_SEQUENCE_LIST, list)
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    console.log(1212)
}