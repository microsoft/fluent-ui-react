import { ICSSInJSStyle } from '../../../types'
import { getColorScheme } from '../../colors'

const toolbarMenuItemStyles = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const { disabled, isFromKeyboard } = p
    const colors = getColorScheme(v.colorScheme)

    return {
      color: v.menuItemForeground || colors.foreground1,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      display: 'flex',
      alignItems: 'center',
      padding: v.menuItemPadding,
      cursor: 'pointer',

      ':focus': {
        outline: 0,
      },

      ':hover': {
        color: v.menuItemForegroundHover || colors.menuItemForegroundHover,
        backgroundColor: v.menuItemBackgroundHover || colors.menuItemBackgroundHover,
      },

      ...(isFromKeyboard && {
        color: v.menuItemForegroundFocus || colors.menuItemForegroundFocus,
        backgroundColor: v.menuItemBackgroundFocus || colors.menuItemBackgroundFocus,
      }),

      ...(disabled && {
        cursor: 'default',
        color: v.menuItemForegroundDisabled || colors.foregroundDisabled1,
        backgroundColor: v.menuItemBackgroundDisabled,
        ':hover': {
          // empty to overwrite all existing hover styles
        },
      }),
    }
  },

  wrapper: {
    display: 'block',
  },
}

export default toolbarMenuItemStyles
