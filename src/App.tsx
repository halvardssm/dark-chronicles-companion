import * as React from "react";
import { Router } from "./Router";
import { CssBaseline } from '@material-ui/core';

export const App: React.FC = () => (
  <div id="app-root">
    <CssBaseline />
    <Router />
  </div>
);
