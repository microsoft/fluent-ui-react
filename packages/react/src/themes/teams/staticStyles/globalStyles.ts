import { StaticStyleFunction } from '../../types'

const globalStyles: StaticStyleFunction = siteVars => ({
  body: {
    padding: siteVars.bodyPadding,
    margin: siteVars.bodyMargin,
    fontFamily: siteVars.bodyFontFamily,
    fontSize: siteVars.bodyFontSize,
    lineHeight: siteVars.bodyLineHeight,
  },
})

export default globalStyles
