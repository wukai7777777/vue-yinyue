import originJsonp from 'jsonp'

export default function jsonp(url, data, options) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + pram(data)
    return new Promise((resolve, reject) => {
        originJsonp(url, options, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

export function pram(data) {
    let url = ''
    for (let k in data) {
        let value = (data[k] !== undefined) ? data[k] : ''
        url += `&${k}=${encodeURIComponent(value)}`
    }
    return url ? url.substring(1) : ''
}