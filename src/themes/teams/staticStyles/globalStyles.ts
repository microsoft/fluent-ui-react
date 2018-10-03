import { StaticStyleFunction } from '../../../../types/theme'

const globalStyles: StaticStyleFunction = siteVars => ({
  html: {
    fontSize: siteVars.htmlFontSize,
  },
  body: {
    background: siteVars.bodyBackground,
    color: siteVars.bodyColor,
    padding: siteVars.bodyPadding,
    margin: siteVars.bodyMargin,
    fontFamily: siteVars.bodyFontFamily,
    fontSize: siteVars.bodyFontSize,
    lineHeight: siteVars.bodyLineHeight,
  },
})

export default globalStyles
