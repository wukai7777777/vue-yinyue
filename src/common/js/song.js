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
        url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=91198042670CD11C6FB522BDD5076FADE932806F6A4A19E5038B3618250ECAB83B2F9970AB0DC5B1EA0CF66AADA239C7A47D60E69393B895&guid=8628955376&uin=0&fromtag=66`
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