import * as path from 'path'
import * as fs from 'fs'

import * as readPackageJson from 'read-package-json'
import { getPackageName, getPackageVersion } from './packageNameUtils'

type PackageJson = {
  dependencies?: string[]
}

type Constraints = { [PackageId: string]: string[] }

const findPackageJsonOf = (dependencyPackageId: string, packagePath: string): string => {
  if (!packagePath) {
    return null
  }

  const dependencyPackageName = getPackageName(dependencyPackageId)
  const dependencySubdirectories = dependencyPackageName.split('/')

  const dependencyPackagePathToTry = path.resolve(
    packagePath,
    'node_modules',
    ...dependencySubdirectories,
  )

  // package exists in child node_modules dir
  if (fs.existsSync(dependencyPackagePathToTry)) {
    return path.resolve(dependencyPackagePathToTry, 'package.json')
  }

  // termination condition for search recursion
  const hasYarnLock = fs.existsSync(path.resolve(packagePath, 'yarn.lock'))
  if (hasYarnLock) {
    return null
  }

  const parentPackageDirectoryPath = packagePath
    .split(path.sep)
    .slice(0, -1)
    .join(path.sep)
  return findPackageJsonOf(dependencyPackageId, parentPackageDirectoryPath)
}

const parsePackageJson = (packageJsonPath: string): Promise<PackageJson> => {
  return new Promise((resolve, reject) => {
    readPackageJson(packageJsonPath, (error, data) => {
      if (error) {
        reject(new Error(`There was an error reading the ${packageJsonPath} file.`))
      }

      const dependencies = data.dependencies || {}

      const normalizedDependencies = Object.keys(dependencies).map(packageName => {
        const versionConstraint = dependencies[packageName]
        return `${packageName}@${versionConstraint}`
      })

      resolve({
        dependencies: normalizedDependencies,
      })
    })
  })
}

export const getDependenciesVersionConstraints = async (
  packageJsonPath: string,
  dependencyChain: string[],
): Promise<Constraints> => {
  let detectedConstraints: Constraints = {}
  const dependenciesWithConstraints = (await parsePackageJson(packageJsonPath)).dependencies // and peer dependencies?

  const pendingTasks = dependenciesWithConstraints.map(async dependency => {
    detectedConstraints[dependency] = dependencyChain
    const dependencyPackageJson = findPackageJsonOf(dependency, path.dirname(packageJsonPath))

    if (!dependencyPackageJson) {
      throw new Error(
        `Package.json wasn't found for the following dependency: ${dependency} in ${packageJsonPath}`,
      )
    }

    const newDepChain = [...dependencyChain]
    newDepChain.push(dependency)

    const newConstraints = await getDependenciesVersionConstraints(
      dependencyPackageJson,
      newDepChain,
    )
    detectedConstraints = { ...detectedConstraints, ...newConstraints }
  })

  await Promise.all(pendingTasks)

  return detectedConstraints
}

export const normalizedVersionConstraints = (
  constraints: Constraints,
): { [PackageName: string]: string[] } => {
  return Object.keys(constraints)
    .sort()
    .reduce((acc, currentPackageId) => {
      const packageName = getPackageName(currentPackageId)
      const packageVersionConstraint = getPackageVersion(currentPackageId)

      if (!acc[packageName]) {
        acc[packageName] = []
      }

      acc[packageName].push(packageVersionConstraint)
      return acc
    }, {})
}

export default async (packageJsonPath: string) => {
  const detectedConstraints = await getDependenciesVersionConstraints(packageJsonPath, [])
  return normalizedVersionConstraints(detectedConstraints)
}
