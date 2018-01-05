import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


//异步加载对应路由模块，减少首页加载包大小提高首页加载效率
const Recommend = (resolve) => {
    import ('components/recommend/recommend').then((module) => {
        resolve(module)
    })
}

const Singer = (resolve) => {
    import ('components/singer/singer').then((module) => {
        resolve(module)
    })
}

const Rank = (resolve) => {
    import ('components/rank/rank').then((module) => {
        resolve(module)
    })
}

const Search = (resolve) => {
    import ('components/search/search').then((module) => {
        resolve(module)
    })
}

const SingerDetail = (resolve) => {
    import ('components/singer-detail/singer-detail').then((module) => {
        resolve(module)
    })
}

const Disc = (resolve) => {
    import ('components/disc/disc').then((module) => {
        resolve(module)
    })
}

const TopList = (resolve) => {
    import ('components/top-list/top-list').then((module) => {
        resolve(module)
    })
}

const UserCenter = (resolve) => {
    import ('components/user-center/user-center').then((module) => {
        resolve(module)
    })
}

export default new Router({
    routes: [{
            path: '/',
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend,
            children: [{
                path: ':id',
                component: Disc
            }]
        },
        {
            path: '/singer',
            component: Singer,
            children: [{
                path: ':id',
                component: SingerDetail
            }]
        },
        {
            path: '/rank',
            component: Rank,
            children: [{
                path: ':id',
                component: TopList
            }]
        },
        {
            path: '/search',
            component: Search,
            children: [{
                path: ':id',
                component: SingerDetail
            }]
        },
        {
            path: '/user',
            component: UserCenter
        }
    ]
})