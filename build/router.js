var express = require('express')
var axios = require('axios')

var apiRouter = express.Router()


apiRouter.get('/getDissList', function(req, res) {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

apiRouter.get('/lyric', function(req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        var ret = response.data;
        if (typeof ret === 'string') {

            var reg = /^\w+\(({[^()]+})\)$/
            var matches = ret.match(reg)
            if (matches) {
                ret = JSON.parse(matches[1])
            }
        }
        res.json(ret)
    }).catch((e) => {
        console.log(e)
    })
})

apiRouter.get('/getSongList', function(req, res) {
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then((response) => {
        var ret = response.data;
        var farst = ret.indexOf('{');
        var last = ret.lastIndexOf('}')
        ret = ret.substring(farst, last) + '}'

        ret = JSON.parse(ret)
        res.json(ret)
    }).catch((e) => {
        console.log(e)
    })
})
apiRouter.get('/taobaoke', function(req, res) {
    // var url = 'https://jz-c.doumi.com/api/v3/client/tbk/lists'
    var url = 'https://jz-c.doumi.com/api/v2/client/index'
    axios.get(url, {
        headers: {
            "AccessToken": "LmRlaxBLMj/BOYNTijZSUB0iJjhJfmLP0ezTQ+o2J0WoNyPI/Ft3z4EcIzZqNmK0zFfT7Zi6",
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

apiRouter.get('/message', (req, res) => {
    // https://jz-c.doumi.com/api/v3/client/message/index?userId=0&deviceToken=b6ded5291996d1dedcca6cce916939d1&platform=android
    const url = 'http://jz-c.doumi.com/api/v3/client/message/zhangyu'
    console.log(req.query)
    axios.get(url, {
        headers: {
            // "referer": "https://jz-c.doumi.com",
            // "Info": 'LmRlaxCeoyLhjeOmGOxb8i/hzIaDKienVXh3hp1cKrbI1KyjJkpHJ8XIN3KfXCq2yNSsoyZKZnYECEfmyMnetYin62NGmnNyIO0CJvip7rIPkQwDAn+Gl1VNAjaoyW4iX5F8swZKlidE2ZYy/RkYt4726QOTLybn0B1iZpi5DiJvARzDBsrzQrCoJmO9jTvUStWso1bKEyIAvSJG6A==',
            // "Host": 'jz-c.doumi.com',
            // "doumi-protocol": 'https',  
            "accessToken": 'LmRlaxBLMj/BOYNTijZSUB0iJjhJfmLP0ezTQ+o2J0WoNyPI/Ft3z4EcIzZqNmK0zFfT7Zi6',
            // "Cookie": 'ganji_jz_ac_citydomain=eyJpdiI6ImdNek5tcElqSzMxY1A5NW5FUEhxYmc9PSIsInZhbHVlIjoia2ZJYmhCb3gwbWZoNkQ0QjRcLytWUUE9PSIsIm1hYyI6IjY4MDczNzczZmY4NTgzNzFiOTBmM2I2ZDVlYjgyYjJhZjJmYjZjZDRkZjQ3MWRkMTQ0NWRhYjgwNDQ0YWJhZTkifQ%3D%3D; doumi_melon=eyJpdiI6IlhPTVNZQURUZkt3d1F1WXR2Zk4wcUE9PSIsInZhbHVlIjoiSitwSTk4ZGxsZ3dwZ2NNTEdSM2RNREVrXC9zSXJzS0ZmNE9URHcrTW8yRjhzbnV1alVcL0prUm5QRnlodm9mVjMweEJjcmh0cTJPdHpsrRlNySUFhTkUydz09IiwibWFjIjoiYzc5MWExYTg1MzI2YmRhYzY5OTIwMzAwM2NiZTA1YTczNjBlNjQ0YzMwZjhkNjY0YjEyYmFhNjBjNjI4MTJjOSJ9',
            // "User-Agent": 'DouMi/5.1.9 BuildCode/77 Platform/Android ChannelId/umeng',
            // "Connection": 'Keep-Alive'
        },
        params: req.query
    }).then((response) => {
        console.log(response.data, '数据')
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })

})

// apiRouter.get('/taobaoke', function(req, res) { // 代理请求其他远程图片资源
//     //var url = 'https://jz-c.doumi.com/api/v3/client/tbk/lists'
//     var url = 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png'
//     axios.get(url, {
//         // headers: {
//         //     accessToken: "LmRlaxBbMj/BaaMW6kNiQM0SBrhZ/lJPAUwjhppDYhWNkradyU4XOvEZk2aaczK0zFfT7Zi6"
//         // },
//         params: req.query
//     }).then((response) => {
//         console.log(response, '数据')
//         res.json(response.data)
//     }).catch((e) => {
//         console.log(e)
//     })
// })

// apiRouter.get('/taobaoke', function(req, res) { // 开启一个路由请求本地资源 图片
//     var imgData = fs.readFileSync(path.join(__dirname, '../dist/static/1.png'))
//         //发送 图片 Buffer 对象到前端
//     res.send(imgData)
// })

module.exports = apiRouter