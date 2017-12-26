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

export function taobaoke() {
    const url = '/api/taobaoke'
    const data = {
        page: 1,
        pageSize: 20,
        channel: 'meizhuanggehu',
    }
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}


export function getSongList(disstid) {
    const url = '/api/getSongList'
  
    const data = Object.assign({}, commonPrarms, {
      disstid,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      platform: 'yqq',
      hostUin: 0,
      needNewCode: 0,
      g_tk: 67232076
    })
  
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
  }