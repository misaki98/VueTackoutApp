/**
 * 直接更新state多个方法的对象
 */
import {
    RECEIVE_SHOPS,
    REVEIVE_CATEGORYS,
    REVEIVE_ADDRESS,
    RECEIVE_USER_INFO,
    RESET_USER_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    RECEIVE_INFO
} from './mutation-types'
export default {
    [REVEIVE_ADDRESS](state, { address }) {
        // 接受的是包含数据的对象，直接解构取出其中的数据
        state.address = address
    },
    [REVEIVE_CATEGORYS](state, { categorys }) {
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state, { shops }) {
        state.shops = shops
    },
    [RECEIVE_USER_INFO](state, { userInfo }) {
        state.userInfo = userInfo
    },
    [RESET_USER_INFO](state) {
        state.userInfo = {}
    },
    [RECEIVE_INFO](state, { info }) {
        state.info = info
    },
    [RECEIVE_RATINGS](state, { ratings }) {
        state.ratings = ratings
    },
    [RECEIVE_GOODS](state, { goods }) {
        state.goods = goods
    }
}