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
    path: "/algorithm/:id",
    component: lazy(() => import("../src/pages/Visualizer/Sorting")),
  },
  {
    path: "/read/bubble",
    component: lazy(() => import("../src/pages/Reader/Sorting/bubble.tsx")),
  },
  {
    path: "/*all",
    component: lazy(() => import("../src/pages/404")),
  },
];
