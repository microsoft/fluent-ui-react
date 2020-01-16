import { getAllPackageInfo } from '../monorepo/getAllPackageInfo'
import { findGitRoot } from '../monorepo/findGitRoot'
import fs from 'fs'
import path from 'path'

export function publishPrepareTask() {
  const root = findGitRoot()
  const allInfo = getAllPackageInfo()

  for (const info of Object.values(allInfo)) {
    if (info.packageJson.main && info.packageJson.main.startsWith('src/')) {
      const newPackageJson = {
        ...info.packageJson,
      }

      if (fs.existsSync(path.join(info.packagePath, 'just.config.ts'))) {
        newPackageJson.main = info.packageJson.main.replace('src/', 'lib/').replace(/\.tsx?/, '.js')
      } else {
        const entry = info.packageJson.main.replace('src/', 'dist/es/').replace(/\.tsx?/, '.js')
        Object.assign(newPackageJson, {
          main: entry.replace('/es/', '/commonjs/'),
          module: entry,
          'jsnext:main': entry,
          types: entry.replace('.js', '.d.ts'),
        })
      }

      fs.writeFileSync(
        path.join(root, info.packagePath, 'package.json'),
        `${JSON.stringify(newPackageJson, null, 2)}\n`,
      )
    }
  }
}
