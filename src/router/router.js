import Vue from 'vue';
import Router from 'vue-router';
import Main from '../pages/Main'
import Login from '../pages/Login.vue'
import {testToken} from '@/api/apis.js'
Vue.use(Router);
var router =  new Router({
    routes: [
        {
            path: '/main',
            name: 'main',
            component: Main,
            children: [
                {
                    path: '/main/Ordermana',
                    name: 'Ordermana',
                    component: ()=>import ('../pages/main/Ordermana.vue'),
                    meta:['订单管理']
                },
                {
                    path: '/main/Storemana',
                    name: 'Storemana',
                    component: ()=>import ('../pages/main/Storemana.vue'),
                    meta:['店铺管理']
                },
                {
                    path: '/main/Ordersta',
                    name: 'Ordersta',
                    component: ()=>import ('../pages/main/Ordersta.vue'),
                    meta:['销售统计','订单统计']
                },
                {
                    path: '/main/Index',
                    name: 'Index',
                    component: ()=>import ('../pages/main/Index.vue'),
                    meta:['首页']
                },
                {
                    path: '/main/Commodityclass',
                    name: 'Commodityclass',
                    component: ()=>import ('../pages/main/Commodityclass.vue'),
                    meta:['商品管理','商品分类']
                },
                {
                    path:'/main/Productlist',
                    name:'Productlist',
                    component:()=> import('../pages/main/Productlist.vue'),
                    meta:['商品管理','商品列表']
                },
                {
                    path:'/main/Productadd',
                    name:'Productadd',
                    component:()=> import('../pages/main/Productadd.vue'),
                    meta:['商品管理','商品添加']
                },
                {
                    path:'/main/CommoditySta',
                    name:'CommoditySta',
                    component:()=> import('../pages/main/CommoditySta.vue'),
                    meta:['销售统计','商品统计']
                },
                {
                    path:'/main/Addaccount',
                    name:'Addaccount',
                    component:()=> import('../pages/main/Addaccount.vue'),
                    meta:['账号管理','添加账号']
                },
                {
                    path:'/main/Changepwd',
                    name:'Changepwd',
                    component:()=> import('../pages/main/Changepwd.vue'),
                    meta:['账号管理','修改密码']
                },
                {
                    path:'/main/Accountlist',
                    name:'Accountlist',
                    component:()=> import('../pages/main/Accountlist.vue'),
                    meta:['账号管理','账号列表']
                },
                {
                    path:'/main/Accountinfo',
                    name:'Accountinfo',
                    component:()=> import('../pages/main/Accountinfo.vue'),
                    meta:['账号管理','账号信息']
                },
            ]
        },
        {
            path: '/',
            name: '',
            component: Login
        },
    ]
})
router.beforeEach((to,from,next)=>{
    if(to.path != '/'){
        testToken(localStorage.token).then((res)=>{
            if(res.data.code == 0){
                next()
            }
            else{
                next('/')
            }
        })
    }
    else{
        next();
    }
})

export default router