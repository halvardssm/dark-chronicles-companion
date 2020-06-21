import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { Router } from "./Router";

export const App: React.FC = () => (
  <div id="app-root">
    <Provider store={store}>
      <Router />
    </Provider>
  </div>
);
