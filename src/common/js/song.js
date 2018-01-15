import { getLyric } from 'api/song'
import { Base64 } from 'js-base64'

export default class Song {
    constructor({ id, mid, singer, name, album, duration, image, url }) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.duration = duration
        this.album = album
        this.image = image
        this.url = url
    }
    getLyric() {
        let self = this
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }

        return new Promise((resolve, reject) => {
            getLyric(this.mid).then(function(res) {
                if (res.retcode === 0) {
                    self.lyric = Base64.decode(res.lyric)
                    resolve(self.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=2B71366170C9A3EE5BC6AFFEF8DF3540A5AA4F8FB9D3232C8FF6FE8177E9C9A6458AFA45FC38E4657DB3157888D0119CCAFAFEB187FD6FDD&guid=8628955376&uin=0&fromtag=66`
        //url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    })
}

export function filterSinger(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((item) => {
        ret.push(item.name)
    });
    return ret.join('/')
}