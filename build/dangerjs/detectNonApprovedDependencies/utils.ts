import * as fs from 'fs'
import { spawnSync } from 'child_process'
import * as semver from 'semver'
import * as lockfile from '@yarnpkg/lockfile'

import approvedDependencies from './approvedDependencies'

import config from '../../../config'

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

const getPackageName = (packageId: string): string => {
  return packageId.match(/^(.+)@[^@]+$/)[1]
}

const getPackageVersion = (packageId: string): string => {
  return packageId.match(/@([^@]+)$/)[1]
}

const getFailedConstraints = (packageVersion: string, versionConstraints: string[]): string[] => {
  const failedConstraints = versionConstraints.filter(constraint => {
    return !semver.satisfies(packageVersion, constraint)
  })

  return failedConstraints
}

export const getDependencyPackageIds = () => {
  const dependencyRegex = /^dependency:\s+(.*)$/
  const result = spawnSync("yarn gulp test:dependencies:list --prefix='dependency: '", {
    shell: true,
    cwd: paths.base(),
    stdio: 'pipe',
    encoding: 'utf-8',
  })

  const output = `${result.stdout}`
  const error = `${result.stderr}`

  if (error) {
    throw new Error(error)
  }

  return output
    .split('\n')
    .map(line => line.match(dependencyRegex))
    .filter(match => !!match)
    .map(match => match[1])
}

export type FailedApprovalExplanation = {
  approvedPackages: string[]
  failedConstraints: string[]
}

export type ApprovalCheckResult = {
  isApproved: boolean
  explain?: FailedApprovalExplanation
}

/**
 * Returns:
 * - isApproved: true / false
 * - explain
 *      - unmet constraints
 *      - tried packages
 */

/**
 * The following package version constraints are not met by any of the approved dependencies (both contraints should be satisfied by any of the approved package):
 * - unmet constraints
 * - related approved dependencies (if any)
 *
 * Failed candidates (from the approval list):
 */
export const isApproved = (packageId: string): ApprovalCheckResult => {
  const packageName = getPackageName(packageId)
  const packageVersion = getPackageVersion(packageId)

  if (packageName.startsWith('@stardust-ui/')) {
    return { isApproved: true }
  }

  const packageVersionConstraints = getVersionConstraints(packageName, packageVersion)

  const approvedPackageIds = approvedDependencies.filter(item => item.startsWith(`${packageName}@`))

  const isApproved = approvedPackageIds.map(getPackageVersion).some(approvedPackageVersion => {
    return getFailedConstraints(approvedPackageVersion, packageVersionConstraints).length === 0
  })

  return isApproved
    ? { isApproved }
    : {
        isApproved: false,
        explain: {
          failedConstraints: packageVersionConstraints.map(
            versionConstraint => `${packageName}@${versionConstraint}`,
          ),
          approvedPackages: approvedPackageIds,
        },
      }
}
