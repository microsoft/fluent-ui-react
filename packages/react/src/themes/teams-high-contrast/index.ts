import mergeThemes from '../../lib/mergeThemes'
import * as siteVariables from './siteVariables'
import * as componentVariables from './componentVariables'
import * as componentStyles from './componentStyles'
import teams from '../teams'
import { createTheme } from '../createTheme'
import menuItemStyles from './components/Menu/menuItemStyles'
import menuItemWrapperStyles from './components/Menu/menuItemWrapperStyles'

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
        MenuItemWrapper: menuItemWrapperStyles,
      },
    },
    'teams-high-contrast',
  ),
)
