import { lazy } from "react";
const HomeScreen = lazy(() => import("views/Home/HomeScreen"));
export const homeRoutes = [
  {
    path: "/",
    component: HomeScreen,
    exact: true,
  },
];
