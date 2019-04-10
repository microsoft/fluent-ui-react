import { StaticStyleFunction } from '../../types'

const globalStyles: StaticStyleFunction = siteVars => ({
  body: {
    padding: siteVars.bodyPadding,
    margin: siteVars.bodyMargin,
    fontFamily: siteVars.bodyFontFamily,
    fontSize: siteVars.bodyFontSize,
    lineHeight: siteVars.bodyLineHeight,
  },
  '*': {
    boxSizing: 'border-box',
  },
  '*:before': {
    boxSizing: 'border-box',
  },
  '*:after': {
    boxSizing: 'border-box',
  },
})

export default globalStyles
