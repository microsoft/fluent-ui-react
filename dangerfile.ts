import { danger, fail, warn, markdown } from 'danger'
import checkChangelog from './build/dangerjs/checkChangelog'
import detectChangedDependencies from './build/dangerjs/detectChangedDependencies'
import detectNonApprovedDependencies from './build/dangerjs/detectNonApprovedDependencies'

export default async () => {
  await checkChangelog({ danger, fail, warn })
  await detectChangedDependencies({ danger, markdown, warn })
  await detectNonApprovedDependencies({ fail, markdown })
}
