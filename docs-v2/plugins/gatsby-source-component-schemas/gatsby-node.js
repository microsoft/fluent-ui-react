const inspect = require("../../tools/inspect")

// TODO: watch for changes to component sources to regenerate schemas
exports.sourceNodes = async function({
  actions,
  createNodeId,
  createContentDigest
}) {
  const components = await inspect.components()
  for (let c of components) {
    const node = {
      ...c,
      id: createNodeId(c.displayName),
      parent: null,
      children: [], // TODO: should include component's children
      internal: {
        type: "ComponentSchema",
        contentDigest: createContentDigest(c)
      }
    }
    actions.createNode(node)
  }
}
