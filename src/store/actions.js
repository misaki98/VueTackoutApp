/**
 * 间接更新state的多个方法的对象（通过触发mutation来更新）
 */
import {
    RECEIVE_SHOPS,
    REVEIVE_CATEGORYS,
    REVEIVE_ADDRESS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    RESET_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
    reqAddress,
    reqFoodCategorys,
    reqShops,
    reqLogout,
    reqShopGoods,
    reqShopInfo,
    reqShopRatings,
    reqSearchShop
} from '../api'
export default {
    // 能和后台交互的异步action
    // 异步获取地址
    async getAddress({ commit, state }) {
        // 发异步ajax请求
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqAddress(geohash)
        // 提交一个mutation
        if (result.code === 0) {
            const address = result.data
            commit(REVEIVE_ADDRESS, { address })
        }
    },
    // 异步获取食品分类
    async getCategorys({ commit }) {
        // 发异步ajax请求
        const result = await reqFoodCategorys()
        // 提交一个mutation
        if (result.code === 0) {
            const categorys = result.data
            commit(REVEIVE_CATEGORYS, { categorys })
        }
    },
    // 异步获取商家列表
    async getShops({ commit, state }) {
        // 发异步ajax请求
        const { longitude, latitude } = state
        const result = await reqShops(latitude, longitude)
        // 提交一个mutation
        if (result.code === 0) {
            const shops = result.data
            commit(RECEIVE_SHOPS, { shops })
        }
    },
    // 同步记录用户信息
    recordUser({ commit }, userInfo) {
        commit(RECEIVE_USER_INFO, { userInfo })
    },
    // 异步登出
    async logout({ commit }) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(RESET_USER_INFO)
        }
    },
    //异 步 获 取 商 家 信 息
    async getShopInfo({ commit }, cb) {
        const result = await reqShopInfo()
        if (result.code === 0) {
            const info = result.data
            info.score = 3.5
            commit(RECEIVE_INFO, { info })
            cb && cb()
        }
    },
    //异 步 获 取 商 家 评 价 列 表 
    async getShopRatings({ commit }, cb) {
        const result = await reqShopRatings()
        if (result.code === 0) {
            const ratings = result.data
            commit(RECEIVE_RATINGS, { ratings })
            cb && cb()
        }
    },
    //异 步 获 取 商 家 商 品 列 表
    async getShopGoods({ commit }, cb) {
        const result = await reqShopGoods()
        if (result.code === 0) {
            const goods = result.data
            commit(RECEIVE_GOODS, { goods })
            // 如 果 组 件 中 传 递 了 接 收 消 息 的 回 调 函 数 ,数 据 更 新 后 ,调 用 回 调 通 知 调 用 的 组 件
            cb && cb()
        }
    },
    // 同步更新food中的count数量
    updateFoodCount({ commit }, { isAdd, food }) {
        if (isAdd) {
            commit(INCREMENT_FOOD_COUNT, { food }) //传递包含food的一个对象
        } else {
            commit(DECREMENT_FOOD_COUNT, { food })
        }
    },
    // 同步清空购物车
    clearCart({ commit }) {
        commit(RESET_CART)
    },
    // 异步获取搜索结果
    async searchShops({ commit, state }, {keyword, cb}) {
        const geohash = state.latitude + ',' + state.longitude
        const result = await reqSearchShop(geohash, keyword)
        if (result.code === 0) {
            const searchShops = result.data
            commit(RECEIVE_SEARCH_SHOPS, { searchShops })
            cb && cb()
        }
    }
}