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


Vue.config.productionTip = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
