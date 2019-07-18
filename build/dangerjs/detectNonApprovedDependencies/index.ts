import { isApproved, getDependencyPackageIds, FailedApprovalExplanation } from './utils'

const detectNonApprovedDependencies = dangerJS => {
  const { fail } = dangerJS
  const nonApproved: FailedApprovalExplanation[] = []

  const dependencyPackageIds = getDependencyPackageIds()

  dependencyPackageIds.forEach(packageId => {
    const verdict = isApproved(packageId)

    if (!verdict.isApproved) {
      nonApproved.push(verdict.explain)
    }
  })

  if (nonApproved.length) {
    fail(
      `The following packages lack approval:\n${nonApproved
        .map(
          explanation =>
            `--------------\n - ${explanation.failedConstraints.join(', ')}\n - ${
              explanation.approvedPackages.length
                ? explanation.approvedPackages.join(', ')
                : 'there are no approved packages'
            }`,
        )
        .join('\n')}`,
    )
  }
}

export default detectNonApprovedDependencies
