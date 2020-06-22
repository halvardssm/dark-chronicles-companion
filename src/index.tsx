import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import "./translations/i18n";

const render = () => ReactDOM.render(<App />, document.getElementById("root"));

render();
