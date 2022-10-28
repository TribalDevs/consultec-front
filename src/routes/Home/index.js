import { lazy } from "react";
const HomeScreen = lazy(() => import("views/Home/HomeScreen"));
const LoginScreen = lazy(() => import("views/Home/Login"));
const RegisterScreen = lazy(() => import("views/Home/Register"));
const StudentVerification = lazy(() => import("views/Home/StudentVerification"))
export const homeRoutes = [
  {
    path: "/",
    component: HomeScreen,
    exact: true,
    isPrivate: true,
    accessWithoutLogin: false,
  },
  {
    path: "/login",
    component: LoginScreen,
    exact: true,
    isPrivate: false,
    accessWithoutLogin: true,
  },
  {
    path: "/register",
    component: RegisterScreen,
    exact: true,
    isPrivate: false,
    accessWithoutLogin: true,
  },
  {
    path: "/student-verification",
    component: StudentVerification,
    exact: true,
    isPrivate: false,
    accessWithoutLogin: true,
  },
];
