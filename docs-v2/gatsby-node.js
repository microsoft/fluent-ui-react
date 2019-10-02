const inspect = require("./tools/inspect")

// FIXME: this gets initialized in createPages(), and is later used to inject
// additional context into component detail pages in onCreatePage(). I don't
// believe onCreatePage supports async actions, which is why this exists.
// Investigate whether or not that's actually true.
let componentSchemas

// Generates all dynamic pages for the website (pages that do not have a file
// in ./src/pages). Always prefer creating a page in src/pages.
exports.createPages = async function({actions}) {
  // Generate /components/:name/playground for each component
  componentSchemas = await inspect.components()
  for (const schema of componentSchemas) {
    const page = makeComponentPlaygroundPage(schema)
    actions.createPage(page)
  }
}

// Injects dynamic content into generated pages. This function should be used
// sparingly to avoid diverging too far from Gatsby core.
exports.onCreatePage = function({page, actions}) {
  // We avoid adding `category` to many pages' frontmatter because they are
  // already categorized by their location in /pages. Add it at build time.
  // TODO: should probably just add it to frontmatter for clarity...
  page = injectPageCategory(page, actions)

  // FIXME: Remove when possible. Component detail pages need access to the
  // component JSON schema, but I'm not sure how to supply this information
  // over a static graphql query in gatsby.
  if (
    page.context.frontmatter &&
    page.context.frontmatter.category === "Components" &&
    !/playground/.test(page.path)
  ) {
    page = injectComponentSchema(page, actions)
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

function makeComponentPlaygroundPage(component) {
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

function injectPageCategory(page, actions) {
  // Page already has a category.
  if (page.context.frontmatter && page.context.frontmatter.category) {
    return page
  }

  let category
  switch (true) {
    case /\/learn/.test(page.path):
      category = "Learn"
      break
    case /\/components/.test(page.path):
      category = "Components"
      break
    default:
      category = "Site"
  }
  actions.deletePage(page)
  page = {
    ...page,
    context: {
      ...page.context,
      frontmatter: {
        category,
        ...page.context.frontmatter
      }
    }
  }
  actions.createPage(page)
  return page
}

function injectComponentSchema(page, actions) {
  const slug = page.path.replace("/components/", "")
  const schema = componentSchemas.find(schema => schema.slug === slug)
  if (!schema) {
    console.error(
      'No schema found for page "%s" (looked up slug: "%s").',
      page.path,
      slug
    )
    return
  }

  actions.deletePage(page)
  page = {
    ...page,
    context: {
      ...page.context,
      schema,
      frontmatter: {
        title: schema.displayName,
        description: schema.description,
        ...page.frontmatter
      }
    }
  }
  actions.createPage(page)
  return page
}
