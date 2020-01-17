import { rollup as lernaAliases } from 'lerna-alias'
import path from 'path'

export interface PackageJson {
  name: string
  version: string
  main: string
  types?: string
  module?: string
  dependencies?: { [key: string]: string }
  devDependencies?: { [key: string]: string }
}

export interface PackageInfo {
  packagePath: string
  packageJson: PackageJson
}

export type AllPackageInfo = { [packageName: string]: PackageInfo }

let packageInfoCache: AllPackageInfo | null = null

export function getAllPackageInfo(): AllPackageInfo {
  if (packageInfoCache) {
    return packageInfoCache
  }

  const packagePaths = lernaAliases({ sourceDirectory: false })

  const packageInfo: { [key: string]: PackageInfo } = {}

  for (const [packageName, packagePath] of Object.entries(packagePaths)) {
    try {
      packageInfo[packageName] = {
        packagePath,
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
