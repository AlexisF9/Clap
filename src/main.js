import { createApp } from 'vue'
import './assets/styles/style.scss'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import { routes } from './routes.ts'
import ClickOutsideDirective from "./directives/ClickOutsideDirective.ts";

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return {
            top: 0
        }
    },
})

const app = createApp(App)
app.use(router)
app.directive('click-outside', ClickOutsideDirective);
app.mount('#app')