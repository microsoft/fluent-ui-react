import { pxToRem } from '../../../../lib'
import { ComponentSlotStyleFunction, ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'
import { teamsIconClassNames } from '../Icon/svg'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

export const verticalPillsBottomMargin = pxToRem(5)
export const horizontalPillsRightMargin = pxToRem(8)
export const verticalPointingBottomMargin = pxToRem(12)

const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const getActionStyles = ({
  props: { primary, underlined, iconOnly },
  variables: v,
  color,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  color: string
}): ICSSInJSStyle =>
  underlined || iconOnly
    ? {
        color,
      }
    : primary
    ? {
        color: v.primaryActiveColor,
        background: v.primaryActiveBackgroundColor,
      }
    : {
        color,
        background: v.activeBackgroundColor,
      }

const getFocusedStyles = ({
  props,
  variables: v,
  color,
}: {
  props: MenuItemPropsAndState
  variables: MenuVariables
  color: string
}): ICSSInJSStyle => {
  const { primary, underlined, isFromKeyboard, active, vertical } = props
  if (active && !underlined && !vertical) return {}
  return {
    ...(underlined && !isFromKeyboard
      ? {
          color,
        }
      : primary
      ? {
          color: v.primaryFocusedColor,
          background: v.primaryFocusedBackgroundColor,
        }
      : {
          color,
          background: v.hoverBackgroundColor,
        }),

    ...(vertical && isFromKeyboard && !primary
      ? {
          border: v.focusedBorder,
          outline: v.focusedOutline,
          margin: pxToRem(1),
          background: v.focusedBackgroundColor,
        }
      : {}),
  }
}

const pointingBeak: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
}): ICSSInJSStyle => {
  const { pointing, primary } = props

  let backgroundColor: string
  let borderColor: string
  let top: string
  let borders: ICSSInJSStyle

  if (primary) {
    backgroundColor = v.primaryActiveBackgroundColor
    borderColor = v.primaryBorderColor
  } else {
    backgroundColor = v.activeBackgroundColor
    borderColor = v.borderColor
  }

  if (pointing === 'start') {
    borders = {
      borderTop: `1px solid ${borderColor}`,
      borderLeft: `1px solid ${borderColor}`,
    }
    top = '-1px' // 1px for the border
  } else {
    borders = {
      borderBottom: `1px solid ${borderColor}`,
      borderRight: `1px solid ${borderColor}`,
    }
    top = '100%'
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
      disabled,
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
      lineHeight: 1,
      position: 'relative',
      verticalAlign: 'middle',
      display: 'block',

      ...(secondary && {
        background: 'salmon',
      }),

      ...(vertical && {
        border: v.verticalItemBorder,
      }),

      ...(pills && {
        ...(vertical
          ? { margin: `0 0 ${verticalPillsBottomMargin} 0` }
          : { margin: `0 ${horizontalPillsRightMargin} 0 0` }),
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

      // item separator
      ...(!vertical &&
        !pills &&
        !underlined &&
        !iconOnly && {
          boxShadow: `-1px 0 0 0 ${primary ? v.primaryBorderColor : v.borderColor} inset`,
        }),

      // active styles
      ...(active && {
        ...getActionStyles({ props, variables: v, color: v.color }),

        ...(pointing &&
          vertical &&
          !isFromKeyboard && {
            '::before': {
              content: `''`,
              position: 'absolute',
              width: pxToRem(3),
              height: `calc(100% + ${pxToRem(4)})`,
              top: pxToRem(-2),
              backgroundColor: v.pointingIndicatorBackgroundColor,
              ...(pointing === 'end' ? { right: pxToRem(-2) } : { left: pxToRem(-2) }),
            },
          }),

        ...(pointing &&
          !vertical && {
            ...pointingBeak({ props, variables: v, theme, colors }),
          }),
      }),

      ...(iconOnly && {
        display: 'flex',

        // focus styles
        ...(isFromKeyboard && {
          color: v.iconOnlyActiveColor,
        }),

        // hover styles
        ':hover': {
          color: v.iconOnlyActiveColor,
        },
      }),

      ...(!iconOnly && {
        // focus styles
        ...(isFromKeyboard && getFocusedStyles({ props, variables: v, color: v.activeColor })),

        // hover styles
        ':hover': getFocusedStyles({ props, variables: v, color: v.activeColor }),
      }),

      ':first-child': {
        ...(!pills &&
          !iconOnly &&
          !(pointing && vertical) &&
          !underlined && {
            ...(vertical && {
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

      ...(disabled && {
        color: v.disabledColor,
        ':hover': {
          // empty - overwrite all existing hover styles
        },
      }),
    }
  },

  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    const {
      active,
      iconOnly,
      isFromKeyboard,
      pointing,
      primary,
      underlined,
      vertical,
      disabled,
    } = p

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
        : vertical
        ? { padding: v.verticalItemPadding }
        : {
            padding: v.horizontalPadding,
          }),

      ...(iconOnly && {
        margin: pxToRem(1),
        padding: pxToRem(5), // padding works this way to get the border to only be 30x30px on focus which is the current design
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }),

      // active styles
      ...(active &&
        (primary
          ? {
              ...(iconOnly && { color: v.primaryActiveBorderColor }),

              ...(underlined && {
                color: v.primaryActiveBorderColor,
                ...underlinedItem(v.primaryActiveBorderColor),
              }),
            }
          : underlined && {
              fontWeight: 700,
              ...underlinedItem(v.activeColor),
            })),

      // focus styles
      ...(isFromKeyboard && {
        ...(iconOnly && {
          borderRadius: '50%',
          borderColor: v.iconOnlyActiveColor,

          [`& .${teamsIconClassNames.filled}`]: {
            display: 'block',
          },

          [`& .${teamsIconClassNames.outline}`]: {
            display: 'none',
          },
        }),

        ...(primary
          ? {
              ...(iconOnly && {
                color: v.primaryActiveBorderColor,
                borderColor: v.primaryActiveBorderColor,
              }),

              ...(underlined && { color: v.primaryActiveColor }),

              ...(underlined && active && underlinedItem(v.primaryActiveColor)),
            }
          : {
              ...(underlined && { fontWeight: 700 }),

              ...(underlined && active && underlinedItem(v.activeColor)),
            }),
      }),

      ':focus': {
        outline: 0,
      },

      // hover styles
      ':hover': {
        color: 'inherit',

        ...(iconOnly && {
          [`& .${teamsIconClassNames.filled}`]: {
            display: 'block',
          },

          [`& .${teamsIconClassNames.outline}`]: {
            display: 'none',
          },
        }),

        ...(primary
          ? {
              ...(iconOnly && { color: v.primaryActiveBorderColor }),
              ...(!active && underlined && underlinedItem(v.primaryHoverBorderColor as string)),
            }
          : !active && underlined && underlinedItem(v.activeBackgroundColor)),
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

  menu: ({ props: p }) => ({
    zIndex: '1000',
    position: 'absolute',
    top: p.vertical ? '0' : '100%',
    left: p.vertical ? '100%' : '0',
  }),

  indicator: () => ({
    position: 'relative',
    float: 'right',
    left: pxToRem(10),
    userSelect: 'none',
  }),
}

export default menuItemStyles
