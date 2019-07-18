import * as semver from 'semver'

import approvedPackages, { isIgnored } from '../approvedPackages'
import { getPackageName, getPackageVersion } from './packageNameUtils'

export type FailedConstraintsExplanation = {
  approvedPackages: string[]
  failedConstraints: string[]
}

export type ApprovalCheckResult = {
  isApproved: boolean
  explain?: FailedConstraintsExplanation
}

const checkPackageVersionConstraints = (
  packageId: string,
  versionConstraints: string[],
): ApprovalCheckResult => {
  const packageName = getPackageName(packageId)

  if (isIgnored(packageId)) {
    return { isApproved: true }
  }

  const versionConstraintsCheckResult = versionConstraints.reduce(
    (acc, versionConstraint) => ({ ...acc, [versionConstraint]: false }),
    {},
  )

  const approvedPackageIds = approvedPackages.filter(item => item.startsWith(`${packageName}@`))

  approvedPackageIds.map(getPackageVersion).forEach(approvedPackageVersion => {
    Object.keys(versionConstraintsCheckResult).forEach(versionConstraint => {
      if (semver.satisfies(approvedPackageVersion, versionConstraint)) {
        versionConstraintsCheckResult[versionConstraint] = true
      }
    })
  })

  const failedConstraints = Object.keys(versionConstraintsCheckResult).reduce(
    (acc, versionConstraint) =>
      !versionConstraintsCheckResult[versionConstraint] ? [...acc, versionConstraint] : acc,
    [],
  )

  const isApproved = failedConstraints.length === 0

  return isApproved
    ? { isApproved }
    : {
        isApproved: false,
        explain: {
          failedConstraints: failedConstraints.map(
            versionConstraint => `${packageName}@${versionConstraint}`,
          ),
          approvedPackages: approvedPackageIds,
        },
      }
}

export default checkPackageVersionConstraints
