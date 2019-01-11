import * as _ from 'lodash'

import { getSideArrow } from '../../utils'
import { pxToRem, getColorFromScheme } from '../../../../lib'
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
  props: { primary, underlined, iconOnly, pointing, vertical },
  variables: v,
  colorVariable,
  colors,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colorVariable: string
  colors: Partial<ColorScheme>
}): ICSSInJSStyle =>
  underlined || iconOnly
    ? {
        color: colorVariable,
        background: v.backgroundColor,
      }
    : pointing && vertical
    ? { background: v.activeBackgroundColor }
    : primary
    ? {
        color: getColorFromScheme(colors, 'foreground', v.primaryActiveColor),
        background: getColorFromScheme(colors, 'background', v.primaryActiveBackgroundColor),
      }
    : {
        color: getColorFromScheme(colors, 'foreground', colorVariable),
        background: getColorFromScheme(colors, 'background', v.activeBackgroundColor),
      }

const getFocusedStyles = ({
  props,
  variables: v,
  colors,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colors: Partial<ColorScheme>
}): ICSSInJSStyle => {
  const { primary, underlined, iconOnly, isFromKeyboard, active, pointing, vertical } = props
  if (active && !underlined) return {}

  return (underlined && !isFromKeyboard) || iconOnly
    ? {
        color: v.activeColor,
        background: v.backgroundColor,
      }
    : pointing && vertical
    ? { background: v.focusedBackgroundColor }
    : primary
    ? {
        color: getColorFromScheme(colors, 'foreground', v.primaryFocusedColor),
        background: getColorFromScheme(
          colors,
          'lighterBackground',
          v.primaryFocusedBackgroundColor,
        ),
      }
    : {
        color: getColorFromScheme(colors, 'foreground', v.activeColor),
        background: getColorFromScheme(colors, 'lighterBackground', v.focusedBackgroundColor),
      }
}

const itemSeparator: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
  colors,
}): ICSSInJSStyle => {
  const { iconOnly, pointing, pills, primary, underlined, vertical } = props

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
        background: getColorFromScheme(
          colors,
          'background',
          primary ? v.primaryBorderColor : v.borderColor,
        ),
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
  const { pointing, primary } = props
  const backgroundColor = getColorFromScheme(
    colors,
    'background',
    primary ? v.primaryActiveBackgroundColor : v.activeBackgroundColor,
  )
  const borderValue = `1px solid ${getColorFromScheme(
    colors,
    'background',
    primary ? v.primaryBorderColor : v.borderColor,
  )}`

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
      background: backgroundColor,
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
      iconOnly,
      isFromKeyboard,
      pills,
      pointing,
      primary,
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

      ...(iconOnly && {
        display: 'flex',
      }),

      ...itemSeparator({ props, variables: v, theme, colors }),

      // active styles
      ...(active && {
        ...getActionStyles({ props, variables: v, colorVariable: v.color, colors }),

        ...(pointing &&
          (vertical
            ? {
                [pointing === 'end' ? 'borderRight' : 'borderLeft']: `${pxToRem(
                  3,
                )} solid ${getColorFromScheme(
                  colors,
                  'background',
                  primary ? v.primaryActiveBorderColor : v.activeColor,
                )}`,
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
    }
  },

  root: ({ props, variables: v, theme, colors }): ICSSInJSStyle => {
    const { active, iconOnly, isFromKeyboard, pointing, primary, underlined, vertical } = props
    const { arrowDown } = theme.siteVariables
    const sideArrow = getSideArrow(theme)
    const iconOnlyColor = getColorFromScheme(colors, 'background', v.activeColor)
    const iconOnlyColorPrimary = getColorFromScheme(
      colors,
      'background',
      v.primaryActiveBorderColor,
    )

    return {
      color: 'inherit',
      display: 'block',
      cursor: 'pointer',

      ...(((pointing && vertical) || iconOnly) && { border: '1px solid transparent' }),

      ...(underlined
        ? { padding: `${pxToRem(4)} 0` }
        : pointing && vertical
        ? { padding: `${pxToRem(8)} ${pxToRem(18)}` }
        : { padding: `${pxToRem(14)} ${pxToRem(18)}` }),

      ...(iconOnly && {
        padding: pxToRem(8),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      // active styles
      ...(active &&
        (primary
          ? {
              ...(iconOnly && { color: iconOnlyColorPrimary }),
              ...(underlined && {
                color: v.primaryActiveBorderColor,
                ...underlinedItem(getColorFromScheme(colors, 'border', v.primaryActiveBorderColor)),
              }),
            }
          : {
              ...(iconOnly && { color: iconOnlyColor }),
              ...(underlined && {
                fontWeight: 700,
                ...underlinedItem(getColorFromScheme(colors, 'border', v.activeColor)),
              }),
            })),

      // focus styles
      ...(isFromKeyboard && {
        ...(primary
          ? {
              ...(iconOnly && {
                color: iconOnlyColorPrimary,
                border: `1px solid ${iconOnlyColorPrimary}`,
                borderRadius: v.circularRadius,
              }),
              ...(underlined && {
                color: getColorFromScheme(colors, 'foreground', v.primaryActiveColor),
              }),
              ...(underlined &&
                active &&
                underlinedItem(getColorFromScheme(colors, 'border', v.primaryActiveColor))),
            }
          : {
              ...(iconOnly && {
                color: iconOnlyColorPrimary,
                border: `1px solid ${iconOnlyColor}`,
                borderRadius: v.circularRadius,
              }),
              ...(underlined && { fontWeight: 700 }),
              ...(underlined &&
                active &&
                underlinedItem(getColorFromScheme(colors, 'border', v.activeColor))),
            }),
      }),

      ':focus': {
        outline: 0,
      },

      // hover styles
      ':hover': {
        color: 'inherit',

        ...(primary
          ? {
              ...(iconOnly && { color: iconOnlyColorPrimary }),
              ...(!active && underlined && underlinedItem(v.primaryHoverBorderColor as string)),
            }
          : {
              ...(iconOnly && { color: iconOnlyColor }),
              ...(!active && underlined && underlinedItem(v.activeBackgroundColor)),
            }),
      },

      '::after': {
        ...(props.menu && {
          position: 'relative',
          float: 'right',
          left: pxToRem(10),
          userSelect: 'none',
          content: props.vertical ? `"${sideArrow}"` : `"${arrowDown}"`,
        }),
      },
    }
  },

  menu: ({ props: { vertical } }) => ({
    zIndex: '1000',
    position: 'absolute',
    top: vertical ? '0' : '100%',
    left: vertical ? '100%' : '0',
  }),
}

export default menuItemStyles
