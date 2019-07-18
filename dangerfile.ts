import { danger, fail, warn, markdown } from 'danger'
import checkChangelog from './build/dangerjs/checkChangelog'
import detectChangedDependencies from './build/dangerjs/detectChangedDependencies'
import detectNonApprovedDependencies from './build/dangerjs/detectNonApprovedDependencies'

const dangerJS = { danger, fail, warn, markdown }

export default async () => {
  await checkChangelog(dangerJS)
  await detectChangedDependencies(dangerJS)
  await detectNonApprovedDependencies(dangerJS)
}
