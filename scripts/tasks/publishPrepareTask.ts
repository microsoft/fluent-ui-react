import { getAllPackageInfo } from '../monorepo/getAllPackageInfo'
import { findGitRoot } from '../monorepo/findGitRoot'
import fs from 'fs'
import path from 'path'

export interface IPublishPrepareOptions {
  /** Don't update package.json for these packages */
  excludePackages?: string[]
}

/**
 * Update package.json for each project so that its `main` points to the build output
 * rather than the source.
 */
export function publishPrepare(options: IPublishPrepareOptions = {}) {
  const root = findGitRoot()
  const allInfo = getAllPackageInfo()

  const { excludePackages = [] } = options

  for (const [packageName, info] of Object.entries(allInfo)) {
    const oldMain = info.packageJson.main
    if (oldMain && oldMain.startsWith('src/') && !excludePackages.includes(packageName)) {
      const newPackageJson = {
        ...info.packageJson,
        main: oldMain.replace('src/', 'lib/').replace(/\.tsx?/, '.js'),
      }

      fs.writeFileSync(
        path.join(root, info.packagePath, 'package.json'),
        `${JSON.stringify(newPackageJson, null, 2)}\n`,
      )
    }
  }
}

export function publishPrepareTask() {
  publishPrepare()
}
