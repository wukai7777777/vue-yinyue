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
        g_tk: 5381,
        jsonpCallback: 'GetSingerListCallback',
        hostUin: 0,
        format: 'jsonp',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    })

    return jsonp(url, data, options)

}