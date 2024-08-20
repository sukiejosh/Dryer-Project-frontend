import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import VueApexCharts from "vue3-apexcharts";
// import routes from '~pages';

import '~/styles/index.css'
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import App from "./App.vue";

const routes = setupLayouts(generatedRoutes)


const router = createRouter({
    routes,
    history: createWebHistory(),
})

const pinia = createPinia()

pinia.use(createPersistedState({
    auto: true,
}))


const app = createApp(App);
app.use(VueApexCharts);
app.component('EasyDataTable', Vue3EasyDataTable);

app.use(router)

// Add this when into a TypeScript codebase
declare module 'vue' {
    interface ComponentCustomProperties {
        $apexcharts: typeof ApexCharts;
    }
}
app.use(pinia)

app.mount("#app");
