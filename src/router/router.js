import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => import("@/views/HomePage");
const SearchPage = () => import("@/views/SearchPage");
const AdminPage = () => import("@/views/AdminPage");

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/search",
    component: SearchPage,
  },
  {
    path: "/admin",
    component: AdminPage,
  },
];

const router = createRouter({
  mode: "history",
  routes,
  history: createWebHistory(import.meta.env.BASE_URL),
});

export default router;
