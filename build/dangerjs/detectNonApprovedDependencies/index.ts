import { isApproved, getDependencyPackageIds } from './utils'

const detectNonApprovedDependencies = dangerJS => {
  const { fail } = dangerJS
  const nonApprovedPackages: string[] = []

  const dependencyPackageIds = getDependencyPackageIds()

  dependencyPackageIds.forEach(packageId => {
    if (!isApproved(packageId)) {
      nonApprovedPackages.push(packageId)
    }
  })

  if (nonApprovedPackages.length) {
    fail(`The following packages lack approval: ${nonApprovedPackages.join(', ')}`)
  }
}

export default detectNonApprovedDependencies
