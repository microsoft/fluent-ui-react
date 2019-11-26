import { getAllPackageInfo } from '../monorepo/getAllPackageInfo'
import { findGitRoot } from '../monorepo/findGitRoot'
import fs from 'fs'
import path from 'path'

export function publishPrepareTask() {
  const root = findGitRoot()
  const allInfo = getAllPackageInfo()

  for (const info of Object.values(allInfo)) {
    if (info.packageJson.main && info.packageJson.main.startsWith('src/index')) {
      const newPackageJson = {
        ...info.packageJson,
        main: info.packageJson.main.replace('src/', 'lib/').replace(/\.tsx?/, '.js'),
      }
      fs.writeFileSync(
        path.join(root, info.packagePath, 'package.json'),
        `${JSON.stringify(newPackageJson, null, 2)}\n`,
      )
    }
  }
}
