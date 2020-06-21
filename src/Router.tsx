import * as React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Main } from "./pages/Main";

export const ROUTE_HOME = "/";
export const routes = [
  {
    path: ROUTE_HOME,
    name: "Main",
    exact: true,
    component: Main,
  },
];

export const Router: React.FC = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((props, i) => (
          <Route key={i} {...props} />
        ))}
        <Redirect to={ROUTE_HOME} />
      </Switch>
    </BrowserRouter>
  );
};
