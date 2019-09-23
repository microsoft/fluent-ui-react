const inspect = require("./tools/inspect")

// Generates all dynamic pages for the website (pages that do not have a file
// in ./src/pages). Always prefer creating a page in src/pages.
exports.createPages = async function({actions}) {
  const components = await inspect.components()
  for (const c of components) {
    actions.createPage(generateComponentPlaygroundPage(c))
  }
}

function generateComponentPlaygroundPage(component) {
  return {
    path: `/components/${component.slug}/playground`,
    component: require.resolve(
      "./src/templates/components/standalone-playground.js"
    ),
    context: {
      schema: component
    }
  }
}

// Do not further modify the webpack configuration! This override exists
// solely to fix an issue with Gatsby loading multiple React instances.
// FIXME: investigate root cause
exports.onCreateWebpackConfig = function({getConfig, stage}) {
  const config = getConfig()
  config.resolve.alias = {
    ...config.resolve.alias,
    react: require.resolve("react")
  }
}
