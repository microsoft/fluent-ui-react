import mergeThemes from '../../lib/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import teams from '../teams'
import { createTheme } from '../createTheme'
import menuItemStyles from './components/Menu/menuItemStyles'

export default mergeThemes(
  teams,
  createTheme(
    {
      name: 'teams-high-contrast',
      siteVariables,
      componentVariables,
      componentStyles,
      componentSelectorStyles: {
        Menu: v => ({}),
        MenuItem: menuItemStyles,
        MenuDivider: v => ({}),
      },
    },
    'teams-high-contrast',
  ),
)
