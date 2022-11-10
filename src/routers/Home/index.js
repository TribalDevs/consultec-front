import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// * React router dom stuff
import { RouteContainer } from "components";
import { Route, Routes } from "react-router-dom";
import { homeRoutes as routes } from "routes";
export const HomeRouter = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="home__router">
      <React.Suspense
        fallback={
          <div className="loading">
            <h1>Cargando...</h1>
          </div>
        }
      >
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              element={
                <RouteContainer isPrivate={route.isPrivate}>
                  <route.component />
                </RouteContainer>
              }
            />
          ))}
        </Routes>
      </React.Suspense>
    </div>
  );
};
