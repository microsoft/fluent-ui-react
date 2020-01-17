import {
  getFailedPackageVersionConstraints,
  getVersionConstrains,
  getRuntimeDependencies,
  getPackageName,
  FailedConstraintsExplanation,
} from './utils'
import config from '../../config'
import { DangerJS } from '../types'

const { paths } = config

/**
 * This check uses the following logic:
 * - request runtime dependencies of @fluentui/react package (by crawling the code, starting from index file),
 * - for each of the runtime dependencies:
 *    - get corresponding set of version restrictions (by analyzing related package.json files),
 *    - get list of approved dependency's versions,
 *    - check if list of approved versions covers the set of version restrictions.
 */
const detectNonApprovedDependencies = async (dangerJS: DangerJS) => {
  const { fail, markdown } = dangerJS
  const allFailedVersionConstraints: FailedConstraintsExplanation[] = []

  const dependencyPackageIds = getRuntimeDependencies('react')
  const versionConstraints = await getVersionConstrains(paths.packages('react', 'package.json'))

  dependencyPackageIds.forEach(packageId => {
    const failedPackageVersionConstraints = getFailedPackageVersionConstraints(
      packageId,
      versionConstraints[getPackageName(packageId)] || [],
    )

    if (failedPackageVersionConstraints) {
      allFailedVersionConstraints.push(failedPackageVersionConstraints)
    }
  })

  if (allFailedVersionConstraints.length) {
    markdown(
      [
        '## Non-approved dependencies are detected.',
        'The following package version constraints missing approved candidate:',
        '',
        'failed constrains | approved candidates',
        '--- | --- ',

        allFailedVersionConstraints
          .map(
            explanation =>
              `${explanation.failedConstraints.join(', ')} | ${
                explanation.approvedPackages.length
                  ? explanation.approvedPackages.join(', ')
                  : '_there are no any approved packages_'
              }`,
          )
          .join('\n'),
      ].join('\n'),
    )

    fail(
      'Non-approved dependencies were detected. It is necessary to obtain approvals and register them in `approvedPackages` file before merge.',
    )
  }
}

export default detectNonApprovedDependencies
