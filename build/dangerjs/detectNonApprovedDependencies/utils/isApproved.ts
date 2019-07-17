import * as fs from 'fs'
import semver from 'semver'
import * as lockfile from '@yarnpkg/lockfile'

import approvedDependencies from '../approvedDependencies'

import config from '../../../../config'

const { paths } = config

const parseLockfile = path => {
  const file = fs.readFileSync(path, 'utf8')
  return lockfile.parse(file).object
}

const yarnLockfile = parseLockfile(paths.base('yarn.lock'))

const getVersionConstraints = (packageName: string, packageVersion: string): string[] => {
  return Object.keys(yarnLockfile)
    .filter(packageId => packageId.startsWith(`${packageName}@`))
    .filter(matchedPackageId => yarnLockfile[matchedPackageId].version === packageVersion)
    .map(getPackageVersion)
}

const getPackageVersion = (packageId: string) => {
  return packageId.match(/@([^@]+)$/)[1]
}

const satisfiesConstraints = (packageVersion: string, versionConstraints: string[]) => {
  const nonSatisfiedConstraints = versionConstraints.filter(constraint =>
    semver.satisfies(packageVersion, constraint),
  )

  return nonSatisfiedConstraints.length === 0
}

export default (packageName: string, packageVersion: string) => {
  if (packageName.startsWith('@stardust-ui/')) {
    return true
  }

  const packageVersionConstraints = getVersionConstraints(packageName, packageVersion)

  const approvedPackageIds = approvedDependencies.filter(item => item.startsWith(packageName))

  return approvedPackageIds
    .filter(getPackageVersion)
    .some(approvedPackageVersion =>
      satisfiesConstraints(approvedPackageVersion, packageVersionConstraints),
    )
}
