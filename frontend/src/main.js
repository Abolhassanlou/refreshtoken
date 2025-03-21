import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import api from './utils/axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

library.add(faUser);

const app = createApp(App);
app.use(router);
app.config.globalProperties.$api = api;
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');