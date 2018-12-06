import * as debug from 'debug'
import { task } from 'gulp'
import * as fs from 'fs'
import * as path from 'path'
import * as tmp from 'tmp'

import sh from '../sh'
import { buildAndPackStardust, createPackageFilename, runIn } from './test-projects'

const logger = debug('bundle:rollup')
logger.enabled = true

const STARTER_URL = `https://github.com/rollup/rollup-starter-app.git`

const appJS = `
import React from "react";
import ReactDOM from "react-dom";
import { Button, Provider, themes } from "@stardust-ui/react";

ReactDOM.render(
  React.createElement(
    Provider,
    { theme: themes.teams },
    React.createElement(Button, { content: "Theming" })
  ),
  document.getElementById("time-now")
);
`

const rollupConfig = `
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const lodashExports = [
  "compact",
  "difference",
  "each",
  "findIndex",
  "flow",
  "forEach",
  "get",
  "has",
  "filter",
  "first",
  "includes",
  "intersection",
  "invoke",
  "isArray",
  "isEmpty",
  "isFunction",
  "isNil",
  "isObject",
  "isPlainObject",
  "inRange",
  "isUndefined",
  "keys",
  "last",
  "map",
  "mapValues",
  "merge",
  "memoize",
  "min",
  "pick",
  "round",
  "set",
  "some",
  "sortBy",
  "startsWith",
  "sum",
  "take",
  "trim",
  "without",
  "union",
  "uniq",
  "uniqueId"
];

export default {
  input: "src/main.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    resolve(),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        "node_modules/keyboard-key/src/keyboardKey.js": [
          "ArrowDown",
          "ArrowUp",
          "ArrowLeft",
          "ArrowRight",
          "End",
          "Enter",
          "Escape",
          "Home",
          "getCode",
          "Spacebar",
          "Tab"
        ],
        "node_modules/lodash/fp.js": lodashExports,
        "node_modules/lodash/lodash.js": lodashExports,
        "node_modules/prop-types/index.js": [
          "any",
          "arrayOf",
          "bool",
          "element",
          "func",
          "node",
          "number",
          "object",
          "oneOf",
          "oneOfType",
          "shape",
          "string",
          "symbol"
        ],
        "node_modules/react/index.js": [
          "Component",
          "cloneElement",
          "createRef",
          "PureComponent",
          "Fragment",
          "Children",
          "createElement",
          "isValidElement"
        ],
        "node_modules/react-dom/index.js": ["createPortal", "findDOMNode"],
        "node_modules/react-is/index.js": ["isForwardRef"],
        "node_modules/what-input/dist/what-input.js": ["ask"]
      }
    })
  ]
};
`

task('test:projects:rollup', async () => {
  const packageFilename = createPackageFilename()

  try {
    await buildAndPackStardust(packageFilename)
    logger(`✔️Stardust UI package was prepared: ${packageFilename}`)

    const tmpDirectory = tmp.dirSync({ prefix: 'stardust-' }).name
    logger(`✔️Temporary directory was created: ${tmpDirectory}`)

    await sh(`git clone ${STARTER_URL} ${tmpDirectory}`)
    logger(`✔️Starter repository was cloned`)

    await runIn(tmpDirectory)('yarn')
    logger(`✔️Initial dependencies were installed`)

    await runIn(tmpDirectory)('yarn upgrade --latest --pattern rollup')
    await runIn(tmpDirectory)('yarn add rollup-plugin-replace')
    logger(`✔️Initial dependencies were updated to latest`)

    await runIn(tmpDirectory)('yarn add react react-dom')
    logger(`✔️React dependencies were installed`)

    await runIn(tmpDirectory)(`yarn add ${packageFilename}`)
    logger(`✔️Stardust UI was added to dependencies`)

    fs.writeFileSync(path.resolve(tmpDirectory, 'src', 'main.js'), appJS)
    fs.writeFileSync(path.resolve(tmpDirectory, 'rollup.config.js'), rollupConfig)
    logger(`✔️Source and bundler's config was updated`)

    await runIn(tmpDirectory)(`yarn build`)
    logger(`✔️Example project was successfully built: ${tmpDirectory}`)
  } finally {
    fs.unlinkSync(packageFilename)
  }
})
