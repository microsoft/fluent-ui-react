import { getAllPackageInfo, PackageJson } from '../monorepo/getAllPackageInfo'
import { findGitRoot } from '../monorepo/findGitRoot'
import fs from 'fs'
import path from 'path'

export function publishPrepareTask() {
  const root = findGitRoot()
  const allInfo = getAllPackageInfo()

  for (const info of Object.values(allInfo)) {
    const oldMain = info.packageJson.main
    if (!oldMain) {
      continue
    }

    let newPackageJson: PackageJson | undefined
    if (oldMain.startsWith('src/')) {
      // just project
      newPackageJson = {
        ...info.packageJson,
        main: oldMain.replace('src/', 'lib/').replace(/\.tsx?/, '.js'),
      }
    } else if (oldMain.startsWith('dist-temp')) {
      // gulp project
      // main:    dist/commonjs/index.js
      // typings:   dist/es/index.d.ts
      // module:  dist/es/index.js
      newPackageJson = {
        ...info.packageJson,
        main: oldMain.replace('dist-temp/src', 'dist/commonjs'),
        typings: oldMain.replace('dist-temp/src', 'dist/es').replace('.js', '.d.ts'),
      }
    }

    if (newPackageJson) {
      fs.writeFileSync(
        path.join(root, info.packagePath, 'package.json'),
        `${JSON.stringify(newPackageJson, null, 2)}\n`,
      )
    }
  }
}
