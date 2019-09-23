const fs = require("fs")
const path = require("path")
const util = require("util")
const exists = util.promisify(fs.exists)
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const unlink = util.promisify(fs.unlink)

const CACHE_ROOT = path.resolve(
  __dirname,
  "../.cache/caches/gatsby-source-component-schemas"
)

let checkedCacheRootExistence = false

async function clean() {
  if (await exists(CACHE_ROOT)) {
    await unlink(CACHE_ROOT)
  }
}

async function read(sourcePath) {
  const cachePath = sourceToCachePath(sourcePath)
  if (await exists(cachePath)) {
    let raw = await readFile(cachePath, "utf8")
    try {
      return JSON.parse(raw)
    } catch (e) {
      console.error("Failed to read cached schema for: %s", sourcePath, e)
    }
  }
}

async function write(sourcePath, schema) {
  if (!schema || typeof schema !== "object") {
    throw new Error(
      "Attempted to cache bad value for " +
        sourcePath +
        ": " +
        JSON.stringify(schema) || "undefined"
    )
  }

  if (!checkedCacheRootExistence) {
    // FIXME: synchronous to fix race condition. Need mutext around this.
    if (!fs.existsSync(CACHE_ROOT)) {
      fs.mkdirSync(CACHE_ROOT, {recursive: true})
    }
    checkedCacheRootExistence = true
  }
  const cachePath = sourceToCachePath(sourcePath)
  await writeFile(cachePath, JSON.stringify(schema, null, 2), "utf8")
}

function sourceToCachePath(sourcePath) {
  return path.resolve(CACHE_ROOT, path.basename(sourcePath))
}

exports.ComponentSchemaCache = {
  clean,
  read,
  write
}
