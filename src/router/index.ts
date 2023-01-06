import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "HomePage",
    component: () =>
      import(/* webpackChunkName: Home */ "@/pages/HomePage.vue"),
  },
  {
    path: "/todo",
    name: "TodoPage",
    component: () =>
      import(/* webpackChunkName: TodoPage */ "@/pages/TodoPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFoundPage",
    component: () =>
      import(/* webpackChunkName: NotFoundPage */ "@/pages/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
