import { pxToRem } from '../../../../lib'
import { ComponentSlotStyleFunction, ComponentSlotStylesInput, ICSSInJSStyle } from '../../../types'
import { MenuVariables } from './menuVariables'
import { MenuItemProps, MenuItemState } from '../../../../components/Menu/MenuItem'

type MenuItemPropsAndState = MenuItemProps & MenuItemState

const underlinedItem = (color: string): ICSSInJSStyle => ({
  paddingBottom: 0,
  borderBottom: `solid ${pxToRem(4)} ${color}`,
  transition: 'color .1s ease',
})

const getActionStyles = ({
  props: { primary, underlined, iconOnly, isFromKeyboard },
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
  const { primary, underlined, isFromKeyboard, active } = props
  if (active && !underlined) return {}
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
          background: v.focusedBackgroundColor,
        }),
  }
}

const itemSeparator: ComponentSlotStyleFunction<MenuItemPropsAndState, MenuVariables> = ({
  props,
  variables: v,
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
        ...(vertical ? { width: '100%', height: '1px' } : { width: '1px', height: '100%' }),
        ...(primary ? { background: v.primaryBorderColor } : { background: v.borderColor }),
      },
    }
  )
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
        ...getActionStyles({ props, variables: v, color: v.color }),

        ...(pointing &&
          (vertical
            ? pointing === 'end'
              ? { borderRight: `${pxToRem(3)} solid ${v.primaryActiveBorderColor}` }
              : { borderLeft: `${pxToRem(3)} solid ${v.primaryActiveBorderColor}` }
            : pointingBeak({ props, variables: v, theme, colors }))),
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

  root: ({ props, variables: v, theme }): ICSSInJSStyle => {
    const {
      active,
      iconOnly,
      isFromKeyboard,
      pointing,
      primary,
      underlined,
      vertical,
      disabled,
    } = props

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

          '& .ui-icon__filled': {
            display: 'block',
          },

          '& .ui-icon__outline': {
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
          '& .ui-icon__filled': {
            display: 'block',
          },

          '& .ui-icon__outline': {
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
