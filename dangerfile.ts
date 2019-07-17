// danger, fail, markdown
import { fail } from 'danger'
import checkChangelog from './dangerCheckChangelog'
import detectChangedDependencies from './dangerDetectChangedDependencies'

export default async () => {
  /* === CHANGELOG ==================================================================================================== */
  await checkChangelog()

  /* === Package dependencies ========================================================================================= */
  await detectChangedDependencies()

  fail('This is why the build is failed.')
}
