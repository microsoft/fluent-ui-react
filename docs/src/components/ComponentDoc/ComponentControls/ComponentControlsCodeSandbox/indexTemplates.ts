export const appTemplateJs = `import { Provider, themes } from "@stardust-ui/react"
import React from "react";
import ReactDOM from "react-dom";

import Example from "./example";

const element = document.getElementById("root");
ReactDOM.render(
  <Provider theme={themes.teams}>
    <Example />
  </Provider>,
  element
);
`
