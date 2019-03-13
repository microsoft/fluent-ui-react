import { ComponentName } from '@stardust-ui/react'
import { PartialRecord } from 'src/types'

const screenshotTestsConfig: PartialRecord<ComponentName, ScreenerTestsConfig> = {}
const componentNames: ComponentName[] = ['List', 'Menu', 'Portal']

componentNames.forEach(
  name => (screenshotTestsConfig[name] = require(`./${name}`).default as ScreenerTestsConfig),
)

export default screenshotTestsConfig
