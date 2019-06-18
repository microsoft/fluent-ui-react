import { toSCSS } from './compile'
// import { ThemeInput } from '@stardust-ui/react/src'
// import resolveComponentRules from '@stardust-ui/react/src/lib/resolveComponentRules'
import * as stardust from '../react'

console.clear()

console.log('='.repeat(80))
console.time('compile theme:')

const theme = {
  siteVariables: {
    brandColor: 'cornflowerblue',
    ...stardust.themes.base.siteVariables,
  },

  componentVariables: {
    Button: () => ({}),
    ...stardust.themes.base.componentVariables,
  },

  componentStyles: {
    Button: props => ({
      root: [[{}, { display: 'inline-block' }]],
    }),
    ...stardust.themes.base.componentStyles,
  },
}

const scss = toSCSS(theme, {
  name: 'Stardust UI',
  version: '1.0.0',
  gitHubURL: 'https://github.com/stardust-ui',
  npmURL: 'https://npmjs.com/@stardust-ui',
  docsURL: 'https://stardust-ui.github.io',
})

console.log(scss)
console.timeEnd('compile theme:')
