<template>
  <v-container class="main">
    <TopNav />
    <br />
    <router-view />
    <BottomNav />
  </v-container>

  <v-btn class="ma-4 fixed-half" color="indigo" icon="mdi-cloud-upload" style="background-color: green !important;">
    <a :href="serviceUrl" style="font-size: small;">在线<br>客服</a>
  </v-btn>
</template>

<script>
import BottomNav from './components/BottomNav.vue';
import TopNav from './components/TopNav.vue';
import Home from './pages/Home.vue';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';

export default {
  setup() {
    return {};
  },
  data: () => ({
    configInfo: {},
    serviceUrl: '',
    // mode: 'orange'
  }),
  components: {
    Home,
    BottomNav,
    TopNav
  },
  mounted() {
    this.serviceUrl = localStorage.getItem('serviceUrl');
    SplashScreen.hide();
    StatusBar.hide();
    StatusBar.setBackgroundColor({ color: '#2784ff !important' });
  },
}
</script>

<style lang="scss" scoped>

</style>
