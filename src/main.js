import { createApp } from "vue";
import "./assets/styles/style.scss";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { defaultTitle, routes } from "./routes.ts";
import ClickOutsideDirective from "./directives/ClickOutsideDirective.ts";
import InstantSearch from "vue-instantsearch/vue3/es";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title || defaultTitle;
});

const app = createApp(App);
app.use(router);
app.use(InstantSearch);
app.directive("click-outside", ClickOutsideDirective);
app.mount("#app");
