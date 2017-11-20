import jsonp from 'common/js/jsonp'
import { commonPrarms, options } from './config'
import axios from 'axios'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
    const data = Object.assign({}, commonPrarms, {
        uin: 0,
        plarform: 'h5',
        needNewCode: 1
    })

    return jsonp(url, data, options)
}

export function getDissList() {
    const url = '/api/getDissList'
    const data = Object.assign({}, commonPrarms, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}