import * as _ from 'lodash'

import { pxToRem } from '../../../../lib'
import {
  ComponentSlotStyleFunction,
  ComponentSlotStylesInput,
  ICSSInJSStyle,
  ColorScheme,
} from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const getActionStyles = ({
  props: { underlined, iconOnly, pointing, vertical },
  variables: v,
  colors,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colors: ColorScheme
}): ICSSInJSStyle => {
  if (underlined || iconOnly) {
    return { color: v.color }
  }

  if (pointing && vertical) {
    return { background: v.activeBackgroundColor }
  }

  return {
    color: colors.foreground.active,
    background: colors.background.active,
  }
}

const getFocusedStyles = ({
  props,
  variables: v,
  colors,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colors: ColorScheme
}): ICSSInJSStyle => {
  const { iconOnly, underlined, isFromKeyboard, active, pointing, vertical } = props

  if (iconOnly) {
    return { color: colors.border.focused }
  }

  if (active && !underlined) return {}

  if (underlined && !isFromKeyboard) {
    return { color: v.focusedColor }
  }

  if (pointing && vertical) {
    return { background: v.focusedBackgroundColor }
  }

  return {
    color: colors.foreground.focused,
    background: colors.background.focused,
  }
}

const itemSeparator: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
  colors,
}): ICSSInJSStyle => {
  const { iconOnly, pointing, pills, underlined, vertical } = props

  return (
    !pills &&
    !underlined &&
    !(pointing && vertical) &&
    !iconOnly && {
      '::before': {
        position: 'absolute',
        content: '""',
        top: 0,
        right: 0,
        background: colors.border.initial,
        ...(vertical ? { width: '100%', height: '1px' } : { width: '1px', height: '100%' }),
      },
    }
  )
}

const pointingBeak: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
  colors,
}): ICSSInJSStyle => {
  const { pointing } = props
  const borderValue = `1px solid ${colors.border.initial}`

  const { top, borders }: { top: string; borders: ICSSInJSStyle } =
    pointing === 'start'
      ? {
          top: '-1px', // 1px for the border
          borders: {
            borderTop: borderValue,
            borderLeft: borderValue,
          },
        }
      : {
          top: '100%',
          borders: {
            borderBottom: borderValue,
            borderRight: borderValue,
          },
        }

  return {
    '::after': {
      visibility: 'visible',
      background: colors.background.active,
      position: 'absolute',
      content: '""',
      top,
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%) rotate(45deg)',
      margin: '.5px 0 0',
      width: pxToRem(10),
      height: pxToRem(10),
      border: 'none',
      ...borders,
      zIndex: 2,
      transition: 'background .1s ease',
    },
  }
}

const menuItemStyles: ComponentSlotStylesInput<MenuItemPropsAndState, MenuVariables> = {
  wrapper: ({ props, variables: v, theme, colors }): ICSSInJSStyle => {
    const {
      active,
      disabled,
      iconOnly,
      isFromKeyboard,
      pills,
      pointing,
      secondary,
      underlined,
      vertical,
    } = props

    return {
      color: v.color,
      background: v.backgroundColor,
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      display: 'block',

      ...(secondary && {
        background: 'salmon',
      }),

      ...(pills && {
        ...(vertical ? { margin: `0 0 ${pxToRem(5)} 0` } : { margin: `0 ${pxToRem(8)} 0 0` }),
        borderRadius: pxToRem(5),
      }),

      ...(underlined && {
        display: 'flex',
        alignItems: 'center',
        height: pxToRem(29),
        lineHeight: v.lineHeightBase,
        padding: `0 ${pxToRem(4)}`,
        margin: `0 ${pxToRem(4)} 0 0`,
        ':nth-child(n+2)': {
          marginLeft: `${pxToRem(4)}`,
        },
        boxShadow: 'none',
      }),

      ...(pointing &&
        vertical && {
          borderTopLeftRadius: `${pxToRem(3)}`,
          borderTopRightRadius: `${pxToRem(3)}`,
          ...(pointing === 'end'
            ? { borderRight: `${pxToRem(3)} solid transparent` }
            : { borderLeft: `${pxToRem(3)} solid transparent` }),
          marginBottom: `${pxToRem(12)}`,
        }),

      ...itemSeparator({ props, variables: v, theme, colors }),

      // active styles
      ...(active && {
        ...getActionStyles({ props, variables: v, colors }),

        ...(pointing &&
          (vertical
            ? {
                [pointing === 'end' ? 'borderRight' : 'borderLeft']: `${pxToRem(3)} solid ${
                  colors.border.active
                }`,
              }
            : pointingBeak({ props, variables: v, theme, colors }))),
      }),

      // focus styles
      ...(isFromKeyboard && getFocusedStyles({ props, variables: v, colors })),

      // hover styles
      ':hover': getFocusedStyles({ props, variables: v, colors }),

      ':first-child': {
        ...(!pills &&
          !iconOnly &&
          !(pointing && vertical) &&
          !underlined && {
            ...(vertical && {
              borderTopRightRadius: pxToRem(3),
              borderTopLeftRadius: pxToRem(3),
              '::before': {
                display: 'none',
              },
            }),
            ...(!vertical && {
              borderBottomLeftRadius: pxToRem(3),
              borderTopLeftRadius: pxToRem(3),
            }),
          }),
      },

      ':last-child': {
        ...(!pills &&
          !iconOnly &&
          !(pointing && vertical) &&
          !underlined && {
            ...(vertical && {
              borderBottomRightRadius: pxToRem(3),
              borderBottomLeftRadius: pxToRem(3),
            }),
          }),
      },

      ...(disabled && {
        color: v.disabledColor,
        ':hover': {
          // empty - overwrite all existing hover styles
        },
      }),
    }
  },

  root: ({ props, variables: v, colors }): ICSSInJSStyle => {
    const { active, iconOnly, isFromKeyboard, pointing, underlined, vertical, disabled } = props

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',

      ...(pointing &&
        vertical && {
          border: '1px solid transparent',
        }),

      ...(iconOnly && {
        border: `${pxToRem(2)} solid transparent`,
      }),

      ...(underlined
        ? { padding: `${pxToRem(4)} 0` }
        : pointing && vertical
        ? { padding: `${pxToRem(8)} ${pxToRem(18)}` }
        : { padding: `${pxToRem(14)} ${pxToRem(18)}` }),

      ...(iconOnly && {
        margin: pxToRem(1),
        padding: pxToRem(5), // padding works this way to get the border to only be 30x30px on focus which is the current design
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      // active styles
      ...(active && {
        ...(iconOnly && { color: colors.border.active }),
        ...(underlined && {
          color: colors.border.active,
          ...underlinedItem(colors.border.active),
        }),
      }),

      // focus styles
      ...(isFromKeyboard && {
        ...(iconOnly && {
          borderColor: colors.border.focused,
          borderRadius: '50%',
          '& .ui-icon__filled': {
            display: 'block',
          },

          '& .ui-icon__outline': {
            display: 'none',
          },
        }),

        ...(underlined && {
          color: colors.foreground.active,
          ...(active && underlinedItem(colors.foreground.active)),
        }),
      }),

      ':focus': {
        outline: 0,
      },

      // hover styles
      ':hover': {
        color: 'inherit',

        ...(iconOnly && {
          color: colors.border.active,

          '& .ui-icon__filled': {
            display: 'block',
          },

          '& .ui-icon__outline': {
            display: 'none',
          },
        }),

        ...(!active && underlined && underlinedItem(v.borderColor as string)),
      },

      ...(disabled && {
        cursor: 'default',
        ':hover': {
          // reset all existing hover styles
          color: 'inherit',
        },
      }),
    }
  },

  menu: ({ props: { vertical } }) => ({
    zIndex: '1000',
    position: 'absolute',
    top: vertical ? '0' : '100%',
    left: vertical ? '100%' : '0',
  }),

  indicator: () => ({
    position: 'relative',
    float: 'right',
    left: pxToRem(10),
    userSelect: 'none',
  }),
}

export default menuItemStyles
