import { getAllPackageDeps } from '../monorepo/getAllPackageDeps'
import path from 'path'
import fs from 'fs'
import jju from 'jju'
import { getAllPackageInfo } from '../monorepo/getAllPackageInfo'
import { findGitRoot } from '../monorepo/findGitRoot'
import { logger } from 'just-task'

interface TSConfig {
  references: { path: string }[]
  [key: string]: any
}

export function autoProjectRefsTask() {
  const updatedTsconfigs = getUpdatedTsconfigs()

  if (updatedTsconfigs.size > 0) {
    for (const [file, [originalText, updatedJson]] of updatedTsconfigs.entries()) {
      logger.info(`Updating ${file} with project references`)
      fs.writeFileSync(
        file,
        jju.update(originalText, updatedJson, {
          mode: 'json5',
          indent: 2,
          quote: '"',
          quote_keys: true,
          no_trailing_comma: true,
        }),
      )
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
  const excluded = ['@fluentui/scripts', '@fluentui/build']
  const repoDeps = getAllPackageDeps()
  const allInfo = getAllPackageInfo()
  const root = findGitRoot()
  let isDirty = false
  const updatedTsconfigs = new Map<string, [string, TSConfig]>()

  for (const [name, info] of Object.entries(allInfo)) {
    if (excluded.includes(name)) {
      continue
    }

    isDirty = false
    const deps = repoDeps.get(name)!
    const tsconfigFile = path.join(root, info.packagePath, 'tsconfig.json')
    const tsconfigText = fs.readFileSync(tsconfigFile, 'utf-8')
    const tsconfigJson: TSConfig = jju.parse(tsconfigText)

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
      updatedTsconfigs.set(tsconfigFile, [tsconfigText, tsconfigJson])
    }
  }
  return updatedTsconfigs
}
