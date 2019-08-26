import { ThemePrepared } from '../themes/types'

const createEmptyTheme = (): ThemePrepared => ({
  siteVariables: {
    fontSizes: {},
  },
  componentVariables: {},
  componentStyles: {},
  fontFaces: [],
  staticStyles: [],
  icons: {},
  animations: {},
})

export default createEmptyTheme
