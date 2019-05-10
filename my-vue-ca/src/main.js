import Vue from "vue";

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

import '@/icons'
import '@/permission'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

// my define componets
import imagelist from '@/components/Imagelist'
Vue.component('imagelist', imagelist)
import canvasrect from '@/components/Canvasrect'
Vue.component('canvasrect', canvasrect)
import cameravideo from '@/components/Cameravideo'
Vue.component('cameravideo', cameravideo)

// 高德
// 引入vue-amap
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '160cab8ad6c50752175d76e61ef92c50',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});

Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
