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
    RECEIVE_INFO,
    INCREMENT_FOOD_COUNT,
    DECREMENT_FOOD_COUNT,
    RESET_CART,
    RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue'
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
    },
    [INCREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) {
            Vue.set(food, 'count', 1) //让新增的属性也能做到数据监听绑定
            // 将food送入购物车
            state.cartFoods.push(food)
        } else {
            food.count++
        }
    },
    [DECREMENT_FOOD_COUNT](state, { food }) {
        if (!food.count) {
            food.count = 0
        } else {
            food.count--
            if (!food.count) {
                // 移出购物车
                state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
            }
        }
    },
    [RESET_CART](state) {
        state.cartFoods.forEach(food => food.count = 0)
        state.cartFoods = []
    },
    [RECEIVE_SEARCH_SHOPS](state,{searchShops}){
        state.searchShops = searchShops
    }
}