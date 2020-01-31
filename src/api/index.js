/**
 * 包含n个接口请求函数的模块
 */
import ajax from "./ajax"
const BASE_URL = '/api'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// [2、获取食品分类列表](#2获取食品分类列表)
export const reqFoodCategorys = () => ajax(BASE_URL+'/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
export const reqShops = (latitude, longitude) => ajax(BASE_URL+'/shops', { latitude, longitude })
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const reqSearchShop = () => ajax()
// [5、获取一次性验证码](#5获取一次性验证码)<br/>
// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqLogin = (username, password) => ajax('')
// [7、发送短信验证码](#7发送短信验证码)<br/>
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
// [10、用户登出](#10用户登出)<br/>
