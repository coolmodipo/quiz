// Call the bootstrap file.
require('./bootstrap');
// Import main vue.
import Vue from 'vue';
// Import Vuex
import Vuex from 'vuex';
// Import store.
import storeData from './_store';
// Main application page
import App from '@components/App';
// Import validation
import VeeValidate from 'vee-validate';

// Vue USE
Vue.use(Vuex);
Vue.use(VeeValidate);

const store = new Vuex.Store(storeData);

new Vue({
    name: "Quiz Application",
    store,
    render: h => h(App)
}).$mount('#app');
