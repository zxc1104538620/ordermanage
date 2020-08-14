import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:5000'

// 店铺图片上传
export const getshopimg = 'http://127.0.0.1:5000/upload/shop/'


export var login = (account, password) => {
    return axios.post('/users/checkLogin', { account: account, password: password })
}
export var addAcc = (account, password, userGroup) => {
    return axios.post('/users/add', { account, password, userGroup })
}
export var acclist = (currentPage, pageSize) => {
    return axios.get('/users/list', { params: { currentPage: currentPage, pageSize: pageSize } })
}
export var deleteAcc = (id) => { return axios.get('/users/del', { params: { id: id } }) }
export var deleteIdsArr = (ids) => { return axios.get('/users/batchdel', { params: { ids } }) }
export var reviseAcc = (id, account, userGroup) => { return axios.post('/users/edit', { id, account, userGroup }) }
export var testoldPwd = (oldPwd, id) => { return axios.get('/users/checkoldpwd', { params: { oldPwd, id } }) }
export var ChangePwd = (newPwd, id) => { return axios.post('/users/editpwd', { newPwd, id }) }
export var accountinfo = (id) => { return axios.get('/users/accountinfo', { params: { id } }) }
export var testToken = (token) => { return axios.get('/users/checktoken', { params: { token } }) }
export var catelist = (currentPage, pageSize) => { return axios.get('/goods/catelist', { params: { currentPage, pageSize } }) }
export var delcate = (id) => { return axios.get('/goods/delcate', { params: { id } }) }
export var editcate = (id, cateName, state) => { return axios.post('/goods/editcate', { id, cateName, state }) }
export var addcate = (cateName, state) => { return axios.post('/goods/addcate', { cateName, state }) }
export var categories = () => { return axios.get('/goods/categories', {}) }
export var goodsadd = (name, category, price, imgUrl, goodsDesc) => { return axios.post('/goods/add', { name, category, price, imgUrl, goodsDesc }) }
export var goodslist = (currentPage, pageSize) => { return axios.get('/goods/list', { params: { currentPage, pageSize } }) }

export var delProduct = (id) => { return axios.get('/goods/del', { params: { id } }) }

export var deitProduct = (name, category, price, imgUrl, goodsDesc, id) => { return axios.post('/goods/edit', { name, category, price, imgUrl, goodsDesc, id }) }

export var orderList = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => { return axios.get('/order/list', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } }) }

export var search = (currentPage, pageSize, orderNo, consignee, phone, orderState, date) => { return axios.get('/order/search', { params: { currentPage, pageSize, orderNo, consignee, phone, orderState, date } }) }

export var edit = (params) => { return axios.post('/order/edit', params) }


export var shopedit = (id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics) => { return axios.post('/shop/edit', { id, name, bulletin, avatar, deliveryPrice, deliveryTime, description, score, sellCount, supports, date, pics }) }

export var info = () => { return axios.get('/shop/info', { params: {} }) }

export var detail = (id) => { return axios.get('/order/detail', { params: { id } }) }

export var totaldata = () => { return axios.get('/order/totaldata', { params: {} }) }

export var ordertotal = (date) => { return axios.get('/order/ordertotal', { params: { date } }) }