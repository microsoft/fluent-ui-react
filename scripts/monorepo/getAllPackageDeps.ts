import { getAllPackageInfo, PackageJson } from './getAllPackageInfo'

function getDeps(packageJson: PackageJson, repoPackages: string[]) {
  if (!packageJson) {
    return []
  }
  return Object.keys({
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
  }).filter(p => repoPackages.includes(p))
}

/**
 * Find all the dependencies (and their dependencies) within the repo for a specific package
 * (in the CWD when this was called)
 */
export function getAllPackageDeps() {
  const allInfo = getAllPackageInfo()
  const repoPackages = Object.keys(allInfo)
  const allDeps = new Map<string, Set<string>>()

  for (const [name, pkgInfo] of Object.entries(allInfo)) {
    const packageJson = pkgInfo.packageJson
    const packageDeps = getDeps(packageJson, repoPackages)

    const result = new Set<string>()

    while (packageDeps.length > 0) {
      const dep = packageDeps.pop()
      const info = allInfo[dep!]

      if (dep && info) {
        result.add(dep)
      }

      if (!info) {
        continue
      }

      const deps = getDeps(info.packageJson, repoPackages)

      deps.forEach(child => {
        if (!result.has(child)) {
          packageDeps.push(child)
        }
      })
    }

    allDeps.set(name, result)
  }

  return allDeps
}
