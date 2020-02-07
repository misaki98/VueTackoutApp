/**
 * 基于state的getter计算属性
 */
export default {
    totalCount(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count, 0)
    },
    totalPrice(state) {
        return state.cartFoods.reduce((pre, food) => pre + food.count * food.price, 0)
    },
    positiveSize(state) {
        return state.ratings.reduce((pre, rating) => pre + (!rating.rateType ? 1 : 0), 0)
    }
}