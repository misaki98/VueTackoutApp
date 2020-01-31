/**
 * 直接更新state多个方法的对象
 */
import {
    RECEIVE_SHOPS,
    REVEIVE_CATEGORYS,
    REVEIVE_ADDRESS
} from './mutation-types'
export default {
    [REVEIVE_ADDRESS](state,{address}){
        // 接受的是包含数据的对象，直接解构取出其中的数据
        state.address = address
    },
    [REVEIVE_CATEGORYS](state,{categorys}){
        state.categorys = categorys
    },
    [RECEIVE_SHOPS](state,{shops}){
        state.shops = shops
    },
}