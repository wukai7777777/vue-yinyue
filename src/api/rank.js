import {options, commonPrarms} from './config'
import jsonp from 'common/js/jsonp'

export function getTopList() {
    var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

    let data = Object.assign({}, commonPrarms, {
        platform: 'h5',
        needNewCode: 1,
        uin: 0,
        g_tk:5381
    })

    return jsonp(url, data, options) 
}

export function getMusicList(topid) {
    var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

    let data = Object.assign({}, commonPrarms, {
        topid,
        format:'json',
        platform:'h5',
        needNewCode:1,
        tpl:3,
        page:'detail',
        type:'top',
    })

    return jsonp(url, data, options) 
}