const inspect = require("./tools/inspect")

// FIXME
let componentSchemas

// Generates all dynamic pages for the website (pages that do not have a file
// in ./src/pages). Always prefer creating a page in src/pages.
exports.createPages = async function({actions}) {
  componentSchemas = await inspect.components()
  for (const schema of componentSchemas) {
    const page = generateComponentPlaygroundPage(schema)
    actions.createPage(page)
  }
}

// FIXME: Remove when possible. Component detail pages need access to the
// component schema, but I'm not sure how to supply this information over
// a static graphql query in gatsby.
exports.onCreatePage = function({page, actions}) {
  if (/\/components\/[\w-]+$/.test(page.path)) {
    const slug = page.path.replace("/components/", "")
    const schema = componentSchemas.find(schema => schema.slug === slug)
    if (!schema) {
      console.error(
        'No schema while creating page component page "%s" (looked up slug: "%s"). This page will be deleted.',
        page.path,
        slug
      )
      actions.deletePage(page)
      return
    }

    const frontmatter = {
      title: schema && schema.displayName,
      description: schema && schema.description,
      category: "components",
      ...page.frontmatter
    }
    actions.createPage({
      ...page,
      frontmatter,
      context: {
        ...page.context,
        schema,
        frontmatter
      }
    })
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
