<template>
  <div id="app">
      <router-view />
      <FooterGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {reqUserInfo} from './api'
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
  data () {
    return {
    }
  },

  components: {
      FooterGuide
  },

  computed: {},
  async mounted() {
    // this.$store.dispatch('getAddress')
    this.getAddress()
    const result = await reqUserInfo()
    if(result.code===0){
      const user = result.data
      this.$store.dispatch('recordUser',user)
    }
  },

  methods: {
    ...mapActions(['getAddress'])
  }
}

</script>
<style lang='stylus' scoped rel="stylesheet/stylus">
#app
  width 100%
  height 100%
  background #f5f5f5
  position relative
</style>
