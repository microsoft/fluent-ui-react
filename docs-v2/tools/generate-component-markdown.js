const fs = require("fs")
const path = require("path")
const util = require("util")
const inspect = require("./inspect")
const writeFile = util.promisify(fs.writeFile)

const COMPONENT_PAGES_PATH = path.resolve(__dirname, "../src/pages/components")

// Generates a markdown file for each Stardust component.
async function main() {
  let components = await inspect.components()
  await Promise.all(
    components.filter(c => c.isParent).map(createMarkdownPageForSchema)
  )
}

// Generates a markdown file from a component schema.
// docs/src/componentInfo/{name}.js -> docs/src/pages/components/{name}.js
async function createMarkdownPageForSchema(schema) {
  let outFile = path.resolve(COMPONENT_PAGES_PATH, schema.slug + ".mdx")
  let content = ["---", "---", ""].join("\n")
  await writeFile(outFile, content, "utf8")
}

main()
