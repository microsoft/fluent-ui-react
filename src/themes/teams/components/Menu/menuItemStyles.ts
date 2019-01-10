import * as _ from 'lodash'

import { getColorSchemeFn } from '../../../../lib'
import { pxToRem, getSideArrow } from '../../utils'
import { ComponentSlotStyleFunction, ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables, MenuColorScheme } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState
type GetColorFn = (area: keyof MenuColorScheme, defaultColor: string) => string

const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const getActionStyles = ({
  props: { primary, underlined, iconOnly },
  variables: v,
  colorVariable,
  getColor,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colorVariable: string
  getColor: GetColorFn
}): ICSSInJSStyle =>
  underlined || iconOnly
    ? {
        color: colorVariable,
        background: v.backgroundColor,
      }
    : {
        color: getColor('foreground', primary ? v.primaryActiveColor : colorVariable),
        background: getColor(
          'background',
          primary ? v.primaryActiveBackgroundColor : v.activeBackgroundColor,
        ),
      }

const getFocusedStyles = ({
  props,
  variables: v,
  colorVariable,
  getColor,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  colorVariable: string
  getColor: GetColorFn
}): ICSSInJSStyle => {
  const { primary, underlined, iconOnly, isFromKeyboard, active } = props
  if (active && !underlined) return {}

  const { color, background } =
    (underlined && !isFromKeyboard) || iconOnly
      ? {
          color: colorVariable,
          background: v.backgroundColor,
        }
      : primary
      ? {
          color: v.primaryFocusedColor,
          background: v.primaryFocusedBackgroundColor,
        }
      : {
          color: colorVariable,
          background: v.focusedBackgroundColor,
        }

  return { color: getColor('foreground', color), background: getColor('hover', background) }
}

const itemSeparator: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
}): ICSSInJSStyle => {
  const { color, iconOnly, pointing, pills, primary, underlined, vertical } = props
  const getColor = getColorSchemeFn<MenuColorScheme>(color, v.colorScheme)

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
        backgroundColor: getColor('background', primary ? v.primaryBorderColor : v.borderColor),
        ...(vertical ? { width: '100%', height: '1px' } : { width: '1px', height: '100%' }),
      },
    }
  )
}

const pointingBeak: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
}): ICSSInJSStyle => {
  const { color, pointing, primary } = props
  const getColor = getColorSchemeFn<MenuColorScheme>(color, v.colorScheme)
  const backgroundColor = getColor(
    'background',
    primary ? v.primaryActiveBackgroundColor : v.activeBackgroundColor,
  )
  const borderValue = `1px solid ${getColor(
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
  wrapper: ({ props, variables: v, theme }): ICSSInJSStyle => {
    const {
      active,
      color,
      iconOnly,
      isFromKeyboard,
      pills,
      pointing,
      secondary,
      underlined,
      vertical,
    } = props

    const getColor = getColorSchemeFn<MenuColorScheme>(color, v.colorScheme)

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

      ...itemSeparator({ props, variables: v, theme }),

      // active styles
      ...(active && {
        ...getActionStyles({ props, variables: v, colorVariable: v.color, getColor }),

        ...(pointing &&
          (vertical
            ? pointing === 'end'
              ? {
                  borderRight: `${pxToRem(3)} solid ${getColor(
                    'background',
                    v.primaryActiveBorderColor,
                  )}`,
                }
              : {
                  borderLeft: `${pxToRem(3)} solid ${getColor(
                    'background',
                    v.primaryActiveBorderColor,
                  )}`,
                }
            : pointingBeak({ props, variables: v, theme }))),
      }),

      // focus styles
      ...(isFromKeyboard &&
        getFocusedStyles({ props, variables: v, colorVariable: v.activeColor, getColor })),

      // hover styles
      ':hover': getFocusedStyles({ props, variables: v, colorVariable: v.activeColor, getColor }),

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

  root: ({ props, variables: v, theme }): ICSSInJSStyle => {
    const {
      active,
      color,
      iconOnly,
      isFromKeyboard,
      pointing,
      primary,
      underlined,
      vertical,
    } = props
    const getColor = getColorSchemeFn<MenuColorScheme>(color, v.colorScheme)
    const { arrowDown } = theme.siteVariables
    const sideArrow = getSideArrow(theme)

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
              ...(iconOnly && { color: getColor('foreground', v.primaryActiveBorderColor) }),

              ...(underlined && {
                color: getColor('foreground', v.primaryActiveBorderColor),
                ...underlinedItem(getColor('border', v.primaryActiveBorderColor)),
              }),
            }
          : underlined && {
              fontWeight: 700,
              ...underlinedItem(getColor('border', v.activeColor)),
            })),

      // focus styles
      ...(isFromKeyboard && {
        ...(primary
          ? {
              ...(iconOnly && {
                color: getColor('foreground', v.primaryActiveBorderColor),
                border: `1px solid ${getColor('border', v.primaryActiveBorderColor)}`,
                borderRadius: v.circularRadius,
              }),

              ...(underlined && { color: getColor('foreground', v.primaryActiveColor) }),

              ...(underlined && active && underlinedItem(getColor('border', v.primaryActiveColor))),
            }
          : {
              ...(iconOnly && {
                border: `1px solid ${getColor('border', v.activeColor)}`,
                borderRadius: v.circularRadius,
              }),

              ...(underlined && { fontWeight: 700 }),

              ...(underlined && active && underlinedItem(getColor('border', v.activeColor))),
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
              ...(iconOnly && { color: v.primaryActiveBorderColor }),
              ...(!active && underlined && underlinedItem(v.primaryHoverBorderColor as string)),
            }
          : !active && underlined && underlinedItem(v.activeBackgroundColor)),
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
