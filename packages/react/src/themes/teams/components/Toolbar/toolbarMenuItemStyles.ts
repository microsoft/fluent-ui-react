import { ICSSInJSStyle } from '../../../types'
import { getColorScheme } from '../../colors'
import { pxToRem } from '../../../../lib'

const toolbarMenuItemStyles = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const colors = getColorScheme(v.colorScheme)

    return {
      color: v.menuItemForeground || colors.foreground1,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: '100%',
      padding: v.menuItemPadding,
      cursor: 'pointer',

      ':focus': {
        outline: 0,
      },

      ':hover': {
        color: v.menuItemForegroundHover || colors.menuItemForegroundHover,
        backgroundColor: v.menuItemBackgroundHover || colors.menuItemBackgroundHover,
      },

      ':focus-visible': {
        color: v.menuItemForegroundFocus || colors.menuItemForegroundFocus,
        backgroundColor: v.menuItemBackgroundFocus || colors.menuItemBackgroundFocus,
      },

      ...(p.disabled && {
        cursor: 'default',
        color: v.menuItemForegroundDisabled || colors.foregroundDisabled1,
        backgroundColor: v.menuItemBackgroundDisabled,
        ':hover': {
          // empty to overwrite all existing hover styles
        },
      }),
    }
  },

  checkedIndicator: ({ variables: v }) => ({
    float: 'right',
    position: 'fixed',
    right: pxToRem(7),
  }),

  wrapper: () => ({
    display: 'block',
  }),
}

export default toolbarMenuItemStyles
