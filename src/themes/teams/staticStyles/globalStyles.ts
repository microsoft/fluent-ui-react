const globalStyles = siteVars => ({
  html: {
    fontSize: siteVars.htmlFontSize,
  },
  body: {
    padding: siteVars.bodyPadding,
    margin: siteVars.bodyMargin,
    fontFamily: siteVars.bodyFontFamily,
    fontSize: siteVars.bodyFontSize,
    lineHeight: siteVars.lineHeightBase,
  },
})

export default globalStyles
