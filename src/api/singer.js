import jsonp from 'common/js/jsonp'
import { commonPrarms, options } from './config'

export function getSinger() {
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

    const data = Object.assign({}, commonPrarms, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        format: 'jsonp',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    })

    return jsonp(url, data, options)
}

export function getSingerList(mid) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    const data = Object.assign({}, commonPrarms, {
        loginUin:0,
        hostUin:0,
        format:'jsonp',
        notice:0,
        platform:'yqq',
        needNewCode:0,
        singermid:mid,
        order:'listen',
        begin:0,
        num:30,
        songstatus:1,
    })

    return jsonp(url, data, options)
}