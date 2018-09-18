import { commonPrarms } from './config'
import axios from 'axios'
import {Base64} from 'js-base64'


export function getLyric(mid) {
    let url = '/api/lyric'

    let data = Object.assign({}, commonPrarms, {
        songmid: mid,
        pcachetime: +new Date(),
        platform: 'yqq',
        needNewCode: 0,
        format: 'json',
        hostUin:0
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

