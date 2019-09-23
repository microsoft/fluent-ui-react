// TODO: document why this file wraps generate-component-schema
const fs = require("fs")
const path = require("path")
const util = require("util")
const babel = require("@babel/standalone")
const {generateComponentSchema} = require("./generate-component-schema")
const readFile = util.promisify(fs.readFile)
const readdir = util.promisify(fs.readdir)
const exists = util.promisify(fs.exists)

const INCLUDE_V1_EXAMPLES = false
const PREVIEWS_DIR = path.resolve(__dirname, "../src/examples")
const V1_EXAMPLES_DIR = path.resolve(__dirname, "../../docs/src/components/")
const V2_EXAMPLES_DIR = path.resolve(__dirname, "../src/examples")

// transforms a component source file into a JSON schema.
module.exports = async function createComponentSchema(sourcePath, callback) {
  try {
    const schema = await generateComponentSchema(sourcePath)
    schema.slug = slugify(schema.displayName)
    if (schema.isParent) {
      schema.preview = await getComponentPreview(schema)
      schema.examples = await getComponentExamples(schema)
    }
    callback(null, schema)
  } catch (e) {
    e.message = `Error generating schema for ${sourcePath}: ${e.message}`
    callback(e)
  }
}

// returns the custom React preview for a component
async function getComponentPreview(schema) {
  const file = path.resolve(PREVIEWS_DIR, schema.slug, "preview.js")
  if (!(await exists(file))) {
    console.warn("No preview exists for %s", schema.displayName)
    return
  }
  let preview = await readFile(file, "utf8")
  preview = preview.replace("export default", "return")
  preview = `;(function () {
    // Injected by schema generator (tools/inspect.js)
    if (typeof window !== "undefined") {
      if (!window.__injectedPreviewGlobals) {
        for (var key in Stardust) {
          window[key] = Stardust[key]
        }
        window.__injectedPreviewGlobals = true
      }
    }

    ${preview}
  })()`
  preview = babel.transform(preview, {presets: ["react"]}).code
  return preview
}

// finds and returns all examples that match the given schema
async function getComponentExamples(schema) {
  return flatten(
    await Promise.all([
      INCLUDE_V1_EXAMPLES ? getV1ComponentExamples(schema) : [],
      getV2ComponentExamples(schema)
    ])
  )
}

// TODO: get description and title from index.tsx file
async function getV1ComponentExamples(schema) {
  const dir = path.resolve(V1_EXAMPLES_DIR, schema.displayName)
  if (!(await exists(dir))) {
    return []
  }
  return []
}

async function getV2ComponentExamples(schema) {
  const dir = path.resolve(V2_EXAMPLES_DIR, schema.slug, "examples")
  if (!(await exists(dir))) {
    return []
  }

  const files = await readdir(dir)
  const examples = await Promise.all(
    files.map(async file => {
      let source = await readFile(path.resolve(dir, file), "utf8")
      let description = source
        .split("\n")
        .find(line => line.includes("description:"))

      if (description) {
        description = description.replace(/(.*?)description:\s*/, "")
      }
      return {
        title: file.replace(/\.(js|ts|tsx)$/, ""),
        description: description || "",
        source
      }
    })
  )
  return examples
}

function flatten(coll) {
  return [].concat(...coll)
}

function slugify(str) {
  return str
    .replace(/(\w)([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "")
    .toLowerCase()
}
