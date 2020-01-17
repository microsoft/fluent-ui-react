import { rollup as lernaAliases } from 'lerna-alias'
import fs from 'fs'
import path from 'path'

export function getProjectsByType(type: 'gulp' | 'just') {
  const packagePaths = lernaAliases({ sourceDirectory: false })
  return Object.keys(packagePaths).filter(packageName => {
    const packagePath = packagePaths[packageName]
    if (type === 'gulp') {
      return fs.existsSync(path.join(packagePath, 'gulpfile.ts'))
    }
    return fs.existsSync(path.join(packagePath, 'just.config.ts'))
  })
}
