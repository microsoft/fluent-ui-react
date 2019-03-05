export const appTemplateJs = `import { Provider, themes } from "@stardust-ui/react"
import React from "react";
import ReactDOM from "react-dom";

import Example from "./example";

ReactDOM.render(
  <Provider theme={themes.teams}>
    <Example />
  </Provider>,
  document.getElementById("root")
);
`

export const appTemplateTs = `import { Provider, themes } from "@stardust-ui/react"
import * as React from "react";
import * as ReactDOM from "react-dom";

import Example from "./example";

ReactDOM.render(
  <Provider theme={themes.teams}>
    <Example />
  </Provider>,
  document.getElementById("root")
);
`
