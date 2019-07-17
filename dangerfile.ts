// danger, fail, markdown
import { fail } from 'danger'
import checkChangelog from './build/dangerjs/checkChangelog'
import detectChangedDependencies from './build/dangerjs/detectChangedDependencies'
import detectNonApprovedDependencies from './build/dangerjs/detectNonApprovedDependencies'

export default async () => {
  await checkChangelog()
  await detectChangedDependencies()
  await detectNonApprovedDependencies()

  fail('This is why the build is failed.')
}
