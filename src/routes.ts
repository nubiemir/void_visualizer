import { lazy } from "solid-js";

export const routes = [
  {
    path: "/",
    component: lazy(() => import("../src/pages/Home")),
  },
  {
    path: "/algorithm",
    component: lazy(() => import("../src/pages/Algorithm")),
  },

  {
    path: "/algorithm/*",
    component: lazy(() => import("../src/pages/Visualizer/Sorting")),
  },
  {
    path: "/*all",
    component: lazy(() => import("../src/pages/404")),
  },
];
