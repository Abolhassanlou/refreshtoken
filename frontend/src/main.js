import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from 'pinia';
import * as BootstrapVueNext from "bootstrap-vue-next";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS
import '@fortawesome/fontawesome-free/css/all.css';

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(BootstrapVueNext);
app.use(pinia);


app.mount("#app");