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
  const { fail, markdown } = dangerJS
  const failedVersionConstraints: FailedConstraintsExplanation[] = []

  const dependencyPackageIds = getRuntimeDependencies('react')
  const versionConstraints = await getVersionConstrains(paths.packages('react', 'package.json'))

  dependencyPackageIds.forEach(packageId => {
    const verdict = checkPackageVersionConstraints(
      packageId,
      versionConstraints[getPackageName(packageId)] || [],
    )

    if (!verdict.isApproved) {
      failedVersionConstraints.push(verdict.explain)
    }
  })

  if (failedVersionConstraints.length) {
    markdown(
      [
        '## Non-approved dependencies are detected.',
        'The following package version constraints missing approved candidate:',
        '',
        'failed constrains | approved candidates',
        '--- | --- ',

        failedVersionConstraints.map(
          explanation =>
            `${explanation.failedConstraints.join(', ')} | ${
              explanation.approvedPackages.length
                ? explanation.approvedPackages.join(', ')
                : '_there are no any approved packages_'
            }`,
        ),
      ].join('\n'),
    )

    fail(
      'Non-approved dependencies were detected. It is necessary to obtain approvals and register them in `approvedPackages` file before merge.',
    )
  }
}

export default detectNonApprovedDependencies
