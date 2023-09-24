import ApexCharts from 'apexcharts';
import "element-plus/theme-chalk/src/message.scss";
import { createPinia } from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';
import "uno.css";
import { createApp } from "vue";
import { createRouter, createWebHistory } from 'vue-router';
import VueApexCharts from "vue3-apexcharts";
// import routes from '~pages';

import "~/styles/index.scss";
import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import App from "./App.vue";
import { useUserStore } from './store/user';

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
app.use(ElementPlus);
app.use(VueApexCharts);
app.component('EasyDataTable', Vue3EasyDataTable);



// router.beforeEach(async (to, from) => {
//     const userStore = useUserStore()

//     function token() {
//         const user = localStorage.getItem('weather_app_user')
//         let userData = {} as any
//         let tokens = {} as any
//         if (user) {
//             userData = JSON.parse(user)
//             tokens = userData?.tokens
//         }
//         return tokens?.access?.token
//     }

//     let isAuthenticated = !!token()
//     console.log('isAuthenticated', isAuthenticated)
//     if (
//         !isAuthenticated && to.name !== 'login'
//     ) {
//         // redirect the user to the login page
//         return { name: 'login' }
//     }
// })

app.use(router)

app.config.globalProperties.$apexcharts = ApexCharts;

// Add this when into a TypeScript codebase
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $apexcharts: typeof ApexCharts;
    }
}
app.use(pinia)

app.mount("#app");
