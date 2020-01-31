/**
 * 间接更新state的多个方法的对象（通过触发mutation来更新）
 */
import {
    RECEIVE_SHOPS,
    REVEIVE_CATEGORYS,
    REVEIVE_ADDRESS
} from './mutation-types'
import {
    reqAddress,
    reqFoodCategorys,
    reqShops
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
    }
}