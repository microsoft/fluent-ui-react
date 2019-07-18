import {
  checkPackageVersionConstraints,
  getVersionConstrains,
  getRuntimeDependencies,
  getPackageName,
  FailedConstraintsExplanation,
} from './utils'
import config from '../../../config'

const { paths } = config

const detectNonApprovedDependencies = async dangerJS => {
  const { fail } = dangerJS
  const nonApproved: FailedConstraintsExplanation[] = []

  const versionConstraints = await getVersionConstrains(paths.packages('react', 'package.json'))

  const dependencyPackageIds = getRuntimeDependencies()

  dependencyPackageIds.forEach(packageId => {
    const verdict = checkPackageVersionConstraints(
      packageId,
      versionConstraints[getPackageName(packageId)] || [],
    )

    if (!verdict.isApproved) {
      nonApproved.push(verdict.explain)
    }
  })

  if (nonApproved.length) {
    // TODO refactor formatting
    fail(
      `The following package version constraints missing approved candidate:\n${nonApproved
        .map(
          explanation =>
            `--------------\n - ${explanation.failedConstraints.join(
              ', ',
            )}\n - Approved candidates: ${
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
