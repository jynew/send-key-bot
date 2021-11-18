import Vue from 'vue'
import { Form, Input, Button, message, Radio } from 'ant-design-vue';
import App from './App.vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Form)
Vue.use(Input)
Vue.use(Button)
Vue.use(Radio)
Vue.prototype.$message = message

new Vue({
  render: h => h(App),
}).$mount('#app')
