<template>
  <div>
    <div class="goods">
      <!-- 分类列表 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li 
            class="menu-item" 
            v-for="(item, index) in goods" 
            :key="index" 
            :class="{current:index===currentIndex}"
            @click="turnToMenu(index)">
            <span class="text bottom-border-1px">
              <img
                class="icon"
                :src="item.icon"
                v-if="item.icon"
              /> {{item.name}}
            </span>
          </li>
          <!-- <li class="menu-item">
            <span class="text bottom-border-1px">
              <img
                class="icon"
                src="https://fuss10.elemecdn.com/b/91/8cf4f67e0e8223931cd595dc932fepng.png"
              /> 优惠
            </span>
          </li> -->
        </ul>
      </div>
      <!-- 食物列表 -->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="food-list-hook" v-for="(item, index) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index2) in item.foods" :key="index2">
                <div class="icon">
                  <img
                    width="57"
                    height="57"
                    :src="food.icon"
                  />
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售 {{food.sellCount}} 份</span>
                    <span>好评率 {{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
          <!-- <li class="food-list food-list-hook">
            <h1 class="title">香浓甜粥</h1>
            <ul>
              <li class="food-item bottom-border-1px">
                <div class="icon">
                  <img
                    width="57"
                    height="57"
                    src="http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageVi ew2/1/w/114/h/114"
                  />
                </div>
                <div class="content">
                  <h2 class="name">红枣山药粥</h2>
                  <p class="desc">红枣山药糙米粥,素材包</p>
                  <div class="extra">
                    <span class="count">月售 17 份</span>
                    <span>好评率 100%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥29</span>
                    <span class="old">￥36</span>
                  </div>
                  <div class="cartcontrol-wrapper">CartControl</div>
                </div>
              </li>
            </ul>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
import CartControl from '../../../components/CartControl/CartControl'
export default {
  data() {
    return {
      scrollY:0, //在滑动着实时收集滑动的距离
      tops:[],//在列表第一次显示后收集每个头部到顶部的距离
    };
  },
  mounted() {
      this.$store.dispatch('getShopGoods', () => {// 数据更新后执行
        this.$nextTick(() => { // 列表数据更新显示后执行
        // 下划线一般代表初始化方法
          this._initScroll()
          this._initTops()
        })
      })
    
  },
  components: {
    CartControl
  },
  computed: {
    ...mapState(['goods']),
    currentIndex(){
      // 计算得到当前分类的下标
      const {scrollY,tops} = this
      return tops.findIndex((top,index)=> scrollY<tops[index+1] && scrollY>=tops[index])
    }
  },
  methods: {
    _initScroll(){
          new BScroll('.menu-wrapper')
          this.foodsScroll = new BScroll('.foods-wrapper',{
             probeType:3
          })
          this.foodsScroll.on('scroll',({x,y})=>{
             this.scrollY = Math.abs(y)
        })
    },
    _initTops(){
      // 找到所有分类的li
      const tops = []
      let top = 0
      tops.push(top)
      const lis = document.getElementsByClassName('food-list-hook')
      Array.prototype.slice.call(lis).forEach(li=>{
        top+= li.clientHeight
        tops.push(top)
      })
      this.tops = tops
    },
    turnToMenu(index){
      this.foodsScroll.scrollTo(0,-this.tops[index])
    }
  }
};
</script>
<style lang='stylus' scoped>
@import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>