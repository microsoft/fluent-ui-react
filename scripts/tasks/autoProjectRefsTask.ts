import { getAllPackageDeps } from '../monorepo/getAllPackageDeps'
import path from 'path'
import fs from 'fs'
import { getAllPackageInfo } from '../monorepo/getAllPackageInfo'
import { findGitRoot } from '../monorepo/findGitRoot'
import { logger } from 'just-task'

export function autoProjectRefsTask() {
  const updatedTsconfigs = getUpdatedTsconfigs()

  if (updatedTsconfigs.size > 0) {
    for (const [file, blob] of updatedTsconfigs.entries()) {
      logger.info(`Updating ${file} with project references`)
      fs.writeFileSync(file, JSON.stringify(blob, null, 2))
    }
  }
}

export function autoProjectRefsVerifyTask() {
  const updatedTsconfigs = getUpdatedTsconfigs()
  if (updatedTsconfigs.size > 0) {
    throw new Error(
      `There are differences between package.json dependencies and these project tsconfig.json files: [${Array.from(
        updatedTsconfigs.keys(),
      )}]`,
    )
  }
}

function getUpdatedTsconfigs() {
  const excluded = ['@fluentui/scripts', 'fluent-ui-monorepo']
  const repoDeps = getAllPackageDeps()
  const allInfo = getAllPackageInfo()
  const root = findGitRoot()
  let isDirty = false
  const updatedTsconfigs = new Map<string, string>()

  for (const [name, info] of Object.entries(allInfo)) {
    if (excluded.includes(name)) {
      continue
    }

    isDirty = false
    const deps = repoDeps.get(name)
    const tsconfigFile = path.join(root, info.packagePath, 'tsconfig.json')
    const tsconfigJson = JSON.parse(fs.readFileSync(tsconfigFile, 'utf-8'))

    const newRefs = [...deps]
      .sort()
      .filter(d => !excluded.includes(d))
      .map(d => {
        const relPath = path.relative(info.packagePath, allInfo[d].packagePath)
        return { path: `${path.join(relPath, 'tsconfig.json').replace(/\\/g, '/')}` }
      })

    if (newRefs.length === 0) {
      if (tsconfigJson.references) {
        delete tsconfigJson.references
        isDirty = true
      }
    } else if (JSON.stringify(tsconfigJson.references) !== JSON.stringify(newRefs)) {
      tsconfigJson.references = newRefs
      isDirty = true
    }

    if (isDirty) {
      updatedTsconfigs.set(tsconfigFile, tsconfigJson)
    }
  }
  return updatedTsconfigs
}
