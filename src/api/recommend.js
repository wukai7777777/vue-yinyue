import jsonp from 'common/js/jsonp'
import {commonPrarms, options} from './config'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonPrarms, {
        uin: 0,
        plarform: 'h5',
        needNewCode: 1
    })

    return jsonp(url, data, options)
}