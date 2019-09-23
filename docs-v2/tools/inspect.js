const fs = require("fs")
const path = require("path")
const util = require("util")
const workerFarm = require("worker-farm")
const {ComponentSchemaCache} = require("./component-schema-cache")
const readdir = util.promisify(fs.readdir)

const workers = workerFarm(require.resolve("./component-schema-worker.js"))

// returns JSON schemas for all parent components.
exports.components = async function() {
  console.info(
    "Generating component schemas... Results will be cached to speed up subsequent runs."
  )

  const sourceFiles = await getComponentSourceFiles()
  const components = await Promise.all(sourceFiles.map(generateComponentSchema))
  try {
    workerFarm.end()
  } catch (e) {
    // Workers may never have even started (i.e. if all schemas were cached),
    // in which case this fails. Ignore that.
  }
  return components
}

// returns absolute paths to all component source files
async function getComponentSourceFiles() {
  const root = path.resolve(__dirname, "../../packages/react/src/components")
  const dirs = await readdir(root)
  return dirs.map(dir => path.resolve(root, dir, dir + ".tsx"))
}

// generates a JSON schema for an individual source file
async function generateComponentSchema(sourceFile) {
  const cachedSchema = await ComponentSchemaCache.read(sourceFile)
  if (cachedSchema) {
    return cachedSchema
  }

  const schema = await new Promise((resolve, reject) => {
    workers(sourceFile, (err, schema) => {
      if (err) {
        reject(err)
      } else {
        resolve(schema)
      }
    })
  })

  await ComponentSchemaCache.write(sourceFile, schema)
  return schema
}
