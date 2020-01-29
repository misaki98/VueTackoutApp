<template>
  <div>
      <router-view />
      <FooterGuide/>
  </div>
</template>

<script>
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

  mounted: {},

  methods: {}
}

</script>
<style lang='stylus' scoped rel="stylesheet/stylus">
.app
    color:red
</style>
