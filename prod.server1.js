var express = require('express')
var config = require('./config/index')
var axios = require('axios')

var app = express()

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
        ret = ret.substring(farst, last)+'}'

        ret = JSON.parse(ret)
        res.json(ret)
    }).catch((e) => {
        console.log(e)
    })
})
apiRouter.get('/taobaoke', function(req, res) {
    var url = 'https://jz-c.doumi.com/api/v3/client/tbk/lists'
    axios.get(url, {
        headers: {
            accessToken: "LmRlaxBbMj/BaaMW6kNiQM0SBrhZ/lJPAUwjhppDYhWNkradyU4XOvEZk2aaczK0zFfT7Zi6"
        },
        params: req.query
    }).then((response) => {
        res.json(response.data)
    }).catch((e) => {
        console.log(e)
    })
})

app.use('/api', apiRouter)

app.use(express.static('./dist')) //设置静态文件根目录

var port = process.env.PORT || config.build.port

module.exports = app.listen(port, function(err) {
    if(err) {
        console.log(err)
        return
    }
    console.log('at lisening http://localhost:' + port)
})