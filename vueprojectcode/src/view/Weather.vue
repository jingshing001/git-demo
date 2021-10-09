<template>
  <div>
  <weather-top/>
  <weather-m></weather-m>
  </div>
</template>

<script>
import WeatherTop from '../components/weather/WeatherTop.vue'
import WeatherM from '../components/weather/WeatherM.vue'
export default {
  components:{
    WeatherTop,
    WeatherM
  },
  beforeCreate() {
     document.querySelector('body').setAttribute('style','background:#D5E2F2') 
  },
  beforedestroyed() {
      document.querySelector('body').removeAttribute('style')
  },
}
</script>

<style >

    
</style>