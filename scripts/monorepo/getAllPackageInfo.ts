import { rollup as lernaAliases } from 'lerna-alias'
import path from 'path'
import { findGitRoot } from './findGitRoot'

export interface PackageJson {
  name: string
  version: string
  main: string
  types?: string
  module?: string
  dependencies?: { [key: string]: string }
  devDependencies?: { [key: string]: string }
  [key: string]: any
}

export interface PackageInfo {
  /** Package path relative to the project root */
  packagePath: string
  /** package.json contents */
  packageJson: PackageJson
}

export type AllPackageInfo = { [packageName: string]: PackageInfo }

let packageInfoCache: AllPackageInfo | null = null

export function getAllPackageInfo(): AllPackageInfo {
  if (packageInfoCache) {
    return packageInfoCache
  }

  const gitRoot = findGitRoot()
  const packagePaths = lernaAliases({ sourceDirectory: false })

  const packageInfo: { [key: string]: PackageInfo } = {}

  for (const [packageName, packagePath] of Object.entries(packagePaths)) {
    try {
      packageInfo[packageName] = {
        packagePath: path.relative(gitRoot, packagePath),
        packageJson: require(path.join(packagePath, 'package.json')),
      }
    } catch (ex) {
      /* eslint-disable-next-line no-console */
      console.warn(`Error parsing package.json for ${packageName}: ${ex}`)
    }
  }

  packageInfoCache = packageInfo

  return packageInfo
}
