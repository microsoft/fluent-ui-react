import * as semver from 'semver'

import approvedPackages, { isIgnored } from '../approvedPackages'
import { getPackageName, getPackageVersion } from './packageNameUtils'

export type FailedConstraintsExplanation = {
  approvedPackages: string[]
  failedConstraints: string[]
}

const getFailedPackageVersionConstraints = (
  packageId: string,
  versionConstraints: string[],
): FailedConstraintsExplanation | null => {
  const packageName = getPackageName(packageId)

  if (isIgnored(packageId)) {
    return null
  }

  const failedConstraints = []
  const approvedPackageIds = approvedPackages.filter(item => item.startsWith(`${packageName}@`))

  approvedPackageIds.map(getPackageVersion).forEach(approvedPackageVersion => {
    versionConstraints.forEach(versionConstraint => {
      if (!semver.satisfies(approvedPackageVersion, versionConstraint)) {
        failedConstraints.push(versionConstraint)
      }
    })
  })

  const isApproved = failedConstraints.length === 0

  return isApproved
    ? null
    : {
        failedConstraints: failedConstraints.map(
          versionConstraint => `${packageName}@${versionConstraint}`,
        ),
        approvedPackages: approvedPackageIds,
      }
}

export default getFailedPackageVersionConstraints
